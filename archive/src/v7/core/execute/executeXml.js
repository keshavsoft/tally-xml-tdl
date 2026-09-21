// src/v4/core/execute/executeXml.js
import { sendXml } from "../transport/http.js";
import { xmlToJson } from "../response/xmlToJson.js";

export const executeXml = async (
    xml,
    { url = "http://localhost:9000" } = {}
) => {
    const rawXml = await sendXml({ xml, url });

    const json = xmlToJson(rawXml);

    return json;
};