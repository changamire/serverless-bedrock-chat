export declare const isEmpty: (obj?: {}) => boolean;
export declare const sortByField: (list: any, field: any, dir: any) => boolean;
export declare const objectLessAttributes: (obj: any, less: any) => any;
export declare const filenameToContentType: (filename: any, defVal?: string) => string;
export declare const isTextFile: (contentType: any) => boolean;
export declare const generateRandomString: () => string;
export declare const makeQuerablePromise: (promise: any) => any;
export declare const isWebWorker: () => boolean;
export declare const browserOrNode: () => {
    isBrowser: boolean;
    isNode: boolean;
};
/**
 * transfer the first letter of the keys to lowercase
 * @param {Object} obj - the object need to be transferred
 * @param {Array} whiteListForItself - whitelist itself from being transferred
 * @param {Array} whiteListForChildren - whitelist its children keys from being transferred
 */
export declare const transferKeyToLowerCase: (obj: any, whiteListForItself?: any[], whiteListForChildren?: any[]) => any;
/**
 * transfer the first letter of the keys to lowercase
 * @param {Object} obj - the object need to be transferred
 * @param {Array} whiteListForItself - whitelist itself from being transferred
 * @param {Array} whiteListForChildren - whitelist its children keys from being transferred
 */
export declare const transferKeyToUpperCase: (obj: any, whiteListForItself?: any[], whiteListForChildren?: any[]) => any;
/**
 * Return true if the object is a strict object
 * which means it's not Array, Function, Number, String, Boolean or Null
 * @param obj the Object
 */
export declare const isStrictObject: (obj: any) => boolean;
