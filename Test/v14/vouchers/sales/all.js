import { vouchers } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await vouchers.sales.all("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const vchs = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.VOUCHER;
console.log("vouchers.sales.all count:", Array.isArray(vchs) ? vchs.length : (vchs ? 1 : 0));
