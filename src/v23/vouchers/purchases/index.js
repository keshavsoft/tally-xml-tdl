import tdlMessage from "../../tdlMessage.json" with { type: "json" };
import { createVoucherApi } from "../../createApi.js";

const { period, all } = createVoucherApi(tdlMessage.vouchers.purchases);

export { period, all };
export default { period, all };
