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

