import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { executeXml, executeXmlAndClean } from "./core/index.js";
import { buildXml } from "./core/buildXml.js";
import bodyJson from "./body.json" with {type: "json"};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const get = (options = {}) => {
    const company = options.company;
    const jsonId = options.jsonId;

    const { tdlMessage } = bodyJson[jsonId];

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return executeXml(xml, options);
};

const clean = (options = {}) => {
    const company = options.company;
    const jsonId = options.jsonId;

    const { tdlMessage } = bodyJson[jsonId];

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return executeXmlAndClean(xml, options);
};

const company = async () => {
    const jsonId = "company";

    const { tdlMessage } = bodyJson[jsonId];

    const xml = buildXml(body, {
        tdlMessage
    });

    return executeXmlAndClean(xml);

    const fromExecuteXml = await executeXml(xml);
    console.log("fclsromExecuteXml : ", fromExecuteXml.ENVELOPE.BODY.DATA.COLLECTION.COMPANY);

    return fromExecuteXml.ENVELOPE.BODY.DATA.COLLECTION.COMPANY["@_NAME"];
};

export { get, clean, company };