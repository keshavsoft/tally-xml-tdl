import tdlMessage from "../tdlMessage.json" with { type: "json" };
import { createCompanyApi } from "../createApi.js";

const { all } = createCompanyApi(tdlMessage.company);

export { all };
export default { all };
