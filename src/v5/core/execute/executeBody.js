import { jsonToXml } from "../request/jsonToXml.js";
import { createCollectionEnvelope } from "../request/envelope.js";
import { sendXml } from "../transport/http.js";
import { xmlToJson } from "../response/xmlToJson.js";
import { validateResponse } from "../response/validate.js";
import { extractCollection } from "../response/extract.js";

/**
 * The Story of a Query:
 * Act 1 - Request: Build XML payload from body
 * Act 2 - Transport: Send XML over HTTP to Tally
 * Act 3 - Response: Parse XML, validate status, and extract collection entities
 * 
 * @param {object} body - Query specification (either { ENVELOPE: ... } or { name, type, fields, ... })
 * @param {object} [options]
 * @param {boolean} [options.full=false] - If true, returns the raw full ENVELOPE JSON. If false, validates and returns only children of DATA.COLLECTION.
 * @param {string} [options.url="http://localhost:9000"] - Tally HTTP endpoint URL.
 * @returns {Promise<object>} Tally data response.
 */
export const executeBody = async (body, {
    full = false,
    url = "http://localhost:9000"
} = {}) => {
    // Act 1: Request (Formulating what to send)
    let xml;
    if (body.ENVELOPE) {
        xml = jsonToXml(body);
    } else if (body.name && body.type) {
        const envelope = createCollectionEnvelope(body);
        xml = jsonToXml(envelope);
    } else {
        throw new Error("Unrecognized body format: must contain ENVELOPE or name & type properties");
    }

    // Act 2: Transport (Sending over the wire)
    const rawXml = await sendXml({ xml, url });

    // Act 3: Response (Interpreting the answer)
    const res = xmlToJson(rawXml);

    if (full) {
        return res;
    }

    validateResponse(res);
    return extractCollection(res);
};

