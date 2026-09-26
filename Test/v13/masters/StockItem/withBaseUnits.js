import { masters } from "../../../../src/index.js";

const result = await masters.StockItem.withBaseUnits("mani9");
console.log("result", JSON.stringify(result, null, 2));
