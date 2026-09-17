import { masters } from "../../../../../src/v4/index.js";

const data = await masters.inventory.uom();

const asSimpleArray = data.UNIT.map(element => {
    return {
        name: element.NAME["#text"],
    }
});

console.log("asSimpleArray", asSimpleArray);
