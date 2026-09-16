import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.inventory.godown();

const asSimpleArray = data.GODOWN.map(element => {
    return {
        name: element["@_NAME"],
        reservedName: element["@_RESERVEDNAME"],
        parent: element.PARENT["#text"]
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
