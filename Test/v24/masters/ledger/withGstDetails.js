import app from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await app.masters.ledger.withGstDetails();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ masters.ledger.withGstDetails completed:", result);
