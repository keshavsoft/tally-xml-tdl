import { importData } from "../../../src/v4/index.js";
import { saveOutput } from "./common/index.js";

const data = await importData.transaction.last({ company: "Mani9" });
saveOutput({ callerFile: import.meta.url, inData: data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER });
// console.log("data : ", data.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER);
