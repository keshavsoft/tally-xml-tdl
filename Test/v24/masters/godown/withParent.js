import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.godown.withParent();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.godown.withParent completed:", result);
