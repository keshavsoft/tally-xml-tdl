import tdlMessage from "../tdlMessage.json" with { type: "json" };
import { createMasterApi } from "../createApi.js";

const { all } = createMasterApi(tdlMessage.masters);

export { all };
export default { all };
