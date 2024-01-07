// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Auth } from './Auth';
import { CognitoHostedUIIdentityProvider, GRAPHQL_AUTH_MODE, } from './types/Auth';
import { CognitoUser, CookieStorage, appendToCognitoUserAgent, } from 'amazon-cognito-identity-js';
import { AuthErrorStrings } from './common/AuthErrorStrings';
/**
 * @deprecated use named import
 */
export default Auth;
export { Auth, CognitoUser, CookieStorage, CognitoHostedUIIdentityProvider, appendToCognitoUserAgent, AuthErrorStrings, GRAPHQL_AUTH_MODE, };
//# sourceMappingURL=index.js.map