import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.inventory.uom();

const asSimpleArray = data.UNIT.map(element => {
    return {
        name: element.NAME["#text"],
        originalName: element.ORIGINALNAME["#text"],
        isSimpleUnit: element.ISSIMPLEUNIT["#text"],
        conversion: element.CONVERSION["#text"],
        decimalPlaces: element.DECIMALPLACES["#text"]
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
