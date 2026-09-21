import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import executeXmlFunc from "./core/execute/executeXml.js";
import cleanTallyResponse from "./core/cleanTallyResponse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fromXml = async () => {

    const xml = fs.readFileSync(path.join(__dirname, "daybook/body.xml"), "utf8");
    console.log("xml : ", xml);
    const retXml = await executeXmlFunc(xml);
    console.log("retXml : ", retXml);

    return retXml;
};

const fromXmlSimple = async () => {

    const xml = fs.readFileSync(path.join(__dirname, "daybook/body.xml"), "utf8");
    // console.log("xml : ", xml);
    const retXml = await executeXmlFunc(xml);
    // console.log("retXml : ", retXml);
    const clearResponse = cleanTallyResponse(retXml);
    // console.log("clearResponse : ", clearResponse);
    return clearResponse;
};

export { fromXml, fromXmlSimple };