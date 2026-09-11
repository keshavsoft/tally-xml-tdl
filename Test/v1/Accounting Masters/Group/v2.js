import { xmlToJson } from "../../../xmlToJson.js";
import { jsonToXml } from "../../../jsonToXml.js";
import fs from "fs";

// 1. Read base body.xml template
const baseXml = fs.readFileSync(new URL("./body.xml", import.meta.url), "utf-8");

// 2. Convert base XML to JS Object
const envelopeObj = xmlToJson(baseXml);

// 3. Manipulate the JS Object (ID and TDLMESSAGE)
const collectionName = "KeshavGroups";

envelopeObj.ENVELOPE.HEADER.ID = collectionName;
envelopeObj.ENVELOPE.BODY.DESC.TDL.TDLMESSAGE = {
    COLLECTION: {
        "@_NAME": collectionName,
        TYPE: "Group",
        FETCH: "Name, Parent"
    }
};

// 4. Convert manipulated JS Object back to XML
const xml = jsonToXml(envelopeObj);
console.log("Generated XML:\n", xml);

const sendToTally = async ({
    url = "http://localhost:9000"
} = {}) => {

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: xml
    });

    const text = await res.text();
    console.log("text : ", text);

    const fromTally = xmlToJson(text);
    const groups = fromTally?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Total Groups received from Tally:", Array.isArray(groups) ? groups.length : (groups ? 1 : 0));
    console.log("Sample Group:", Array.isArray(groups) ? groups[0] : groups);

    return fromTally;
};

sendToTally()
    .then(() => {
        console.log("Done");
    })
    .catch(error => {
        console.error("sendToTally error:", error.message);
    });
