import { clean } from "../../src/v8/index.js";
import { saveOutput } from "../common/index.js";

const data = await clean({ company: "mani9", jsonId: "ledgerNames" });

console.log("Done", data.ENVELOPE.BODY.DATA.COLLECTION.LEDGER);

// saveOutput({ callerFile: import.meta.url, inData: data });

// console.log("Done", data);