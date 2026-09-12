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

    saveOutput({ inData: fromTally });

    return fromTally;
};

sendToTally()
    .then(() => {
        console.log("Done");
    })
    .catch(error => {
        console.error(error);
    });