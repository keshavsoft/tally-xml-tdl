import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.accounting.currencies();
const asArray = [];

asArray.push({
    name: data.CURRENCY["@_NAME"],
    reservedName: data.CURRENCY["@_RESERVEDNAME"],
    mailingName: data.CURRENCY.MAILINGNAME["#text"],
    decimalPlaces: data.CURRENCY.DECIMALPLACES["#text"]
});

saveOutput({ callerFile: import.meta.url, inData: asArray });
console.log("Done");
