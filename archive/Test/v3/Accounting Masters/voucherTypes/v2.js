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
    console.log("=== Testing Voucher Types via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavVoucherTypes",
        type: "VoucherType",
        fields: [
            "Name",
            "Parent",
            "IsDeemedPositive",
            "IsOptional",
            "IsActive"
        ]
    });

    const vTypes = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.VOUCHERTYPE;
    console.log("Total Voucher Types fetched:", Array.isArray(vTypes) ? vTypes.length : (vTypes ? 1 : 0));
    console.log("Sample Voucher Type:", Array.isArray(vTypes) ? vTypes[0] : vTypes);

    saveOutput({ inData: res });

    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));

