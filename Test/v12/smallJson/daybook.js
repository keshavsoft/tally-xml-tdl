import { daybook } from "../../../src/v9/index.js";

const data = await daybook();
console.log("DAYBOOK", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER[1]);
