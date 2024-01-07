import { ICookieStorageData, ICognitoStorage } from 'amazon-cognito-identity-js';
/**
 * Parameters for user sign up
 */
export interface SignUpParams {
    username: string;
    password: string;
    attributes?: object;
    validationData?: {
        [key: string]: any;
    };
    clientMetadata?: {
        [key: string]: string;
    };
    autoSignIn?: AutoSignInOptions;
}
export interface AuthCache {
    setItem(): any;
    getItem(): any;
    removeItem(): any;
}
/**
 * Auth instance options
 */
export interface AuthOptions {
    userPoolId?: string;
    userPoolWebClientId?: string;
    identityPoolId?: string;
    region?: string;
    mandatorySignIn?: boolean;
    cookieStorage?: ICookieStorageData;
    oauth?: OAuthOpts;
    refreshHandlers?: object;
    storage?: ICognitoStorage;
    authenticationFlowType?: string;
    identityPoolRegion?: string;
    clientMetadata?: any;
    endpoint?: string;
    signUpVerificationMethod?: 'code' | 'link';
}
export declare enum CognitoHostedUIIdentityProvider {
    Cognito = "COGNITO",
    Google = "Google",
    Facebook = "Facebook",
    Amazon = "LoginWithAmazon",
    Apple = "SignInWithApple"
}
export declare type LegacyProvider = 'google' | 'facebook' | 'amazon' | 'developer' | string;
export declare type FederatedSignInOptions = {
    provider: CognitoHostedUIIdentityProvider;
    customState?: string;
};
export declare type FederatedSignInOptionsCustom = {
    customProvider: string;
    customState?: string;
};
export declare function isFederatedSignInOptions(obj: any): obj is FederatedSignInOptions;
export declare function isFederatedSignInOptionsCustom(obj: any): obj is FederatedSignInOptionsCustom;
export declare function hasCustomState(obj: any): boolean;
/**
 * Details for multi-factor authentication
 */
export interface MfaRequiredDetails {
    challengeName: any;
    challengeParameters: any;
}
/**
 * interface for federatedResponse
 */
export interface FederatedResponse {
    token: string;
    identity_id?: string;
    expires_at: number;
}
/**
 * interface for federatedUser
 */
export interface FederatedUser {
    name: string;
    email?: string;
    picture?: string;
}
export interface AwsCognitoOAuthOpts {
    domain: string;
    scope: Array<string>;
    redirectSignIn: string;
    redirectSignOut: string;
    responseType: string;
    options?: object;
    urlOpener?: (url: string, redirectUrl: string) => Promise<any>;
}
export declare function isCognitoHostedOpts(oauth: OAuthOpts): oauth is AwsCognitoOAuthOpts;
export interface Auth0OAuthOpts {
    domain: string;
    clientID: string;
    scope: string;
    redirectUri: string;
    audience: string;
    responseType: string;
    returnTo: string;
    urlOpener?: (url: string, redirectUrl: string) => Promise<any>;
}
export declare type OAuthOpts = AwsCognitoOAuthOpts | Auth0OAuthOpts;
export interface ConfirmSignUpOptions {
    forceAliasCreation?: boolean;
    clientMetadata?: ClientMetaData;
}
export interface SignOutOpts {
    global?: boolean;
}
export interface CurrentUserOpts {
    bypassCache: boolean;
}
export interface GetPreferredMFAOpts {
    bypassCache: boolean;
}
export declare type UsernamePasswordOpts = {
    username: string;
    password: string;
    validationData?: {
        [key: string]: any;
    };
};
export declare enum AuthErrorTypes {
    NoConfig = "noConfig",
    MissingAuthConfig = "missingAuthConfig",
    EmptyUsername = "emptyUsername",
    InvalidUsername = "invalidUsername",
    EmptyPassword = "emptyPassword",
    EmptyCode = "emptyCode",
    SignUpError = "signUpError",
    NoMFA = "noMFA",
    InvalidMFA = "invalidMFA",
    EmptyChallengeResponse = "emptyChallengeResponse",
    NoUserSession = "noUserSession",
    Default = "default",
    DeviceConfig = "deviceConfig",
    NetworkError = "networkError",
    AutoSignInError = "autoSignInError"
}
export declare type AuthErrorMessages = {
    [key in AuthErrorTypes]: AuthErrorMessage;
};
export interface AuthErrorMessage {
    message: string;
    log?: string;
}
export declare type SignInOpts = UsernamePasswordOpts;
export declare type ClientMetaData = {
    [key: string]: string;
} | undefined;
export declare function isUsernamePasswordOpts(obj: any): obj is UsernamePasswordOpts;
export interface IAuthDevice {
    id: string;
    name: string;
}
export interface AutoSignInOptions {
    enabled: boolean;
    clientMetaData?: ClientMetaData;
    validationData?: {
        [key: string]: any;
    };
}
export declare enum GRAPHQL_AUTH_MODE {
    API_KEY = "API_KEY",
    AWS_IAM = "AWS_IAM",
    OPENID_CONNECT = "OPENID_CONNECT",
    AMAZON_COGNITO_USER_POOLS = "AMAZON_COGNITO_USER_POOLS",
    AWS_LAMBDA = "AWS_LAMBDA"
}
