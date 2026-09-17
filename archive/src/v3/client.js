import { xmlToJson } from "./xmlToJson.js";
import { jsonToXml } from "./jsonToXml.js";
import { createCollectionEnvelope } from "./envelope.js";

/**
 * Sends an XML payload to Tally via HTTP POST.
 * 
 * @param {object} params
 * @param {string} params.xml - The XML string to send.
 * @param {string} [params.url="http://localhost:9000"] - Tally HTTP endpoint URL.
 * @returns {Promise<object>} Parsed JSON response from Tally.
 */
export const sendToTally = async ({
    xml,
    url = "http://localhost:9000"
} = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: xml
    });

    const text = await res.text();
    return xmlToJson(text);
};

/**
 * High-level helper to fetch any Tally collection directly.
 * 
 * @param {object} params
 * @param {string} params.name - Collection name (e.g. 'KeshavGroups')
 * @param {string} params.type - Tally Object Type (e.g. 'Group', 'Ledger', 'Company')
 * @param {string|string[]} [params.fields] - Fields to fetch (e.g. ['Name', 'Parent'])
 * @param {object} [params.filters] - Filters/additional collection properties
 * @param {object} [params.staticVariables] - Optional static variables
 * @param {string} [params.url="http://localhost:9000"] - Tally URL
 * @returns {Promise<object>} Parsed JSON response from Tally
 */
export const fetchCollection = async ({
    name,
    type,
    fields,
    filters,
    staticVariables,
    url = "http://localhost:9000"
} = {}) => {
    const envelope = createCollectionEnvelope({
        name,
        type,
        fields,
        filters,
        staticVariables
    });
    const xml = jsonToXml(envelope);
    return await sendToTally({ xml, url });
};

/**
 * Executes a Tally request from a JSON body (either envelope or collection definition).
 * 
 * @param {object} body - JSON body (either { ENVELOPE: ... } or { name, type, fields, ... })
 * @param {object} [options]
 * @param {boolean} [options.full=false] - If true, returns full ENVELOPE JSON. If false, returns only children of DATA.COLLECTION on success.
 * @param {string} [options.url="http://localhost:9000"] - Tally URL endpoint
 * @returns {Promise<object>} Tally response data
 */
export const executeBody = async (body, {
    full = false,
    url = "http://localhost:9000"
} = {}) => {
    let rawRes;
    if (body.ENVELOPE) {
        const xml = jsonToXml(body);
        rawRes = await sendToTally({ xml, url });
    } else if (body.name && body.type) {
        rawRes = await fetchCollection({ ...body, url });
    } else {
        throw new Error("Unrecognized body format: must contain ENVELOPE or name & type properties");
    }

    if (full) {
        return rawRes;
    }

    const headerStatus = rawRes?.ENVELOPE?.HEADER?.STATUS;
    if (headerStatus === 0 || headerStatus === "0" || Number(headerStatus) === 0) {
        throw new Error(`Tally returned error status: ${JSON.stringify(rawRes?.ENVELOPE?.BODY || rawRes)}`);
    }

    if (rawRes?.ENVELOPE?.BODY?.DATA?.LINEERROR) {
        throw new Error(`Tally line error: ${JSON.stringify(rawRes?.ENVELOPE?.BODY?.DATA?.LINEERROR)}`);
    }


    const collectionData = rawRes?.ENVELOPE?.BODY?.DATA?.COLLECTION;
    if (!collectionData) {
        throw new Error("No DATA.COLLECTION found in Tally response");
    }

    return collectionData;
};


