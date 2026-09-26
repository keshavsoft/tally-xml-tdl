import tdlMessage from "../../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../../createApi.js";

const ledgerApi = createMasterApi({ inTdlMessage: tdlMessage.masters.Ledger });

const {
    all,
    names,
    withDetails,
    moreDetails,
    withGstDetails
} = ledgerApi;

export {
    all,
    names,
    withDetails,
    moreDetails,
    withGstDetails
};

export default ledgerApi;
