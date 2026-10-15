import { companyFilter, companyAndPeriodFilter } from "tally-extract";

const company = async (inPath, inCompany) => {
    return await companyFilter(inPath, inCompany);
};

const masters = async (inPath, inCompany) => {
    return await companyFilter(inPath, inCompany);
};

const companyAndPeriodFilter1 = async (inPath, inCompany, inFromDate, inToDate) => {
    const localPath = inPath;
    const localCompany = inCompany;
    const localFromDate = inFromDate;
    const localToDate = inToDate;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    }

    return await sendPeriod({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany,
        inFromDate: localFromDate,
        inToDate: localToDate
    });
};

export { company, masters };
