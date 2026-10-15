import ifTransformFound from "../ifTransformFound/index.js";
import traverse from "../index.js";
import traverseArray from "../traverseArray/index.js";

const startFunc = ({ inSource, inRecipe, inExecutor, inPath, inRootSource }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;
    const localExecutor = inExecutor;
    const localPath = inPath ?? [];
    const localRootSource = inRootSource ?? inSource;

    let newElement = {};

    if (localRecipe && typeof localRecipe === "object" && "transform" in localRecipe) {
        newElement = ifTransformFound({
            inSource: localSource,
            inTransform: localRecipe.transform,
            inRecipe: localRecipe,
            inExecutor: localExecutor,
            inPath: localPath,
            inRootSource: localRootSource
        });
    }

    for (const [key, value] of Object.entries(newElement)) {
        if (localRecipe && typeof localRecipe === "object" && key in localRecipe) {
            if (Array.isArray(value)) {
                newElement[key] = traverseArray({
                    inItems: value,
                    inRecipe: localRecipe[key],
                    inExecutor: localExecutor,
                    inPath: [...localPath, key],
                    inRootSource: localRootSource
                });
            } else if (typeof value === "object" && value !== null) {
                newElement[key] = traverse({
                    inSource: value,
                    inRecipe: localRecipe[key],
                    inExecutor: localExecutor,
                    inPath: [...localPath, key],
                    inRootSource: localRootSource
                });
            }
        }
    }

    return newElement;
};

export default startFunc;
