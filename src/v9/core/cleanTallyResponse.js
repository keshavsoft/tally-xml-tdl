const showLog = false;

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
    // console.log("collection : ", collection);

    const [key, rows] = Object.entries(collection).find(
        ([key, value]) =>
            !key.startsWith("@") &&
            Array.isArray(value)
    ) ?? [];

    return { key, rows };
};

const cleanTallyResponse = (json) => {
    // console.log("json : ", json);

    const data = json?.ENVELOPE?.BODY?.DATA;
    if (showLog) console.log("data : ", data);

    let collection = data?.COLLECTION;
    if (showLog) console.log("collection1 : ", collection);

    const { key, rows } = pullKey(collection);

    const neededArray = rows;
    // console.log("neededArray : ", neededArray[1]);

    if (!Array.isArray(neededArray)) {
        return neededArray;
    }

    const changedArray = changeTypeString(neededArray);
    console.log("changedArray : ", changedArray[1]);

    return changedArray;
};

export default cleanTallyResponse;