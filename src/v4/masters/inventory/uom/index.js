import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { executeXml } from "../../../core/index.js";
import { buildXml } from "../../../core/buildXml.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const get = (options = {}) => {

    const staticVariables = `
        <SVCURRENTCOMPANY>${options.company}</SVCURRENTCOMPANY>
        <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    `;

    const tdlMessage = `
        <COLLECTION NAME="KeshavUnits">
            <TYPE>Unit</TYPE>
            <FETCH>$$Alias:Name</FETCH>
        </COLLECTION>
    `;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage,
        tdlId: "KeshavUnits"
    });

    return executeXml(xml, options);
};

export default get;