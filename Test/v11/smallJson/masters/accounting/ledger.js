import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.accounting.ledgers();
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
