import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { executeXml, executeXmlAndClean } from "../../core/index.js";
import { buildXml } from "../../core/buildXml.js";
import infoJson from "./info.json" with {type: "json"};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const get = async (company, fromDate, ToDate, jsonId) => {
    const { tdlMessage } = infoJson[jsonId];

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    <SVFROMDATE TYPE="Date">${fromDate}</SVFROMDATE><SVTODATE TYPE="Date">${ToDate}</SVTODATE>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    //     const jsonToReturn = await executeXml(`<ENVELOPE>
    //   <HEADER>
    //     <VERSION>1</VERSION>
    //     <TALLYREQUEST>EXPORT</TALLYREQUEST>
    //     <TYPE>COLLECTION</TYPE>
    //     <ID>KeshavPurchaseInventory</ID>
    //   </HEADER>
    //   <BODY>
    //     <DESC>
    //       <STATICVARIABLES>
    //         <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    //         <SVFROMDATE TYPE="Date">1-Apr-2026</SVFROMDATE>
    //         <SVTODATE TYPE="Date">4-Apr-2026</SVTODATE>
    //       </STATICVARIABLES>
    //       <TDL>
    //         <TDLMESSAGE>
    //           <COLLECTION NAME="KeshavPurchaseInventory">
    //             <TYPE>Vouchers:VoucherType</TYPE>
    //             <CHILDOF>$$VchTypePurchase</CHILDOF>
    //             <BELONGSTO>Yes</BELONGSTO>
    //             <FETCH>AllInventoryEntries</FETCH>
    //             <FETCH>Date</FETCH>
    //           </COLLECTION>
    //         </TDLMESSAGE>
    //       </TDL>
    //     </DESC>
    //   </BODY>
    // </ENVELOPE>`);
    //     console.log("jsonToReturn : ", jsonToReturn);

    return await executeXml(xml);
};

const clean = (company, fromDate, ToDate, jsonId) => {
    const { tdlMessage } = infoJson[jsonId];

    const staticVariables = `<SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
    <SVFROMDATE TYPE="Date">${fromDate}</SVFROMDATE><SVTODATE TYPE="Date">${ToDate}</SVTODATE>`;

    const xml = buildXml(body, {
        staticVariables,
        tdlMessage
    });

    return executeXmlAndClean(xml);
};

export { get, clean };