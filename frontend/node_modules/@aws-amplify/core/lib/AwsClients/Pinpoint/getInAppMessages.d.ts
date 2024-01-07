import { Endpoint, HttpResponse } from '../../clients/types';
import type { GetInAppMessagesCommandInput as GetInAppMessagesInput, GetInAppMessagesCommandOutput as GetInAppMessagesOutput } from './types';
export type { GetInAppMessagesInput, GetInAppMessagesOutput };
/**
 * @internal
 */
export declare const getInAppMessages: (config: Omit<import("../../clients").UserAgentOptions & import("../../clients").RetryOptions<HttpResponse> & import("../../clients").SigningOptions & import("../../clients/types").ServiceClientOptions & {
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
}, input: GetInAppMessagesInput) => Promise<GetInAppMessagesOutput>;
