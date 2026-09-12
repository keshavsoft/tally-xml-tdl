export { default as purchase, body as purchaseBody, get as getPurchase } from "./purchase/index.js";
export { default as purc, body as purcBody, get as getPurc } from "./purchase/index.js";
export { default as sale, body as saleBody, get as getSale } from "./sale/index.js";
export { default as stockJournal, body as stockJournalBody, get as getStockJournal } from "./stockJournal/index.js";

import purchase from "./purchase/index.js";
import sale from "./sale/index.js";
import stockJournal from "./stockJournal/index.js";

export default {
    purchase,
    purc: purchase,
    sale,
    stockJournal
};
