import { companyAndPeriodFilter } from "tally-extract";
import tallySpec from "tally-spec";

const vouchers = async (path, company, fromDate, toDate) => {
    let cleanPath = path.replace(/^tally\.vouchers\./, "");
    let endpoint = cleanPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source?.tally?.vouchers);

    // Support both "sales" and "sales.fetch"
    if (!endpoint?.tdl && !cleanPath.endsWith(".fetch")) {
        const fetchEndpoint = `${cleanPath}.fetch`.split(".").reduce((acc, key) => acc?.[key], tallySpec.source?.tally?.vouchers);
        if (fetchEndpoint?.tdl) {
            cleanPath = `${cleanPath}.fetch`;
            endpoint = fetchEndpoint;
        }
    }

    if (!endpoint?.tdl) {
        throw new Error(`Voucher "${cleanPath}" does not exist in tally-spec schema.`);
    }

    return await companyAndPeriodFilter(`tally.vouchers.${cleanPath}`, company, fromDate, toDate);
};

export default vouchers;
export { vouchers };
