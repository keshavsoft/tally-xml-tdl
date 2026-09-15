import { company } from "../../src/v4/index.js";
import { saveOutput } from "./common/index.js";

const data = await company();
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
