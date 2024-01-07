"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var CognitoHostedUIIdentityProvider;
(function (CognitoHostedUIIdentityProvider) {
    CognitoHostedUIIdentityProvider["Cognito"] = "COGNITO";
    CognitoHostedUIIdentityProvider["Google"] = "Google";
    CognitoHostedUIIdentityProvider["Facebook"] = "Facebook";
    CognitoHostedUIIdentityProvider["Amazon"] = "LoginWithAmazon";
    CognitoHostedUIIdentityProvider["Apple"] = "SignInWithApple";
})(CognitoHostedUIIdentityProvider = exports.CognitoHostedUIIdentityProvider || (exports.CognitoHostedUIIdentityProvider = {}));
function isFederatedSignInOptions(obj) {
    var keys = ['provider'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
exports.isFederatedSignInOptions = isFederatedSignInOptions;
function isFederatedSignInOptionsCustom(obj) {
    var keys = ['customProvider'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
exports.isFederatedSignInOptionsCustom = isFederatedSignInOptionsCustom;
function hasCustomState(obj) {
    var keys = ['customState'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
exports.hasCustomState = hasCustomState;
function isCognitoHostedOpts(oauth) {
    return oauth.redirectSignIn !== undefined;
}
exports.isCognitoHostedOpts = isCognitoHostedOpts;
var AuthErrorTypes;
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
})(AuthErrorTypes = exports.AuthErrorTypes || (exports.AuthErrorTypes = {}));
function isUsernamePasswordOpts(obj) {
    return !!obj.username;
}
exports.isUsernamePasswordOpts = isUsernamePasswordOpts;
var GRAPHQL_AUTH_MODE;
(function (GRAPHQL_AUTH_MODE) {
    GRAPHQL_AUTH_MODE["API_KEY"] = "API_KEY";
    GRAPHQL_AUTH_MODE["AWS_IAM"] = "AWS_IAM";
    GRAPHQL_AUTH_MODE["OPENID_CONNECT"] = "OPENID_CONNECT";
    GRAPHQL_AUTH_MODE["AMAZON_COGNITO_USER_POOLS"] = "AMAZON_COGNITO_USER_POOLS";
    GRAPHQL_AUTH_MODE["AWS_LAMBDA"] = "AWS_LAMBDA";
})(GRAPHQL_AUTH_MODE = exports.GRAPHQL_AUTH_MODE || (exports.GRAPHQL_AUTH_MODE = {}));
//# sourceMappingURL=Auth.js.map