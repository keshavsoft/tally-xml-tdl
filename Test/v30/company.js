import { company } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v30: company (0 inputs) ===");
    const res = await company();
    console.log("Company output:\n", res);
};

run().catch(console.error);
