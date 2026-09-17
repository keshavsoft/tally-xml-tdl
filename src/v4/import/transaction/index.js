export { default as sales, body as salesBody, get as getSales } from "./sales/index.js";
export { default as last, body as lastBody, get as getLast } from "./last/index.js";

import sales from "./sales/index.js";
import last from "./last/index.js";

export default {
    sales,
    last
};
