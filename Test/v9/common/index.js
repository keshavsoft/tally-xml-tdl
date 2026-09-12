import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as v4 from "../../../src/v4/index.js";

export const getRootDir = (startDir) => {
    let cur = startDir;
    while (cur && !fs.existsSync(path.join(cur, "package.json"))) {
        const parent = path.dirname(cur);
        if (parent === cur) break;
        cur = parent;
    }
    return cur;
};

export const saveOutput = ({ callerFile, inData, inFileName }) => {
    const rootDir = getRootDir(path.dirname(callerFile));
    const testDir = path.join(rootDir, "Test");
    const relPath = path.relative(testDir, callerFile);
    const parsed = path.parse(relPath);
    const targetDir = path.join(rootDir, "Data", parsed.dir);
    const fileName = inFileName || `${parsed.name}.json`;
    const targetFilePath = path.join(targetDir, fileName);

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(targetFilePath, JSON.stringify(inData, null, 2));
    console.log(`Saved output to: ${targetFilePath}`);
    return targetFilePath;
};

export const runTest = async (callerUrl, options = {}) => {
    const callerFile = fileURLToPath(callerUrl);
    const rootDir = getRootDir(path.dirname(callerFile));
    const testV8Dir = path.join(rootDir, "Test", "v8");
    const relPath = path.relative(testV8Dir, callerFile).replace(/\\/g, "/");
    const pathWithoutExt = relPath.replace(/\.js$/, "");

    // Resolve matching function in src/v4
    const segments = pathWithoutExt.split("/");
    let fn = v4;
    for (const seg of segments) {
        fn = fn?.[seg];
    }

    if (typeof fn !== "function") {
        throw new Error(`Could not resolve domain function in src/v4 for path: ${relPath}`);
    }

    const data = await fn(options);
    saveOutput({ callerFile, inData: data, inFileName: options.inFileName });
    return data;
};
