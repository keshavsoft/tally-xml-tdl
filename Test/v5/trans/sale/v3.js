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
    console.log("=== Testing Sales fetch via body.json and jsonToXml ===");
    const xml = jsonToXml(body);
    const fromTally = await sendToTally({ xml });

    const vouchers =
        fromTally.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER;

    const VOUCHERS = Array.isArray(vouchers)
        ? vouchers
        : (vouchers ? [vouchers] : []);

    const result = VOUCHERS.map(VOUCHER => {

        const inventoryItems =
            VOUCHER["ALLINVENTORYENTRIES.LIST"];

        const inventory = (
            Array.isArray(inventoryItems)
                ? inventoryItems
                : (inventoryItems ? [inventoryItems] : [])
        ).map(item => {

            const batches = item["BATCHALLOCATIONS.LIST"];

            let cleanBatches = [];

            if (batches) {

                const batchArray = Array.isArray(batches)
                    ? batches
                    : [batches];

                cleanBatches = batchArray.map(batch => ({
                    GODOWNNAME: batch.GODOWNNAME,
                    BATCHNAME: batch.BATCHNAME,
                    AMOUNT: batch.AMOUNT,
                    ACTUALQTY: batch.ACTUALQTY,
                    BILLEDQTY: batch.BILLEDQTY
                }));
            }

            return {
                STOCKITEMNAME: item.STOCKITEMNAME,
                RATE: item.RATE,
                AMOUNT: item.AMOUNT,
                ACTUALQTY: item.ACTUALQTY,
                BILLEDQTY: item.BILLEDQTY,
                BATCHES: cleanBatches
            };
        });

        return {
            DATE: VOUCHER.DATE?.["#text"] || VOUCHER.DATE,
            VOUCHERNUMBER: VOUCHER.VOUCHERNUMBER,
            VOUCHERTYPENAME: VOUCHER.VOUCHERTYPENAME,
            INVENTORY: inventory
        };
    });

    // console.log(result[0]);

    saveOutput({ inData: result });

    return fromTally;
};

run()
    .then(() => {
        console.log("Done");
    })
    .catch(error => {
        console.error(error);
    });