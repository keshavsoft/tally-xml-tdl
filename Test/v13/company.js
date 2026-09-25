import { company } from "../../src/index.js";

const data = await company.all();
console.log("company", data);
