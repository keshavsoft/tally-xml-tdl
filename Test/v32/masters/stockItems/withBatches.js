import { masters } from "../../../../src/index.js";

const run = async () => {
    const withBatches = await masters("stockItems.withBatches", "mani9");
    console.log("withBatches :", withBatches);
};

run().catch(console.error);
