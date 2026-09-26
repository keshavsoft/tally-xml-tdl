import { masters } from "../../../../src/index.js";

const uom = await masters.all("mani9", "stockItemsWithBatches");
console.log("company", JSON.stringify(uom, null, 2));
