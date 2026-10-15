import { masters } from "../../../src/index.js";

const run = async () => {
    const units = await masters("units.all", "mani9");
    console.log("units :", units);
};

run().catch(console.error);
