import { masters } from "../../../../src/index.js";

const result = await masters.Ledger.all("mani9");
console.log("result", JSON.stringify(result, null, 2));
