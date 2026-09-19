import { fromXmlSimple } from "../../../src/v12/purchases.js";

const data = await fromXmlSimple();
// console.log("purchases", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER[1]);