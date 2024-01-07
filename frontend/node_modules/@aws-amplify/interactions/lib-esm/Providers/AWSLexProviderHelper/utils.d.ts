export declare const convert: (stream: object) => Promise<Uint8Array>;
export declare const base64ToArrayBuffer: (base64: string) => Uint8Array;
export declare const gzipDecompressToString: (data: Uint8Array) => Promise<string>;
