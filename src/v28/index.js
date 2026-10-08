import apiTree, { createCaller } from "./apiTree/index.js";
// import { source, apiPaths } from "./tallySpec/source.json" with type {};

import source from './tallySpec/source.json' with {type: 'json'};
import apiPaths from './tallySpec/recipe.json' with {type: 'json'};

import execute from "./engine/index.js";

const app = apiTree(source, apiPaths, execute);
const call = createCaller({ inSource: source, inExecutor: execute });

export default app;
export { app, call };
