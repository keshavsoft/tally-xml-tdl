import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.Unit.names("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const units = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.UNIT;
console.log("Unit.names count:", Array.isArray(units) ? units.length : (units ? 1 : 0));
