/**
 * Converts an XML string into a JavaScript object.
 * Attributes are prefixed with '@_'.
 */
export function xmlToJson<T = any>(xml: string, options?: Record<string, any>): T;

/**
 * Converts a JavaScript object into a formatted XML string.
 */
export function jsonToXml(jsonObj: Record<string, any>, options?: Record<string, any>): string;

export interface CreateEnvelopeOptions {
    id?: string;
    type?: string;
    staticVariables?: Record<string, any>;
    tdlMessage?: Record<string, any>;
}

/**
 * Creates a base Tally XML Envelope JavaScript Object.
 */
export function createEnvelope(options?: CreateEnvelopeOptions): Record<string, any>;

export interface CreateCollectionEnvelopeOptions {
    name: string;
    type: string;
    fields?: string | string[];
    filters?: Record<string, any>;
    staticVariables?: Record<string, any>;
}

/**
 * Creates a Tally Collection Request Envelope object.
 */
export function createCollectionEnvelope(options: CreateCollectionEnvelopeOptions): Record<string, any>;

/**
 * Directly builds a Tally XML string for a collection request.
 */
export function buildCollectionXml(options: CreateCollectionEnvelopeOptions): string;

export interface SendXmlOptions {
    xml: string;
    url?: string;
}

/**
 * Sends a raw XML string to Tally via HTTP POST and returns the raw response text.
 */
export function sendXml(options: SendXmlOptions): Promise<string>;

export interface SendToTallyOptions {
    xml: string;
    url?: string;
}

/**
 * Sends an XML payload to Tally via HTTP POST and returns parsed JSON response.
 */
export function sendToTally<T = any>(options: SendToTallyOptions): Promise<T>;

export interface FetchCollectionOptions {
    name: string;
    type: string;
    fields?: string | string[];
    filters?: Record<string, any>;
    staticVariables?: Record<string, any>;
    url?: string;
}

/**
 * High-level helper to fetch any Tally collection directly.
 */
export function fetchCollection<T = any>(options: FetchCollectionOptions): Promise<T>;

export interface ExecuteBodyOptions {
    full?: boolean;
    url?: string;
}

/**
 * Executes a Tally request from a JSON body (either envelope or collection definition).
 * If options.full is false (default), returns only the children of DATA.COLLECTION on success.
 * If options.full is true, returns the raw full ENVELOPE JSON response.
 */
export function executeBody<T = any>(body: Record<string, any>, options?: ExecuteBodyOptions): Promise<T>;

/**
 * Validates a parsed Tally response object.
 */
export function validateResponse<T = any>(res: T): T;

/**
 * Extracts and unwraps the collection entities from a parsed Tally response object.
 */
export function extractCollection<T = any>(res: any): T;

// Story modules
export * as request from "./core/request/index.js";
export * as transport from "./core/transport/index.js";
export * as response from "./core/response/index.js";
export * as execute from "./core/execute/index.js";
export * as core from "./core/index.js";
