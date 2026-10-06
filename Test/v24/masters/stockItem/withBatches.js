import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.stockItem.withBatches();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.stockItem.withBatches completed:", result);
