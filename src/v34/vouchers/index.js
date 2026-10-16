import { companyAndPeriodFilter } from "tally-extract";
import resolvePath from "./resolvePath.js";
import validatePath from "./validatePath.js";

/**
 * Story: Fetch Vouchers from Tally
 * 
 * 1. Resolves the sub-route by prepending the "tally.vouchers." namespace.
 * 2. Strictly validates that the route exists in the tally-spec JSON schema.
 * 3. Dispatches query to Tally with date period via tally-extract companyAndPeriodFilter.
 * 
 * Inputs:
 * - path: The voucher route defined in JSON (e.g. "sales.fetch", "purchases.fetch")
 * - company: The target company name (e.g. "mani9")
 * - fromDate: Period start date (e.g. "20260401")
 * - toDate: Period end date (e.g. "20260401")
 */
const vouchers = async (path, company, fromDate, toDate) => {
    const fullPath = resolvePath(path);
    validatePath(fullPath);

    return await companyAndPeriodFilter(fullPath, company, fromDate, toDate);
};

export default vouchers;
export { vouchers };
