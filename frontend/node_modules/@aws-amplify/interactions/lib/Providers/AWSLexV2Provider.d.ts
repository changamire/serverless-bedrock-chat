import { AbstractInteractionsProvider } from './InteractionsProvider';
import { InteractionsOptions, AWSLexV2ProviderOptions, InteractionsResponse, InteractionsMessage } from '../types';
export declare class AWSLexV2Provider extends AbstractInteractionsProvider {
    private _lexRuntimeServiceV2Client;
    private _botsCompleteCallback;
    /**
     * Initialize Interactions with AWS configurations
     * @param {InteractionsOptions} options - Configuration object for Interactions
     */
    constructor(options?: InteractionsOptions);
    /**
     * get provider name of the plugin
     * @returns {string} name of the provider
     */
    getProviderName(): string;
    /**
     * Configure Interactions part with aws configuration
     * @param {AWSLexV2ProviderOptions} config - Configuration of the Interactions
     * @return {AWSLexV2ProviderOptions} - Current configuration
     */
    configure(config?: AWSLexV2ProviderOptions): AWSLexV2ProviderOptions;
    /**
     * Send a message to a bot
     * @async
     * @param {string} botname - Bot name to send the message
     * @param {string | InteractionsMessage} message - message to send to the bot
     * @return {Promise<InteractionsResponse>} A promise resolves to the response from the bot
     */
    sendMessage(botname: string, message: string | InteractionsMessage): Promise<InteractionsResponse>;
    /**
     * Attach a onComplete callback function to a bot.
     * The callback is called once the bot's intent is fulfilled
     * @param {string} botname - Bot name to attach the onComplete callback
     * @param {(err: Error | null, confirmation: InteractionsResponse) => void} callback - called when Intent Fulfilled
     */
    onComplete(botname: string, callback: (err: Error | null, confirmation: InteractionsResponse) => void): void;
    /**
     * @private
     * call onComplete callback for a bot if configured
     */
    private _reportBotStatus;
    /**
     * Format UtteranceCommandOutput's response
     * decompress attributes
     * update audioStream format
     */
    private _formatUtteranceCommandOutput;
    /**
     * handle client's `RecognizeTextCommand`
     * used for sending simple text message
     */
    private _handleRecognizeTextCommand;
    /**
     * handle client's `RecognizeUtteranceCommand`
     * used for obj text or obj voice message
     */
    private _handleRecognizeUtteranceCommand;
}
