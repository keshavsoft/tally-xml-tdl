import app, { call } from "../../../src/index.js";

const result1 = await call("tally.masters.unit.all", "mani9");
console.log("Consumption 1 (call route):", Boolean(result1?.ENVELOPE));

const result2 = await call("tally.company.fetch");
console.log("Consumption 2 (call company):", Boolean(result2?.ENVELOPE));

const result3 = await app.tally.masters.unit.all("mani9");
console.log("Consumption 3 (tree property):", Boolean(result3?.ENVELOPE));
