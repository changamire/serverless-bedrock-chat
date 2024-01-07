import { InteractionsOptions } from './Interactions';
import { InteractionsResponse } from './Response';
export interface InteractionsProvider {
    configure(config: InteractionsOptions): InteractionsOptions;
    getCategory(): string;
    getProviderName(): string;
    sendMessage(botname: string, message: string | Object): Promise<object>;
    onComplete(botname: string, callback: (err: any, confirmation: InteractionsResponse) => void): any;
}
export interface InteractionsProviders {
    [key: string]: InteractionsProvider;
}
