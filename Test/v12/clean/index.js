import { clean } from "../../../src/v7/index.js";

const data = await clean({ company: "mani9", jsonId: "stockGroupsAndParent" });
console.log("Done", data);
