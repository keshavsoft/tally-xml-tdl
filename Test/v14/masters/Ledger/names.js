import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.Ledger.names("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const ledgers = result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.LEDGER;
console.log("Ledger.names count:", Array.isArray(ledgers) ? ledgers.length : (ledgers ? 1 : 0));
