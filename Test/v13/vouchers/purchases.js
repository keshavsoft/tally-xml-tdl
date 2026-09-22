import { vouchers } from "../../../src/index.js";

const vouchersData = await vouchers.clean("mani9", "1-Apr-2026", "30-Apr-2026", "purchasesPeriod");
console.log("vouchersData", vouchersData.length);
