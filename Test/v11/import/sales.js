import { transaction } from "../../../src/v4/index.js";
import { saveOutput } from "./common/index.js";

const data = await transaction.sales.get({ company: "Mani9" });
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
