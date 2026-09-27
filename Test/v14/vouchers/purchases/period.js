import { vouchers } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await vouchers.purchases.period("mani9", "1-Apr-2026", "31-Mar-2027");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const vchs = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.VOUCHER;
console.log("vouchers.purchases.period count:", Array.isArray(vchs) ? vchs.length : (vchs ? 1 : 0));
