import { company } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v31: company (0 inputs) ===");
    const res = await company();
    console.log("Company output status:", res.includes("<STATUS>1</STATUS>"));
    console.log("Company XML snippet:\n", res.slice(0, 300));
};

run().catch(console.error);
