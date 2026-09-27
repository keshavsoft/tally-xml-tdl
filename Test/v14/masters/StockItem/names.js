import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.StockItem.names("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const items = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKITEM;
console.log("StockItem.names count:", Array.isArray(items) ? items.length : (items ? 1 : 0));
