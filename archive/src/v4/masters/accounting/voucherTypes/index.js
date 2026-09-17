import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeBody } from "../../../core/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const body = JSON.parse(fs.readFileSync(path.join(__dirname, "body.json"), "utf8"));

export const get = (options) => executeBody(body, options);
get.body = body;

export default get;
