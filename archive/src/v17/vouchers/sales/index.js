import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { executeXml, executeXmlAndClean } from "../../core/index.js";
import { buildXml } from "../../core/buildXml.js";
import infoJson from "./info.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const get = async (company, fromDate, ToDate, jsonId = "period") => {
    const { tdlMessage } = infoJson[jsonId] || infoJson;

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    <SVFROMDATE TYPE="Date">${fromDate}</SVFROMDATE><SVTODATE TYPE="Date">${ToDate}</SVTODATE>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return await executeXml(xml);
};

const clean = (company, fromDate, ToDate, jsonId = "period") => {
    const { tdlMessage } = infoJson[jsonId] || infoJson;

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    <SVFROMDATE TYPE="Date">${fromDate}</SVFROMDATE><SVTODATE TYPE="Date">${ToDate}</SVTODATE>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return executeXmlAndClean(xml);
};

const period = async (company, fromDate, toDate, jsonId = "period") => {
    return await get(company, fromDate, toDate, jsonId);
};

const all = async (company, jsonId = "period") => {
    const { tdlMessage } = infoJson[jsonId] || infoJson;

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return await executeXml(xml);
};

export { get, clean, period, all };
export default { get, clean, period, all };
