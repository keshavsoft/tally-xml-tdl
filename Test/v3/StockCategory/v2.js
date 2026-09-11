import { fetchCollection } from "../../../src/v1/index.js";

const run = async () => {
    console.log("=== Testing Stock Categories via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavStockCategories",
        type: "StockCategory",
        fields: ["Name", "Parent"]
    });

    const categories = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.STOCKCATEGORY;
    console.log("Total Stock Categories fetched:", Array.isArray(categories) ? categories.length : (categories ? 1 : 0));
    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));
