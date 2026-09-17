import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { xmlToJson } from "../../../../src/v1/index.js";

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

const xml = `<ENVELOPE>
    <HEADER>
        <VERSION>1</VERSION>
        <TALLYREQUEST>EXPORT</TALLYREQUEST>
        <TYPE>COLLECTION</TYPE>
        <ID>KeshavSalesInventory</ID>
    </HEADER>

    <BODY>

        <DESC>

            <STATICVARIABLES>
                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                <SVFROMDATE TYPE="Date">1-Apr-2026</SVFROMDATE>
                <SVTODATE TYPE="Date">1-Apr-2026</SVTODATE>
            </STATICVARIABLES>

            <TDL>
                <TDLMESSAGE>

                  <COLLECTION NAME="KeshavSalesInventory">

    <TYPE>Vouchers:VoucherType</TYPE>

    <CHILDOF>$$VchTypeSales</CHILDOF>

    <BELONGSTO>Yes</BELONGSTO>

    <FETCH>
        AllInventoryEntries
    </FETCH>

</COLLECTION>

</TDLMESSAGE>
            </TDL>

        </DESC>

    </BODY>

</ENVELOPE>`;

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

    const fromTally = xmlToJson(text);

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

sendToTally()
    .then(() => {
        console.log("Done");
    })
    .catch(error => {
        console.error(error);
    });