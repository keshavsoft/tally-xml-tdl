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

const run = async () => {
    console.log("=== Testing Godowns fetch via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavGodowns",
        type: "Godown",
        fields: ["Name", "Parent"]
    });

    const godowns = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GODOWN;
    console.log("Total godowns fetched:", Array.isArray(godowns) ? godowns.length : (godowns ? 1 : 0));
    console.log("Sample godown:", Array.isArray(godowns) ? godowns[0] : godowns);

    saveOutput({ inData: res });

    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));

