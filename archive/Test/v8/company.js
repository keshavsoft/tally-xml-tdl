import { runTest } from "./common/index.js";

runTest(import.meta.url)
    .then(() => console.log("Done"))
    .catch(err => console.error("Error:", err));
