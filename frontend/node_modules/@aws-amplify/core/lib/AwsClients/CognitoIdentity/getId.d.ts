import { Endpoint, HttpResponse } from '../../clients';
import { GetIdCommandInput as GetIdInput, GetIdCommandOutput as GetIdOutput } from './types';
export type { GetIdInput, GetIdOutput };
/**
 * @internal
 */
export declare const getId: (config: Omit<import("../../clients").UserAgentOptions & import("../../clients").RetryOptions<HttpResponse> & import("../../clients").ServiceClientOptions & {
    service: string;
    endpointResolver: ({ region }: import("../../clients").EndpointResolverOptions) => {
        url: URL;
    };
    retryDecider: (response?: HttpResponse, error?: Error) => Promise<boolean>;
    computeDelay: (attempt: number) => number;
    userAgentValue: string;
}, "retryDecider" | "computeDelay" | "userAgentValue" | "service" | "endpointResolver"> & {
    retryDecider?: ((response?: HttpResponse, error?: unknown) => Promise<boolean>) & ((response?: HttpResponse, error?: Error) => Promise<boolean>);
    computeDelay?: (attempt: number) => number;
    userAgentValue?: string;
    service?: string;
    endpointResolver?: ((options: import("../../clients").EndpointResolverOptions, input?: any) => Endpoint) & (({ region }: import("../../clients").EndpointResolverOptions) => {
        url: URL;
    });
}, input: GetIdInput) => Promise<GetIdOutput>;
