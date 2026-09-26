import tdlMessage from "../../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../../createApi.js";

const stockGroupApi = createMasterApi({ inTdlMessage: tdlMessage.masters.StockGroup });

const {
    all,
    names,
    withParent
} = stockGroupApi;

export {
    all,
    names,
    withParent
};

export default stockGroupApi;
