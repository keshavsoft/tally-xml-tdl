import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { xmlToJson } from "../../../../src/v1/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveOutput = ({ inData, inFileName = "flat.json" }) => {
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
        <ID>KeshavStockJournal</ID>
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

                  <COLLECTION NAME="KeshavStockJournal">

    <TYPE>Voucher</TYPE>

    <FILTER>
        IsStockJournal
    </FILTER>

    <FETCH>
        Date,
        VoucherNumber,
        VoucherTypeName,
        PartyLedgerName,
        AllInventoryEntries
    </FETCH>

</COLLECTION>

<SYSTEM TYPE="Formulae" NAME="IsStockJournal">
    $Parent:VoucherType:$VoucherTypeName = "Stock Journal"
</SYSTEM>


</TDLMESSAGE>
            </TDL>

        </DESC>

    </BODY>

</ENVELOPE>`;

const xmlStringToArray = (VOUCHERS) => {
    const result = [];

    VOUCHERS.forEach(VOUCHER => {

        const inventoryItems =
            VOUCHER["ALLINVENTORYENTRIES.LIST"];

        const inventory = Array.isArray(inventoryItems)
            ? inventoryItems
            : (inventoryItems ? [inventoryItems] : []);

        inventory.forEach(item => {

            const batches = item["BATCHALLOCATIONS.LIST"];

            const batchArray = !batches
                ? []
                : Array.isArray(batches)
                    ? batches
                    : [batches];

            batchArray.forEach(batch => {

                result.push({
                    DATE: VOUCHER.DATE?.["#text"] || VOUCHER.DATE,
                    VOUCHERNUMBER: VOUCHER.VOUCHERNUMBER,
                    VOUCHERTYPENAME: VOUCHER.VOUCHERTYPENAME,

                    STOCKITEMNAME: item.STOCKITEMNAME,
                    RATE: item.RATE,
                    AMOUNT: item.AMOUNT,
                    ACTUALQTY: item.ACTUALQTY,
                    BILLEDQTY: item.BILLEDQTY,

                    GODOWNNAME: batch.GODOWNNAME,
                    BATCHNAME: batch.BATCHNAME,
                    BATCHAMOUNT: batch.AMOUNT,
                    BATCHACTUALQTY: batch.ACTUALQTY,
                    BATCHBILLEDQTY: batch.BILLEDQTY
                });

            });
        });
    });

    return result;
};

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

    const result = xmlStringToArray(VOUCHERS);

    saveOutput({ inData: result, inFileName: "flat.json" });

    return fromTally;
};

sendToTally()
    .then(() => {
        console.log("Done");
    })
    .catch(error => {
        console.error(error);
    });