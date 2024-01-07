import { DelayFunction } from '../types';
export declare class NonRetryableError extends Error {
    readonly nonRetryable = true;
    constructor(message: string);
}
export declare const isNonRetryableError: (obj: any) => obj is NonRetryableError;
/**
 * @private
 * Internal use of Amplify only
 */
export declare function retry<T>(functionToRetry: (...args: any[]) => T, args: any[], delayFn: DelayFunction, onTerminate?: Promise<void>): Promise<T>;
/**
 * @private
 * Internal use of Amplify only
 */
export declare function jitteredBackoff(maxDelayMs?: number): DelayFunction;
/**
 * @private
 * Internal use of Amplify only
 */
export declare const jitteredExponentialRetry: <T>(functionToRetry: (...args: any[]) => T, args: any[], maxDelayMs?: number, onTerminate?: Promise<void>) => Promise<T>;
