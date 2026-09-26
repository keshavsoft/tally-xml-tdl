import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { executeXml } from "../../core/index.js";
import { buildXml } from "../../core/buildXml.js";
import infoJson from "./info.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const period = async (company, fromDate, toDate, jsonId = "purchasesPeriod") => {
    const { tdlMessage } = infoJson[jsonId] || infoJson;

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    <SVFROMDATE TYPE="Date">${fromDate}</SVFROMDATE><SVTODATE TYPE="Date">${toDate}</SVTODATE>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return await executeXml(xml);
};

const all = async (company, jsonId = "purchasesPeriod") => {
    const { tdlMessage } = infoJson[jsonId] || infoJson;

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return await executeXml(xml);
};

export { period, all };
export default { period, all };
