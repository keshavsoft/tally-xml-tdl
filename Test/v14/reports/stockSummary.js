import { reports } from "../../../src/index.js";
import { saveOutput } from "../common/index.js";

const result = await reports.stockSummary("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
const rowCount = Array.isArray(result?.ENVELOPE?.DSPACCNAME) ? result.ENVELOPE.DSPACCNAME.length : 0;
console.log("reports.stockSummary result count:", rowCount);
