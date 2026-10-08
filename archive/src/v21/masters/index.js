import tdlMessage from "../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../createApi.js";

const masterApi = createMasterApi(tdlMessage.masters);

const {
    all,
    uom,
    stockItems,
    stockItemsWithBaseUnits,
    ledgerNames,
    ledgerNamesWithDetails,
    ledgerNamesMoreDetails,
    stockGroups,
    stockGroupsAndParent
} = masterApi;

export {
    all,
    uom,
    stockItems,
    stockItemsWithBaseUnits,
    ledgerNames,
    ledgerNamesWithDetails,
    ledgerNamesMoreDetails,
    stockGroups,
    stockGroupsAndParent
};

export default masterApi;
