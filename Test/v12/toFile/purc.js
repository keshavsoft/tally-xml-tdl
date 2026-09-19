import { fromXmlSimple } from "../../../src/v13/purchases.js";
import { saveOutput } from "../common/index.js";

const data = await fromXmlSimple();
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done", data);
