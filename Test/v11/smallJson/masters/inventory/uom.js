import v5 from "../../../../../src/v5/index.js";
import { saveOutput } from "../../common/index.js";

const data = await v5({ company: "mani9", jsonId: "ledgerNames" });
saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done");
