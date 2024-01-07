import { AbstractInteractionsProvider } from './InteractionsProvider';
import { InteractionsOptions, AWSLexProviderOptions, InteractionsResponse, InteractionsMessage } from '../types';
import { PostTextCommandOutput, PostContentCommandOutput } from '@aws-sdk/client-lex-runtime-service';
interface PostContentCommandOutputFormatted extends Omit<PostContentCommandOutput, 'audioStream'> {
    audioStream?: Uint8Array;
}
declare type AWSLexProviderSendResponse = PostTextCommandOutput | PostContentCommandOutputFormatted;
export declare class AWSLexProvider extends AbstractInteractionsProvider {
    private lexRuntimeServiceClient;
    private _botsCompleteCallback;
    constructor(options?: InteractionsOptions);
    getProviderName(): string;
    configure(config?: AWSLexProviderOptions): AWSLexProviderOptions;
    /**
     * @private
     * @deprecated
     * This is used internally by 'sendMessage' to call onComplete callback
     * for a bot if configured
     */
    reportBotStatus(data: AWSLexProviderSendResponse, botname: string): void;
    sendMessage(botname: string, message: string | InteractionsMessage): Promise<InteractionsResponse>;
    onComplete(botname: string, callback: (err: any, confirmation: any) => void): void;
}
export {};
