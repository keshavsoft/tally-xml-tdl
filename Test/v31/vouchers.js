import { vouchers } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v31: vouchers (sales.fetch) ===");
    const res = await vouchers("sales.fetch", "mani9", "20260401", "20260401");
    console.log("Vouchers status:", res.includes("<STATUS>1</STATUS>"));
    console.log("Has vouchers:", res.includes("<VOUCHER"));
    console.log("Response size in bytes:", res.length);
};

run().catch(console.error);
