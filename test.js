import { fetchCollection } from "./index.js";

console.log("Testing @keshavsoft/tallyextract from root index.js...");

fetchCollection({
    name: "KeshavGroups",
    type: "Group",
    fields: ["Name", "Parent"]
}).then(res => {
    const groups = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Success! Total groups fetched:", Array.isArray(groups) ? groups.length : (groups ? 1 : 0));
}).catch(err => {
    console.error("Error:", err.message);
});