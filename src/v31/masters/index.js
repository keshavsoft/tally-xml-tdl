import { companyFilter } from "tally-extract";
import tallySpec from "tally-spec";

const masters = async (path, company) => {
    const cleanPath = path.replace(/^tally\.masters\./, "");
    const endpoint = cleanPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source?.tally?.masters);

    if (!endpoint?.tdl) {
        throw new Error(`Master "${cleanPath}" does not exist in tally-spec schema.`);
    }

    return await companyFilter(`tally.masters.${cleanPath}`, company);
};

export default masters;
export { masters };
