import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.stockGroup.all();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.stockGroup.all completed:", result);
