import { companyFilter } from "tally-extract";
import validatePath from "./validatePath.js";

/**
 * Story: Fetch Company List from Tally
 * 
 * 1. Validates that "tally.company.fetch" exists in tally-spec schema.
 * 2. Dispatches query to Tally with 0 external inputs via tally-extract companyFilter.
 * 
 * Inputs: None (0 inputs)
 */
const company = async () => {
    validatePath();

    return await companyFilter("tally.company.fetch");
};

export default company;
export { company };
