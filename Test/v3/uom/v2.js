import { fetchCollection } from "../../../src/v1/index.js";

const run = async () => {
    console.log("=== Testing Units of Measure (UOM) via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavUnits",
        type: "Unit",
        fields: [
            "Name",
            "OriginalName",
            "IsSimpleUnit",
            "DecimalPlaces",
            "BaseUnits",
            "AdditionalUnits",
            "Conversion"
        ]
    });

    const units = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.UNIT;
    console.log("Total units fetched:", Array.isArray(units) ? units.length : (units ? 1 : 0));
    console.log("Sample unit:", Array.isArray(units) ? units[0] : units);
    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));
