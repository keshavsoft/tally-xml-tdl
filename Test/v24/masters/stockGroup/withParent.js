import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.stockGroup.withParent();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.stockGroup.withParent completed:", result);
