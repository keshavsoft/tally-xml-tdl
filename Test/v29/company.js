import app, { call } from "../../src/index.js";

console.log(app);

const xmlFromCall = await call("tally.company.fetch");
console.log(xmlFromCall);
