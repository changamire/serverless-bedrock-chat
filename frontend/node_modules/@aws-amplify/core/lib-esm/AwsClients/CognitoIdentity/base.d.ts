import { Endpoint, EndpointResolverOptions, Headers, HttpRequest, HttpResponse } from '../../clients';
/**
 * A Cognito Identity-specific transfer handler that does NOT sign requests, and
 * disables caching.
 *
 * @internal
 */
export declare const cognitoIdentityTransferHandler: (request: HttpRequest, options: import("../../clients").UserAgentOptions & import("../../clients").RetryOptions<HttpResponse>) => Promise<HttpResponse>;
/**
 * @internal
 */
export declare const defaultConfig: {
    service: string;
    endpointResolver: ({ region }: EndpointResolverOptions) => {
        url: URL;
    };
    retryDecider: (response?: HttpResponse, error?: Error) => Promise<boolean>;
    computeDelay: (attempt: number) => number;
    userAgentValue: string;
};
/**
 * @internal
 */
export declare const getSharedHeaders: (operation: string) => Headers;
/**
 * @internal
 */
export declare const buildHttpRpcRequest: ({ url }: Endpoint, headers: Headers, body: any) => HttpRequest;
