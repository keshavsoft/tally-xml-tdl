import { get, clean } from "../../../src/v6/index.js";
import { saveOutput } from "../common/index.js";

const data = await get({ company: "mani9", jsonId: "stockItemsWithBaseUnits" });
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
