export function company(showLog?: boolean): Promise<any>;
export default company;

export interface V6Options {
    company: string;
    jsonId: string;
    url?: string;
}

export function get<T = any>(options?: V6Options): Promise<T>;
export function clean<T = any>(options?: V6Options): Promise<T>;

export * as v6 from "./src/v6/index.js";
export * as v13 from "./src/v13/main.js";

