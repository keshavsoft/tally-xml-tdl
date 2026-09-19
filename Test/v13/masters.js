import { masters } from "../../src/index.js";

const data = await masters.clean("mani9", "uom");
console.log("company", data);
