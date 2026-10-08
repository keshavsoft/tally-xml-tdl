import reportsJson from "../../reports.json" with { type: "json" };
import { createReportApi } from "../../createApi.js";

const stockSummary = createReportApi({
    inId: reportsJson.stockSummary.id,
    inStaticVariables: reportsJson.stockSummary.staticVariables
});

export { stockSummary };
export default stockSummary;
