import { importData } from "../../../src/v4/index.js";

const data = await importData.transaction.sales({ company: "Mani9" });
console.log("data : ", data);
