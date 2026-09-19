import { clean } from "../../../src/v9/index.js";

const data = await clean({ company: "mani9", jsonId: "purchases" });
console.log("PURCHASES", data);
