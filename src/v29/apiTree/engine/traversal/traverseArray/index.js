import traverse from "../index.js";

const startFunc = ({ inItems, inRecipe, inExecutor, inPath, inRootSource }) => {
    const localItems = inItems;
    const localRecipe = inRecipe;
    const localExecutor = inExecutor;
    const localPath = inPath ?? [];
    const localRootSource = inRootSource;

    return localItems.map((item, index) =>
        traverse({
            inSource: item,
            inRecipe: localRecipe,
            inExecutor: localExecutor,
            inPath: [...localPath, index],
            inRootSource: localRootSource
        })
    );
};

export default startFunc;
