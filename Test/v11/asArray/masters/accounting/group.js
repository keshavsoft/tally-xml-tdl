import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.accounting.group();

const asSimpleArray = data.GROUP.map(element => {
    return {
        name: element["@_NAME"],
        reservedName: element["@_RESERVEDNAME"],
        parent: element.PARENT["#text"]
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
