import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { jsonToXml, sendToTally } from "../../../../src/v1/index.js";

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
    console.log("=== Testing Stock Journal fetch via body.json and jsonToXml ===");
    const xml = jsonToXml(body);
    const res = await sendToTally({ xml });

    const vouchers = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.VOUCHER;
    console.log("Total vouchers fetched:", Array.isArray(vouchers) ? vouchers.length : (vouchers ? 1 : 0));

    saveOutput({ inData: res });

    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(error => console.error(error));