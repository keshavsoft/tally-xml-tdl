import { masters } from "../../src/index.js";

const result = await masters.clean("mani9", "purchasesPeriod");
console.log("result", result.length);
// console.dir(result, { depth: null });