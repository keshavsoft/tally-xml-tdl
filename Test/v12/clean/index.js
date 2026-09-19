import { clean } from "../../../src/v8/index.js";

const data = await clean({ company: "mani9", jsonId: "stockItemsWithBaseUnits" });
console.log("Done", data);
