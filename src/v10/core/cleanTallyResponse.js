const showLog = true;
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

const changeTypeString = (inArray) => {
    const newArray = inArray.map(row => {
        const result = {};

        for (const [key, value] of Object.entries(row)) {
            if (
                value &&
                typeof value === "object" &&
                value["@_TYPE"] === "String" &&
                "#text" in value
            ) {
                result[key] = value["#text"];
                continue;
            }

            result[key] = value;
        }

        return result;
    });

    return newArray;
};

const pullKey = (inCollection) => {
    let collection = inCollection;
    console.log("collection : ", collection);

    const [key, rows] = Object.entries(collection).find(
        ([key, value]) =>
            !key.startsWith("@") &&
            Array.isArray(value)
    ) ?? [];

    return key;
};

export const cleanTallyResponse = (json) => {
    console.log("json : ", json);

    const data = json?.ENVELOPE?.BODY?.DATA;
    if (showLog) console.log("data : ", data);

    let collection = data?.COLLECTION;
    if (showLog) console.log("collection1 : ", collection);

    const key = pullKey(collection);

    const neededArray = collection[key];

    if (!Array.isArray(neededArray)) {
        return neededArray;
    }

    return changeTypeString(neededArray);
};