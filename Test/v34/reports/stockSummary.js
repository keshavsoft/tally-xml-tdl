import { reports } from "../../../src/index.js";

const run = async () => {
    const stockSummary = await reports("stockSummary", "mani9");
    console.log("stockSummary :", stockSummary);
};

run().catch(console.error);
