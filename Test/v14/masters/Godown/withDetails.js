import { masters } from "../../../../src/index.js";
import { saveOutput } from "../../common/index.js";

const result = await masters.Godown.withDetails("mani9");
saveOutput({ inCallerFile: import.meta.url, inData: result });
console.log("Godown.withDetails result count:", result?.ENVELOPE?.BODY?.DATA?.COLLECTION?.GODOWN?.length ?? 0);
