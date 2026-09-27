import { company } from "../../src/index.js";
import { saveOutput } from "./common/index.js";

const data = await company.all();
saveOutput({ inCallerFile: import.meta.url, inData: data });
console.log("company.all completed");
