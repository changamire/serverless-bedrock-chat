"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Auth_1 = require("./Auth");
exports.Auth = Auth_1.Auth;
var Auth_2 = require("./types/Auth");
exports.CognitoHostedUIIdentityProvider = Auth_2.CognitoHostedUIIdentityProvider;
exports.GRAPHQL_AUTH_MODE = Auth_2.GRAPHQL_AUTH_MODE;
var amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
exports.CognitoUser = amazon_cognito_identity_js_1.CognitoUser;
exports.CookieStorage = amazon_cognito_identity_js_1.CookieStorage;
exports.appendToCognitoUserAgent = amazon_cognito_identity_js_1.appendToCognitoUserAgent;
var AuthErrorStrings_1 = require("./common/AuthErrorStrings");
exports.AuthErrorStrings = AuthErrorStrings_1.AuthErrorStrings;
/**
 * @deprecated use named import
 */
exports.default = Auth_1.Auth;
//# sourceMappingURL=index.js.map