import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
    jsonToXml,
    sendToTally,
    fetchCollection
} from "../../../src/v1/index.js";

export const getRootDir = (startDir) => {
    let cur = startDir;
    while (cur && !fs.existsSync(path.join(cur, "package.json"))) {
        const parent = path.dirname(cur);
        if (parent === cur) break;
        cur = parent;
    }
    return cur;
};

export const saveOutput = ({ dirName, inData, inFileName = "data.json" }) => {
    const rootDir = getRootDir(dirName);
    const testDir = path.join(rootDir, "Test");
    const relPath = path.relative(testDir, dirName);
    const targetDir = path.join(rootDir, "Data", relPath);

    fs.mkdirSync(targetDir, { recursive: true });
    const targetFilePath = path.join(targetDir, inFileName);
    fs.writeFileSync(targetFilePath, JSON.stringify(inData, null, 2));
    console.log(`Saved output to: ${targetFilePath}`);
    return targetFilePath;
};

export const runTest = async (callerUrl, options = {}) => {
    const callerFile = fileURLToPath(callerUrl);
    const dirName = path.dirname(callerFile);

    const bodyPath = options.bodyPath || path.join(dirName, "body.json");
    const body = options.body || JSON.parse(fs.readFileSync(bodyPath, "utf8"));

    let res;
    if (body.ENVELOPE) {
        const xml = jsonToXml(body);
        res = await sendToTally({ xml, url: options.url });
    } else if (body.name && body.type) {
        res = await fetchCollection({ ...body, url: options.url });
    } else {
        throw new Error(`Unrecognized body format in ${bodyPath}`);
    }

    const dataToSave = options.transform ? options.transform(res) : res;
    saveOutput({ dirName, inData: dataToSave, inFileName: options.inFileName || "data.json" });

    return res;
};
