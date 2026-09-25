import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeXml } from "../core/index.js";
import { buildXml } from "../core/buildXml.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const createVoucherApi = (tdlMessageString) => {
    const period = async (company, fromDate, toDate) => {
        const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    <SVFROMDATE TYPE="Date">${fromDate}</SVFROMDATE><SVTODATE TYPE="Date">${toDate}</SVTODATE>`;

        const xml = buildXml(body, {
            staticVariables,
            tdlMessage: tdlMessageString
        });

        return await executeXml(xml);
    };

    const all = async (company) => {
        const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>`;

        const xml = buildXml(body, {
            staticVariables,
            tdlMessage: tdlMessageString
        });

        return await executeXml(xml);
    };

    return { period, all };
};

export { createVoucherApi };
export default createVoucherApi;
