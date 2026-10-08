import { masters } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing v31: masters (units.all) ===");
    const res = await masters("units.all", "mani9");
    console.log("Masters status:", res.includes("<STATUS>1</STATUS>"));
    console.log("Masters XML snippet:\n", res.slice(0, 300));
};

run().catch(console.error);
