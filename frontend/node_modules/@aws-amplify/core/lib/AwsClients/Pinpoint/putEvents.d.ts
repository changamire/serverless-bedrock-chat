import { Endpoint, HttpResponse } from '../../clients/types';
import type { PutEventsCommandInput as PutEventsInput, PutEventsCommandOutput as PutEventsOutput } from './types';
export type { PutEventsInput, PutEventsOutput };
/**
 * @internal
 */
export declare const putEvents: (config: Omit<import("../../clients").UserAgentOptions & import("../../clients").RetryOptions<HttpResponse> & import("../../clients").SigningOptions & import("../../clients/types").ServiceClientOptions & {
    service: string;
    endpointResolver: ({ region }: import("../../clients/types").EndpointResolverOptions) => {
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
    endpointResolver?: ((options: import("../../clients/types").EndpointResolverOptions, input?: any) => Endpoint) & (({ region }: import("../../clients/types").EndpointResolverOptions) => {
        url: URL;
    });
}, input: PutEventsInput) => Promise<PutEventsOutput>;
