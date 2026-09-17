import { importData } from "../../../src/v4/index.js";
import { saveOutput } from "./common/index.js";

const data = await importData.transaction.sales({ company: "Mani9" });
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
