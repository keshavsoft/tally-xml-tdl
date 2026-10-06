import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.stockItem.all();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.stockItem.all completed:", result);
