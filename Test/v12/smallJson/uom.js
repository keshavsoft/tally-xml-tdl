import v6 from "../../../src/v6/index.js";
import { saveOutput } from "../common/index.js";

const data = await v6({ company: "mani9", jsonId: "stockItemsWithBaseUnits" });
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
