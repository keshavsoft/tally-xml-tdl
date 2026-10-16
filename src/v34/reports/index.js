import { reports } from "tally-extract";
import resolvePath from "./resolvePath.js";
import validatePath from "./validatePath.js";

const startFunc = async (path, company) => {
    // console.log("path : ", path);

    const fullPath = resolvePath(path);
    // console.log("fullPath : ", fullPath);

    validatePath(fullPath);
    // console.log("fullPath : ", fullPath);
    return await reports(fullPath, company);
};

export default startFunc;
