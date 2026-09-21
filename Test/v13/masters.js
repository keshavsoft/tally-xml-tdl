import { masters } from "../../src/index.js";

const uom = await masters.clean("mani9", "stockItems");
console.log("company", uom);
