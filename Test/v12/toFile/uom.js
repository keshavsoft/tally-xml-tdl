import { get, clean } from "../../../src/v13/fromJson.js";
import { saveOutput } from "../common/index.js";

const data = await clean("mani9", "uom");
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done", data);
