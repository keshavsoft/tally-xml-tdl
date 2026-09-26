import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeXml } from "./core/index.js";
import { buildXml } from "./core/buildXml.js";

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

const createMasterApi = (tdlMessageString) => {
    const all = async (company, jsonId) => {
        const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>`;

        const xml = buildXml(body, {
            staticVariables,
            tdlMessage: tdlMessageString[jsonId]
        });

        return await executeXml(xml);
    };

    const api = { all };

    if (tdlMessageString && typeof tdlMessageString === "object") {
        for (const [key, msg] of Object.entries(tdlMessageString)) {
            const fn = async (company) => all(company, key);
            fn.all = fn;
            api[key] = fn;
        }
    }

    return api;
};

const createCompanyApi = (tdlMessageString) => {
    const all = async () => {
        const xml = buildXml(body, {
            tdlMessage: tdlMessageString
        });

        return await executeXml(xml);
    };

    return { all };
};

export { createVoucherApi, createMasterApi, createCompanyApi };
