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

const cleanTallyResponse_old = (json) => {
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

const cleanTallyResponse1 = (json) => {
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

    if (!Array.isArray(neededArray)) {
        return neededArray;
    }

    return neededArray.map(row => {
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
};

const cleanTallyResponse2 = (json) => {
    // console.log("json : ", json);

    let collection = json?.ENVELOPE?.BODY?.DATA?.COLLECTION;
    console.log("collection : ", collection);

    if (!Array.isArray(collection)) {
        collection = [collection];
    };

    console.log("aaaaaa : ", collection);

    const [key, rows] = Object.entries(collection).find(
        ([key, value]) =>
            !key.startsWith("@") &&
            Array.isArray(value)
    ) ?? [];

    console.log("key : ", key);

    const neededArray = collection[key];
    console.log("11111 : ", neededArray);

    if (!Array.isArray(neededArray)) {
        return neededArray;
    }

    return changeTypeString(neededArray);
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

    let collection = json?.ENVELOPE?.BODY?.DATA?.COLLECTION;
    // console.log("collection : ", collection);

    const key = pullKey(collection);

    // if (!Array.isArray(collection)) {
    //     collection = [collection];
    // };

    // // console.log("aaaaaa : ", collection);

    // const [key, rows] = Object.entries(collection).find(
    //     ([key, value]) =>
    //         !key.startsWith("@") &&
    //         Array.isArray(value)
    // ) ?? [];

    // console.log("key : ", key);

    const neededArray = collection[key];
    // console.log("11111 : ", neededArray);

    if (!Array.isArray(neededArray)) {
        return neededArray;
    }

    return changeTypeString(neededArray);
};