import { fetchCollection } from "../../../src/v1/index.js";

const run = async () => {
    console.log("=== Testing Voucher Types via src/v1 fetchCollection ===");
    const res = await fetchCollection({
        name: "KeshavVoucherTypes",
        type: "VoucherType",
        fields: [
            "Name",
            "Parent",
            "IsDeemedPositive",
            "IsOptional",
            "IsActive"
        ]
    });

    const vTypes = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.VOUCHERTYPE;
    console.log("Total Voucher Types fetched:", Array.isArray(vTypes) ? vTypes.length : (vTypes ? 1 : 0));
    console.log("Sample Voucher Type:", Array.isArray(vTypes) ? vTypes[0] : vTypes);
    return res;
};

run()
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));
