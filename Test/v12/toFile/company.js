import getCompany from "../../../src/v13/company.js";

const data = await getCompany(true);
// saveOutput({ callerFile: import.meta.url, inData: data });
console.log("Done", data);
