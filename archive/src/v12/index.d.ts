export interface V6Options {
    company: string;
    jsonId: string;
    url?: string;
}

export function get<T = any>(options?: V6Options): Promise<T>;
export function clean<T = any>(options?: V6Options): Promise<T>;
