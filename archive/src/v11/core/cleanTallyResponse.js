import changeTypeString from "./changeTypeString.js";

const showLog = false;

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
    console.log("changedArray=-------- : ", changedArray[1].DATE);

    return changedArray;
};

export default cleanTallyResponse;