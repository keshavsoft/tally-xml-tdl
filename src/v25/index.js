import apiTree from "@keshavsoft/api-tree";
import { source, apiPaths } from "tally-spec";

import execute from "./engine/execution/index.js";

const app = apiTree(source, apiPaths, execute);

export default app;
