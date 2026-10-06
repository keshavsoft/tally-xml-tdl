import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const getRootDir = ({ inStartDir }) => {
    const localStartDir = inStartDir;
    let cur = localStartDir;
    while (cur && !fs.existsSync(path.join(cur, "package.json"))) {
        const parent = path.dirname(cur);
        if (parent === cur) break;
        cur = parent;
    }
    return cur;
};

export const unwrapData = ({ inData }) => {
    const localData = inData;
    if (!localData || typeof localData !== "object") return localData;

    if (localData?.ENVELOPE?.BODY?.DATA?.COLLECTION) {
        return localData.ENVELOPE.BODY.DATA.COLLECTION;
    }
    if (localData?.ENVELOPE?.BODY?.DATA) {
        return localData.ENVELOPE.BODY.DATA;
    }
    if (localData?.ENVELOPE) {
        const { HEADER, ...rest } = localData.ENVELOPE;
        return rest;
    }
    return localData;
};

export const saveOutput = ({ inCallerFile, inData, inFileName }) => {
    const localCallerFile = inCallerFile;
    const localData = inData;
    const localFileName = inFileName;

    const callerPath = localCallerFile.startsWith("file://") ? fileURLToPath(localCallerFile) : localCallerFile;
    const rootDir = getRootDir({ inStartDir: path.dirname(callerPath) });
    const testDir = path.join(rootDir, "Test");
    const relPath = path.relative(testDir, callerPath);
    const parsed = path.parse(relPath);
    const targetDir = path.join(rootDir, "Data", parsed.dir);
    const fileName = localFileName || `${parsed.name}.json`;
    const targetFilePath = path.join(targetDir, fileName);

    const dataToSave = unwrapData({ inData: localData });

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(targetFilePath, JSON.stringify(dataToSave, null, 2));
    console.log(`Saved output to: ${targetFilePath}`);
    return targetFilePath;
};

export default saveOutput;
