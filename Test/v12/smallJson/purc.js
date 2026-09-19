import { fromXmlSimple } from "../../../src/v11/purchases.js";

const data = await fromXmlSimple();
// console.log("purchases", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER[1]);