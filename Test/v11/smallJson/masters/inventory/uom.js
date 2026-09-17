import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.inventory.uom({ company: "mani9", jsonId: "stockItemsWithBaseUnits" });
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
