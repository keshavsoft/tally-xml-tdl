import { get } from "../../../src/v8/index.js";

const data = await get({ company: "Mani10", jsonId: "ledgerNamesMoreDetails" });
console.log("aaaaaaaaa : ", data.ENVELOPE.BODY.DATA.COLLECTION.LEDGER);

// console.log("Done", data);
