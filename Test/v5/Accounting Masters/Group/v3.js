import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
    xmlToJson,
    jsonToXml,
    createEnvelope,
    sendToTally,
    fetchCollection
} from "../../../../src/v2/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveOutput = ({ inData, inFileName = "data.json" }) => {
    const localData = inData;
    const localFileName = inFileName;

    const rootDir = path.resolve(__dirname, "../../../..");
    const testDir = path.join(rootDir, "Test");
    const relPath = path.relative(testDir, __dirname);
    const targetDir = path.join(rootDir, "Data", relPath);

    fs.mkdirSync(targetDir, { recursive: true });
    const targetFilePath = path.join(targetDir, localFileName);
    fs.writeFileSync(targetFilePath, JSON.stringify(localData, null, 2));
    console.log(`Saved output to: ${targetFilePath}`);
};

const run = async () => {
    console.log("=== Test 1: High-level fetchCollection ===");
    const res1 = await fetchCollection({
        name: "KeshavGroups",
        type: "Group",
        fields: ["Name", "Parent"]
    });

    const groups1 = res1?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Total groups via fetchCollection:", Array.isArray(groups1) ? groups1.length : (groups1 ? 1 : 0));
    console.log("Sample group via fetchCollection:", Array.isArray(groups1) ? groups1[0] : groups1);

    saveOutput({ inData: res1 });

    console.log("\n=== Test 2: Low-level Envelope Object Manipulation ===");
    // Create base envelope JS object
    const envelope = createEnvelope({
        id: "KeshavGroupsCustom",
        tdlMessage: {
            COLLECTION: {
                "@_NAME": "KeshavGroupsCustom",
                TYPE: "Group",
                FETCH: "Name, Parent"
            }
        }
    });

    // Convert to XML
    const xml = jsonToXml(envelope);
    console.log("Generated XML:\n", xml);

    // Send to Tally
    const res2 = await sendToTally({ xml });
    const groups2 = res2?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Total groups via sendToTally:", Array.isArray(groups2) ? groups2.length : (groups2 ? 1 : 0));
};

run()
    .then(() => console.log("\nDone"))
    .catch(err => console.error("Error:", err));


