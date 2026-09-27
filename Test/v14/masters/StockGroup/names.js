import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.StockGroup.names("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const groups = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKGROUP;
console.log("StockGroup.names count:", Array.isArray(groups) ? groups.length : (groups ? 1 : 0));
