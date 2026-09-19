const handleRows = (inRows) => {
    let localRows = inRows;

    if (!Array.isArray(inRows)) {
        localRows = [inRows];
    };
    // console.log("localRows :", localRows);

    const newRows = localRows.map(row => {

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

    return newRows;
};

export const cleanTallyResponse = (json) => {
    // console.log("json : ", json);

    let collection = json?.ENVELOPE?.BODY?.DATA?.COLLECTION;
    // console.log("collection : ", collection);

    const [key, rows] = Object.entries(collection).find(
        ([key, value]) =>
            !key.startsWith("@") &&
            Array.isArray(value)
    ) ?? [];

    const neededArray = collection[key];
    // console.log("11111 : ", neededArray);

    return neededArray;
};