import { fetchCollection } from "../../../src/v1/index.js";

const run = async () => {
    console.log("=== Testing Godowns fetch via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavGodowns",
        type: "Godown",
        fields: ["Name", "Parent"]
    });

    const godowns = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GODOWN;
    console.log("Total godowns fetched:", Array.isArray(godowns) ? godowns.length : (godowns ? 1 : 0));
    console.log("Sample godown:", Array.isArray(godowns) ? godowns[0] : godowns);
    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));
