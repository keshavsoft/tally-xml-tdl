import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeXml } from "../../../core/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, "body.xml"), "utf8");

const get = (options) => executeXml(body, options);

export default get;
