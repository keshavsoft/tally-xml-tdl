export const cleanTallyResponse = (json) => {

    const collection = json?.ENVELOPE?.BODY?.DATA?.COLLECTION;

    if (!collection) {
        return [];
    }

    const key = Object.keys(collection).find(
        key => Array.isArray(collection[key])
    );

    if (!key) {
        return [];
    }

    const rows = collection[key];

    return rows.map(row => {

        const result = {};

        for (const [key, value] of Object.entries(row)) {

            // Remove Tally/XML metadata
            if (key === "@_RESERVEDNAME") {
                continue;
            }

            // Keep NAME simple
            if (key === "@_NAME") {
                result.NAME = value;
                continue;
            }

            // Handle XML parser objects like:
            // { "#text": "kgs", "@_TYPE": "String" }
            if (
                value &&
                typeof value === "object" &&
                "#text" in value
            ) {
                result[key] = value["#text"];
                continue;
            }

            result[key] = value;
        }

        // If only NAME exists, return the NAME itself
        if (Object.keys(result).length === 1 && result.NAME !== undefined) {
            return result.NAME;
        }

        return result;
    });
};