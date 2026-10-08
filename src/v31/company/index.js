import { companyFilter } from "tally-extract";
import tallySpec from "tally-spec";

const company = async () => {
    const endpoint = tallySpec.source?.tally?.company?.fetch;

    if (!endpoint?.tdl) {
        throw new Error(`Endpoint "tally.company.fetch" is missing from tally-spec schema.`);
    }

    return await companyFilter("tally.company.fetch");
};

export default company;
export { company };
