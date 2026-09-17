export { default as group, body as groupBody, get as getGroup } from "./group/index.js";
export { default as voucherTypes, body as voucherTypesBody, get as getVoucherTypes } from "./voucherTypes/index.js";
export { default as ledgers, body as ledgersBody, get as getLedgers } from "./Ledger/index.js";
export { default as currencies, body as currenciesBody, get as getCurrencies } from "./currency/index.js";

import group from "./group/index.js";
import voucherTypes from "./voucherTypes/index.js";
import ledgers from "./Ledger/index.js";
import currencies from "./currency/index.js";

export default {
    group,
    voucherTypes,
    ledgers,
    currencies
};
