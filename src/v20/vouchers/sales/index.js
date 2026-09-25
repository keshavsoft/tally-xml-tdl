import tdlMessage from "../tdlMessage.json" with { type: "json" };
import createVoucherApi from "../createVoucherApi.js";

const { period, all } = createVoucherApi(tdlMessage.sales);

export { period, all };
export default { period, all };
