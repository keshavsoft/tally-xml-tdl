import { transactions } from "../../../../src/v4/index.js";
import { saveOutput } from "../common/index.js";

const data = await transactions.purchase();
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
