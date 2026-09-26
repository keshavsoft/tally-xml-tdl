import tdlMessage from "../../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../../createApi.js";

const unitApi = createMasterApi({ inTdlMessage: tdlMessage.masters.Unit });

const {
    all,
    names
} = unitApi;

export {
    all,
    names
};

export default unitApi;
