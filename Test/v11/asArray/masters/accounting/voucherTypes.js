import { masters } from "../../../../../src/v4/index.js";
import { saveOutput } from "../../common/index.js";

const data = await masters.accounting.voucherTypes();

const asSimpleArray = data.VOUCHERTYPE.map(element => {
    return {
        name: element["@_NAME"],
        reservedName: element["@_RESERVEDNAME"],
        parent: element.PARENT["#text"],
        isDeemedPositive: element.ISDEEMEDPOSITIVE["#text"] === "Yes" ? true : false,
        isActive: element.ISACTIVE["#text"] === "Yes" ? true : false,
        isOptional: element.ISOPTIONAL["#text"] === "Yes" ? true : false
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
