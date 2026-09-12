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

const body = JSON.parse(fs.readFileSync(path.join(__dirname, "body.json"), "utf8"));

const run = async () => {
    console.log("=== Testing Group fetch via fetchCollection with body.json ===");
    const res = await fetchCollection(body);

    const groups = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Total groups fetched:", Array.isArray(groups) ? groups.length : (groups ? 1 : 0));
    console.log("Sample group:", Array.isArray(groups) ? groups[0] : groups);

    saveOutput({ inData: res });

    return res;
};

run()
    .then(() => console.log("\nDone"))
    .catch(err => console.error("Error:", err));


