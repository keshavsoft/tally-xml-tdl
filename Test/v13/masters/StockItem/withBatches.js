import { masters } from "../../../../src/index.js";

const result = await masters.StockItem.withBatches("mani9");
console.log("result", JSON.stringify(result, null, 2));
