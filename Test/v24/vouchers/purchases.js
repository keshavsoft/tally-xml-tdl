import app from "../../../src/index.js";
import { saveOutput } from "../common/index.js";

const result = await app.vouchers.purchases.fetch();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ vouchers.purchases.fetch completed:", result);
