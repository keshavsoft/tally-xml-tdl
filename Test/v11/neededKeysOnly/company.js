import { company } from "../../../src/v4/index.js";

const data = await company();

console.log("COMPANY : ", data.COMPANY["@_NAME"]);
