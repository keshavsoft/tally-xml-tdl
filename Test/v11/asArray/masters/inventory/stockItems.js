import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.inventory.stockItems();

const asSimpleArray = data.STOCKITEM.map(element => {
    return {
        name: element["@_NAME"],
        parent: element.PARENT["#text"]
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
