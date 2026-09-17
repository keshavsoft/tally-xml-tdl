import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllFiles = (dirPath, arrayOfFiles = []) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== "common") {
                getAllFiles(fullPath, arrayOfFiles);
            }
        } else if (file.endsWith(".js") && file !== "runAllTests.js") {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
};

const testFiles = getAllFiles(__dirname);

console.log(`\n========================================`);
console.log(`Running ${testFiles.length} Tests in Test/v9 using direct src/v4`);
console.log(`========================================\n`);

let passed = 0;
let failed = 0;
const failures = [];

testFiles.forEach((file) => {
    const relPath = path.relative(__dirname, file);
    process.stdout.write(`Testing: ${relPath.padEnd(50, " ")} `);

    try {
        execSync(`node "${file}"`, {
            cwd: path.dirname(file),
            stdio: "pipe",
            timeout: 60000
        });
        console.log("[\x1b[32mPASS\x1b[0m]");
        passed++;
    } catch (err) {
        console.log("[\x1b[31mFAIL\x1b[0m]");
        failed++;
        failures.push({
            file: relPath,
            error: err.stderr?.toString() || err.message
        });
    }
});

console.log(`\n========================================`);
console.log(`Summary: Total: ${testFiles.length} | Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
    console.error("Failures:");
    failures.forEach(f => {
        console.error(`\n--- ${f.file} ---`);
        console.error(f.error);
    });
    process.exit(1);
} else {
    console.log("All Test/v9 tests passed successfully using direct src/v4!\n");
}




