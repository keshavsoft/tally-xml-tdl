import app from "../../../src/index.js";
import { saveOutput } from "../common/index.js";

const result = await app.vouchers.sales.fetch();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ vouchers.sales.fetch completed:", result);
