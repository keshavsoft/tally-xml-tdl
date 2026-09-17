import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { executeXml } from "../../../core/index.js";
import { buildXml } from "../../../core/buildXml.js";
// import bodyJson from "./body.json" with {type: "json"};
import bodyJson from "../../../body.json" with {type: "json"};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const get = (options = {}) => {
    const company = options.company;
    const jsonId = options.jsonId;

    const { tdlMessage, tdlId } = bodyJson[jsonId];

    const staticVariables = `
    <SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    ${bodyJson[jsonId].staticVariables}
`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage,
        tdlId
    });

    return executeXml(xml, options);
};

export default get;