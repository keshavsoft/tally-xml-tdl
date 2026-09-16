import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.inventory.godown();
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
