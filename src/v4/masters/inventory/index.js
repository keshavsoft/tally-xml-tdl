export { default as godown, body as godownBody, get as getGodown } from "./godown/index.js";
export { default as stockCategory, body as stockCategoryBody, get as getStockCategory } from "./stockCategory/index.js";
export { default as uom, body as uomBody, get as getUom } from "./uom/index.js";

import godown from "./godown/index.js";
import stockCategory from "./stockCategory/index.js";
import uom from "./uom/index.js";

export default {
    godown,
    stockCategory,
    uom
};
