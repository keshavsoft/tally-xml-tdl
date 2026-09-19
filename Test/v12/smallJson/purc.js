import { fromXmlSimple } from "../../../src/v9/purchases.js";

const data = await fromXmlSimple();
// console.log("purchases", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER[1]);