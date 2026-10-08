import { masters } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v30: masters (units.all) ===");
    const res = await masters("units.all", "mani9");
    console.log("Masters units output:\n", res);
};

run().catch(console.error);
