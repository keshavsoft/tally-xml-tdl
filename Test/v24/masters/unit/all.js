import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.unit.all();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.unit.all completed:", result);
