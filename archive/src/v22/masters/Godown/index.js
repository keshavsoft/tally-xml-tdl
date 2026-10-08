import tdlMessage from "../../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../../createApi.js";

const godownApi = createMasterApi({ inTdlMessage: tdlMessage.masters.Godown });

const {
    all,
    names,
    withParent,
    withDetails
} = godownApi;

export {
    all,
    names,
    withParent,
    withDetails
};

export default godownApi;
