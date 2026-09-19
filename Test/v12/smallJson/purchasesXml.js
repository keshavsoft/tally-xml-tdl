import { purchaseFromXml } from "../../../src/v8/index.js";

const data = await purchaseFromXml();
console.log("aaaaaaaaa : ", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER[0]);

// console.log("Done", data);
