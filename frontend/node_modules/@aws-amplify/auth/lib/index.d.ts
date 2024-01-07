import { Auth } from './Auth';
import { CognitoHostedUIIdentityProvider, SignUpParams, GRAPHQL_AUTH_MODE } from './types/Auth';
import { CognitoUser, CookieStorage, appendToCognitoUserAgent } from 'amazon-cognito-identity-js';
import { AuthErrorStrings } from './common/AuthErrorStrings';
/**
 * @deprecated use named import
 */
export default Auth;
export { Auth, CognitoUser, CookieStorage, CognitoHostedUIIdentityProvider, SignUpParams, appendToCognitoUserAgent, AuthErrorStrings, GRAPHQL_AUTH_MODE, };
