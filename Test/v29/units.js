import { masters } from "../../src/index.js";

const xmlFromTree = await masters("tally.masters.units.all", "mani9");
console.log(xmlFromTree);

// const xmlFromCall = await call("tally.company.fetch");
// console.log("Raw XML from Call:", typeof xmlFromCall === "string" && xmlFromCall.includes("<ENVELOPE>"));
