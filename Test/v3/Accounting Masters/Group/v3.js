import {
    xmlToJson,
    jsonToXml,
    createEnvelope,
    sendToTally,
    fetchCollection
} from "../../../../src/v2/index.js";

const run = async () => {
    console.log("=== Test 1: High-level fetchCollection ===");
    const res1 = await fetchCollection({
        name: "KeshavGroups",
        type: "Group",
        fields: ["Name", "Parent"]
    });

    const groups1 = res1?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Total groups via fetchCollection:", Array.isArray(groups1) ? groups1.length : (groups1 ? 1 : 0));
    console.log("Sample group via fetchCollection:", Array.isArray(groups1) ? groups1[0] : groups1);

    console.log("\n=== Test 2: Low-level Envelope Object Manipulation ===");
    // Create base envelope JS object
    const envelope = createEnvelope({
        id: "KeshavGroupsCustom",
        tdlMessage: {
            COLLECTION: {
                "@_NAME": "KeshavGroupsCustom",
                TYPE: "Group",
                FETCH: "Name, Parent"
            }
        }
    });

    // Convert to XML
    const xml = jsonToXml(envelope);
    console.log("Generated XML:\n", xml);

    // Send to Tally
    const res2 = await sendToTally({ xml });
    const groups2 = res2?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GROUP;
    console.log("Total groups via sendToTally:", Array.isArray(groups2) ? groups2.length : (groups2 ? 1 : 0));
};

run()
    .then(() => console.log("\nDone"))
    .catch(err => console.error("Error:", err));

