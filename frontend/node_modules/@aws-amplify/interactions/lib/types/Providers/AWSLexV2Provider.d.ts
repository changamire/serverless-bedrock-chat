export interface AWSLexV2ProviderOption {
    name: string;
    botId: string;
    aliasId: string;
    localeId: string;
    region: string;
    providerName: string;
    onComplete?(botname: string, callback: (err: any, confirmation: any) => void): void;
}
export interface AWSLexV2ProviderOptions {
    [key: string]: AWSLexV2ProviderOption;
}
