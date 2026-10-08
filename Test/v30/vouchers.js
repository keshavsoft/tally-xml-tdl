import { vouchers } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v30: vouchers (sales.fetch) ===");
    const res = await vouchers("sales.fetch", "mani9", "20260401", "20260401");
    console.log("Sales voucher output:\n", res);
};

run().catch(console.error);
