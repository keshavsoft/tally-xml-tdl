import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.Unit.all("Mani10");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const units = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.UNIT;
console.log("Unit.all count:", Array.isArray(units) ? units.length : (units ? 1 : 0));
console.log("Unit 1", units[0]);
