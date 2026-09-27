import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeXml } from "./core/index.js";
import { buildXml } from "./core/buildXml.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");
const bodyAsData = fs.readFileSync(path.join(__dirname, "bodyAsData.xml"), "utf8");

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

const createMasterApi = (arg) => {
    const inTdlMessage = (arg && typeof arg === "object" && "inTdlMessage" in arg) ? arg.inTdlMessage : arg;
    const localTdlMessage = inTdlMessage;

    const all = async (company, jsonId = "all") => {
        const localCompany = company;
        const localJsonId = jsonId;
        const staticVariables = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>`;

        let messageTemplate;
        if (typeof localTdlMessage === "string") {
            messageTemplate = localTdlMessage;
        } else if (localTdlMessage && typeof localTdlMessage === "object") {
            messageTemplate = localTdlMessage[localJsonId] || localTdlMessage.all || localTdlMessage.names || Object.values(localTdlMessage)[0];
        }

        const xml = buildXml(body, {
            staticVariables,
            tdlMessage: messageTemplate
        });

        return await executeXml(xml);
    };

    const mainFn = async (company) => all(company, "all");
    mainFn.all = (company, jsonId) => (jsonId ? all(company, jsonId) : all(company, "all"));

    if (localTdlMessage && typeof localTdlMessage === "object") {
        for (const [key, msg] of Object.entries(localTdlMessage)) {
            const fn = async (company) => all(company, key);
            fn.all = fn;
            mainFn[key] = fn;
        }
    }

    return mainFn;
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

const createReportApi = (arg) => {
    const inId = typeof arg === "string" ? arg : (arg?.inId || arg?.id);
    const inStaticVariables = typeof arg === "object" ? (arg?.inStaticVariables || arg?.staticVariables || "") : "";

    const localId = inId;
    const defaultStatic = inStaticVariables;

    return async (company, extraStatic = "") => {
        const localCompany = company;
        const staticVariables = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>${defaultStatic}${extraStatic}`;
        const xml = bodyAsData
            .replace("{{ID}}", localId)
            .replace("{{STATICVARIABLES}}", staticVariables);

        return await executeXml(xml);
    };
};

export { createVoucherApi, createMasterApi, createCompanyApi, createReportApi };
