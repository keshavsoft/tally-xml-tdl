import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.StockGroup.withParent("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const groups = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKGROUP;
console.log("StockGroup.withParent count:", Array.isArray(groups) ? groups.length : (groups ? 1 : 0));
