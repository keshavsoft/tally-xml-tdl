import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.StockItem.withBatches("Mani10");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const items = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKITEM;
console.log("StockItem.withBatches count:", Array.isArray(items) ? items.length : (items ? 1 : 0));
console.log("items 1", items[0]);