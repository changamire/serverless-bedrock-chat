import { ServiceClientOptions } from '../types/aws';
import { TransferHandler, Endpoint } from '../types/core';
import { HttpRequest, HttpResponse } from '../types/http';
export declare const composeServiceApi: <TransferHandlerOptions, Input, Output, DefaultConfig extends Partial<TransferHandlerOptions & ServiceClientOptions>>(transferHandler: TransferHandler<HttpRequest, HttpResponse, TransferHandlerOptions>, serializer: (input: Input, endpoint: Endpoint) => Promise<HttpRequest> | HttpRequest, deserializer: (output: HttpResponse) => Promise<Output>, defaultConfig: DefaultConfig) => (config: OptionalizeKey<TransferHandlerOptions & ServiceClientOptions & DefaultConfig, keyof DefaultConfig>, input: Input) => Promise<Output>;
type OptionalizeKey<T, K> = Omit<T, K & keyof T> & {
    [P in K & keyof T]?: T[P];
};
export {};
