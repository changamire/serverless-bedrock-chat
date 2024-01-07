// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export var CognitoHostedUIIdentityProvider;
(function (CognitoHostedUIIdentityProvider) {
    CognitoHostedUIIdentityProvider["Cognito"] = "COGNITO";
    CognitoHostedUIIdentityProvider["Google"] = "Google";
    CognitoHostedUIIdentityProvider["Facebook"] = "Facebook";
    CognitoHostedUIIdentityProvider["Amazon"] = "LoginWithAmazon";
    CognitoHostedUIIdentityProvider["Apple"] = "SignInWithApple";
})(CognitoHostedUIIdentityProvider || (CognitoHostedUIIdentityProvider = {}));
export function isFederatedSignInOptions(obj) {
    var keys = ['provider'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
export function isFederatedSignInOptionsCustom(obj) {
    var keys = ['customProvider'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
export function hasCustomState(obj) {
    var keys = ['customState'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
export function isCognitoHostedOpts(oauth) {
    return oauth.redirectSignIn !== undefined;
}
export var AuthErrorTypes;
(function (AuthErrorTypes) {
    AuthErrorTypes["NoConfig"] = "noConfig";
    AuthErrorTypes["MissingAuthConfig"] = "missingAuthConfig";
    AuthErrorTypes["EmptyUsername"] = "emptyUsername";
    AuthErrorTypes["InvalidUsername"] = "invalidUsername";
    AuthErrorTypes["EmptyPassword"] = "emptyPassword";
    AuthErrorTypes["EmptyCode"] = "emptyCode";
    AuthErrorTypes["SignUpError"] = "signUpError";
    AuthErrorTypes["NoMFA"] = "noMFA";
    AuthErrorTypes["InvalidMFA"] = "invalidMFA";
    AuthErrorTypes["EmptyChallengeResponse"] = "emptyChallengeResponse";
    AuthErrorTypes["NoUserSession"] = "noUserSession";
    AuthErrorTypes["Default"] = "default";
    AuthErrorTypes["DeviceConfig"] = "deviceConfig";
    AuthErrorTypes["NetworkError"] = "networkError";
    AuthErrorTypes["AutoSignInError"] = "autoSignInError";
})(AuthErrorTypes || (AuthErrorTypes = {}));
export function isUsernamePasswordOpts(obj) {
    return !!obj.username;
}
export var GRAPHQL_AUTH_MODE;
(function (GRAPHQL_AUTH_MODE) {
    GRAPHQL_AUTH_MODE["API_KEY"] = "API_KEY";
    GRAPHQL_AUTH_MODE["AWS_IAM"] = "AWS_IAM";
    GRAPHQL_AUTH_MODE["OPENID_CONNECT"] = "OPENID_CONNECT";
    GRAPHQL_AUTH_MODE["AMAZON_COGNITO_USER_POOLS"] = "AMAZON_COGNITO_USER_POOLS";
    GRAPHQL_AUTH_MODE["AWS_LAMBDA"] = "AWS_LAMBDA";
})(GRAPHQL_AUTH_MODE || (GRAPHQL_AUTH_MODE = {}));
//# sourceMappingURL=Auth.js.map