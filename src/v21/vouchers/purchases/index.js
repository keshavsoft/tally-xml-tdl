import tdlMessage from "../tdlMessage.json" with { type: "json" };
import createVoucherApi from "../createVoucherApi.js";

const { period, all } = createVoucherApi(tdlMessage.purchases);

export { period, all };
export default { period, all };
