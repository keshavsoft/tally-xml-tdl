import { companyFilter } from "tally-extract";
import resolvePath from "./resolvePath.js";
import validatePath from "./validatePath.js";

/**
 * Story: Fetch Masters from Tally
 * 
 * 1. Resolves the sub-route by prepending the "tally.masters." namespace.
 * 2. Strictly validates that the route exists in the tally-spec JSON schema.
 * 3. Dispatches query to Tally via tally-extract companyFilter.
 * 
 * Inputs:
 * - path: The master sub-route defined in JSON (e.g. "units.all", "stockItems.withBatches")
 * - company: The target company name (e.g. "mani9")
 */
const masters = async (path, company) => {
    const fullPath = resolvePath(path);
    validatePath(fullPath);

    return await companyFilter(fullPath, company);
};

export default masters;
export { masters };
