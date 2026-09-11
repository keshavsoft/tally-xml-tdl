import { xmlToJson } from "../../../xmlToJson.js";
import fs from "fs";

const xml = fs.readFileSync(new URL("./body.xml", import.meta.url), "utf-8");


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


//     const fromTally = xmlToJson(text);
// console.log("fromTally : ", fromTally.ENVELOPE.BODY.DATA.COLLECTION.COMPANY);

    // fs.writeFileSync("data.json", JSON.stringify(fromTally));

    return text;
};

sendToTally()
    .then(() => {
        console.log("Done");
    })
    .catch(error => {
        console.error(error);
    });