import app from "../../src/index.js";
import { saveOutput } from "./common/index.js";

const result = await app.company.fetch();
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("✅ company.fetch completed:", result);
