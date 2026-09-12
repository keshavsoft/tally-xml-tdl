import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchCollection } from "../../../../src/v1/index.js";

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
    console.log("=== Testing Stock Categories via src/v1 fetchCollection with body.json ===");
    const res = await fetchCollection(body);

    const categories = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKCATEGORY;
    console.log("Total Stock Categories fetched:", Array.isArray(categories) ? categories.length : (categories ? 1 : 0));

    saveOutput({ inData: res });

    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));

