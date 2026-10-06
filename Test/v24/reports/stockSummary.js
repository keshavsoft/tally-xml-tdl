import app from "../../../src/index.js";
import { saveOutput } from "../common/index.js";

const result = await app.reports.stockSummary.fetch();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ reports.stockSummary.fetch completed:", result);
