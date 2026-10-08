import app, { call } from "../../src/index.js";

const xmlFromTree = await app.tally.masters.stockItems.withBatches("mani9");
console.log(xmlFromTree);

// const xmlFromCall = await call("tally.company.fetch");
// console.log("Raw XML from Call:", typeof xmlFromCall === "string" && xmlFromCall.includes("<ENVELOPE>"));
