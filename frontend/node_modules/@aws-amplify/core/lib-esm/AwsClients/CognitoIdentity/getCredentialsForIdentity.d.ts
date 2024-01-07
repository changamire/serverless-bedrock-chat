import { Endpoint, HttpResponse } from '../../clients';
import type { GetCredentialsForIdentityCommandInput as GetCredentialsForIdentityInput, GetCredentialsForIdentityCommandOutput as GetCredentialsForIdentityOutput } from './types';
export type { GetCredentialsForIdentityInput, GetCredentialsForIdentityOutput };
/**
 * @internal
 */
export declare const getCredentialsForIdentity: (config: Omit<import("../../clients").UserAgentOptions & import("../../clients").RetryOptions<HttpResponse> & import("../../clients").ServiceClientOptions & {
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
}, input: GetCredentialsForIdentityInput) => Promise<GetCredentialsForIdentityOutput>;
