import tdlMessage from "../../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../../createApi.js";

const stockItemApi = createMasterApi({ inTdlMessage: tdlMessage.masters.StockItem });

const {
    all,
    names,
    withBaseUnits,
    withBatches
} = stockItemApi;

export {
    all,
    names,
    withBaseUnits,
    withBatches
};

export default stockItemApi;
