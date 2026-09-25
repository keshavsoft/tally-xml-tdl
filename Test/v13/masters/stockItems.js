import { masters } from "../../../src/index.js";

const uom = await masters.all("mani9", "stockItems");
console.log("company", uom);
