import { fromXmlSimple } from "../../../src/v13/purchases.js";

const data = await fromXmlSimple();
// console.log("purchases", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER[1]);