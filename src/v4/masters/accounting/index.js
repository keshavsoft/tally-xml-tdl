export { default as group, body as groupBody, get as getGroup } from "./group/index.js";
export { default as voucherTypes, body as voucherTypesBody, get as getVoucherTypes } from "./voucherTypes/index.js";

import group from "./group/index.js";
import voucherTypes from "./voucherTypes/index.js";

export default {
    group,
    voucherTypes
};
