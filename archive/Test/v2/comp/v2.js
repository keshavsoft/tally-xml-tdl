import { fetchCollection } from "../../../src/v1/index.js";

const run = async () => {
    console.log("=== Testing Company fetch via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavOpenCompanies",
        type: "Company",
        fields: ["Name"]
    });

    const company = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.COMPANY;
    console.log("Fetched company:", company);
    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));
