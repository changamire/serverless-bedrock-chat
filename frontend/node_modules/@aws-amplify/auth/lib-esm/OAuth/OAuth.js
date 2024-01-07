// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __assign, __awaiter, __generator, __read } from "tslib";
import { parse } from 'url'; // Used for OAuth parsing of Cognito Hosted UI
import { launchUri } from './urlOpener';
import * as oAuthStorage from './oauthStorage';
import { Buffer } from 'buffer';
import { isCognitoHostedOpts, CognitoHostedUIIdentityProvider, } from '../types/Auth';
import { AuthAction, Category, ConsoleLogger as Logger, getAmplifyUserAgent, Hub, urlSafeEncode, USER_AGENT_HEADER, } from '@aws-amplify/core';
import { Sha256 } from '@aws-crypto/sha256-js';
var AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
    ? Symbol.for('amplify_default')
    : '@@amplify_default');
var dispatchAuthEvent = function (event, data, message) {
    Hub.dispatch('auth', { event: event, data: data, message: message }, 'Auth', AMPLIFY_SYMBOL);
};
var logger = new Logger('OAuth');
var OAuth = /** @class */ (function () {
    function OAuth(_a) {
        var config = _a.config, cognitoClientId = _a.cognitoClientId, _b = _a.scopes, scopes = _b === void 0 ? [] : _b;
        this._urlOpener = config.urlOpener || launchUri;
        this._config = config;
        this._cognitoClientId = cognitoClientId;
        if (!this.isValidScopes(scopes))
            throw Error('scopes must be a String Array');
        this._scopes = scopes;
    }
    OAuth.prototype.isValidScopes = function (scopes) {
        return (Array.isArray(scopes) && scopes.every(function (scope) { return typeof scope === 'string'; }));
    };
    OAuth.prototype.oauthSignIn = function (responseType, domain, redirectSignIn, clientId, provider, customState) {
        if (responseType === void 0) { responseType = 'code'; }
        if (provider === void 0) { provider = CognitoHostedUIIdentityProvider.Cognito; }
        var generatedState = this._generateState(32);
        /* encodeURIComponent is not URL safe, use urlSafeEncode instead. Cognito
        single-encodes/decodes url on first sign in and double-encodes/decodes url
        when user already signed in. Using encodeURIComponent, Base32, Base64 add
        characters % or = which on further encoding becomes unsafe. '=' create issue
        for parsing query params.
        Refer: https://github.com/aws-amplify/amplify-js/issues/5218 */
        var state = customState
            ? generatedState + "-" + urlSafeEncode(customState)
            : generatedState;
        oAuthStorage.setState(state);
        var pkce_key = this._generateRandom(128);
        oAuthStorage.setPKCE(pkce_key);
        var code_challenge = this._generateChallenge(pkce_key);
        var code_challenge_method = 'S256';
        var scopesString = this._scopes.join(' ');
        var queryString = Object.entries(__assign(__assign({ redirect_uri: redirectSignIn, response_type: responseType, client_id: clientId, identity_provider: provider, scope: scopesString, state: state }, (responseType === 'code' ? { code_challenge: code_challenge } : {})), (responseType === 'code' ? { code_challenge_method: code_challenge_method } : {})))
            .map(function (_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
        })
            .join('&');
        var URL = "https://" + domain + "/oauth2/authorize?" + queryString;
        logger.debug("Redirecting to " + URL);
        this._urlOpener(URL, redirectSignIn);
    };
    OAuth.prototype._handleCodeFlow = function (currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var code, currentUrlPathname, redirectSignInPathname, oAuthTokenEndpoint, client_id, redirect_uri, code_verifier, oAuthTokenBody, body, customUserAgentDetails, _a, access_token, refresh_token, id_token, error;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        code = (parse(currentUrl).query || '')
                            .split('&')
                            .map(function (pairings) { return pairings.split('='); })
                            .reduce(function (accum, _a) {
                            var _b;
                            var _c = __read(_a, 2), k = _c[0], v = _c[1];
                            return (__assign(__assign({}, accum), (_b = {}, _b[k] = v, _b)));
                        }, { code: undefined }).code;
                        currentUrlPathname = parse(currentUrl).pathname || '/';
                        redirectSignInPathname = parse(this._config.redirectSignIn).pathname || '/';
                        if (!code || currentUrlPathname !== redirectSignInPathname) {
                            return [2 /*return*/];
                        }
                        oAuthTokenEndpoint = 'https://' + this._config.domain + '/oauth2/token';
                        dispatchAuthEvent('codeFlow', {}, "Retrieving tokens from " + oAuthTokenEndpoint);
                        client_id = isCognitoHostedOpts(this._config)
                            ? this._cognitoClientId
                            : this._config.clientID;
                        redirect_uri = isCognitoHostedOpts(this._config)
                            ? this._config.redirectSignIn
                            : this._config.redirectUri;
                        code_verifier = oAuthStorage.getPKCE();
                        oAuthTokenBody = __assign({ grant_type: 'authorization_code', code: code,
                            client_id: client_id,
                            redirect_uri: redirect_uri }, (code_verifier ? { code_verifier: code_verifier } : {}));
                        logger.debug("Calling token endpoint: " + oAuthTokenEndpoint + " with", oAuthTokenBody);
                        body = Object.entries(oAuthTokenBody)
                            .map(function (_a) {
                            var _b = __read(_a, 2), k = _b[0], v = _b[1];
                            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
                        })
                            .join('&');
                        customUserAgentDetails = {
                            category: Category.Auth,
                            action: AuthAction.FederatedSignIn,
                        };
                        return [4 /*yield*/, fetch(oAuthTokenEndpoint, {
                                method: 'POST',
                                headers: (_b = {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    _b[USER_AGENT_HEADER] = getAmplifyUserAgent(customUserAgentDetails),
                                    _b),
                                body: body,
                            })];
                    case 1: return [4 /*yield*/, (_c.sent()).json()];
                    case 2:
                        _a = _c.sent(), access_token = _a.access_token, refresh_token = _a.refresh_token, id_token = _a.id_token, error = _a.error;
                        if (error) {
                            throw new Error(error);
                        }
                        return [2 /*return*/, {
                                accessToken: access_token,
                                refreshToken: refresh_token,
                                idToken: id_token,
                            }];
                }
            });
        });
    };
    OAuth.prototype._handleImplicitFlow = function (currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id_token, access_token;
            return __generator(this, function (_b) {
                _a = (parse(currentUrl).hash || '#')
                    .substr(1) // Remove # from returned code
                    .split('&')
                    .map(function (pairings) { return pairings.split('='); })
                    .reduce(function (accum, _a) {
                    var _b;
                    var _c = __read(_a, 2), k = _c[0], v = _c[1];
                    return (__assign(__assign({}, accum), (_b = {}, _b[k] = v, _b)));
                }, {
                    id_token: undefined,
                    access_token: undefined,
                }), id_token = _a.id_token, access_token = _a.access_token;
                dispatchAuthEvent('implicitFlow', {}, "Got tokens from " + currentUrl);
                logger.debug("Retrieving implicit tokens from " + currentUrl + " with");
                return [2 /*return*/, {
                        accessToken: access_token,
                        idToken: id_token,
                        refreshToken: null,
                    }];
            });
        });
    };
    OAuth.prototype.handleAuthResponse = function (currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var urlParams, error, error_description, state, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        urlParams = currentUrl
                            ? __assign(__assign({}, (parse(currentUrl).hash || '#')
                                .substr(1)
                                .split('&')
                                .map(function (entry) { return entry.split('='); })
                                .reduce(function (acc, _a) {
                                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                                return ((acc[k] = v), acc);
                            }, {})), (parse(currentUrl).query || '')
                                .split('&')
                                .map(function (entry) { return entry.split('='); })
                                .reduce(function (acc, _a) {
                                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                                return ((acc[k] = v), acc);
                            }, {}))
                            : {};
                        error = urlParams.error, error_description = urlParams.error_description;
                        if (error) {
                            throw new Error(error_description);
                        }
                        state = this._validateState(urlParams);
                        logger.debug("Starting " + this._config.responseType + " flow with " + currentUrl);
                        if (!(this._config.responseType === 'code')) return [3 /*break*/, 2];
                        _a = [{}];
                        return [4 /*yield*/, this._handleCodeFlow(currentUrl)];
                    case 1: return [2 /*return*/, __assign.apply(void 0, [__assign.apply(void 0, _a.concat([(_c.sent())])), { state: state }])];
                    case 2:
                        _b = [{}];
                        return [4 /*yield*/, this._handleImplicitFlow(currentUrl)];
                    case 3: return [2 /*return*/, __assign.apply(void 0, [__assign.apply(void 0, _b.concat([(_c.sent())])), { state: state }])];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        logger.debug("Error handling auth response.", e_1);
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OAuth.prototype._validateState = function (urlParams) {
        if (!urlParams) {
            return;
        }
        var savedState = oAuthStorage.getState();
        var returnedState = urlParams.state;
        // This is because savedState only exists if the flow was initiated by Amplify
        if (savedState && savedState !== returnedState) {
            throw new Error('Invalid state in OAuth flow');
        }
        return returnedState;
    };
    OAuth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oAuthLogoutEndpoint, client_id, signout_uri;
            return __generator(this, function (_a) {
                oAuthLogoutEndpoint = 'https://' + this._config.domain + '/logout?';
                client_id = isCognitoHostedOpts(this._config)
                    ? this._cognitoClientId
                    : this._config.oauth.clientID;
                signout_uri = isCognitoHostedOpts(this._config)
                    ? this._config.redirectSignOut
                    : this._config.returnTo;
                oAuthLogoutEndpoint += Object.entries({
                    client_id: client_id,
                    logout_uri: encodeURIComponent(signout_uri),
                })
                    .map(function (_a) {
                    var _b = __read(_a, 2), k = _b[0], v = _b[1];
                    return k + "=" + v;
                })
                    .join('&');
                dispatchAuthEvent('oAuthSignOut', { oAuth: 'signOut' }, "Signing out from " + oAuthLogoutEndpoint);
                logger.debug("Signing out from " + oAuthLogoutEndpoint);
                return [2 /*return*/, this._urlOpener(oAuthLogoutEndpoint, signout_uri)];
            });
        });
    };
    OAuth.prototype._generateState = function (length) {
        var result = '';
        var i = length;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    };
    OAuth.prototype._generateChallenge = function (code) {
        var awsCryptoHash = new Sha256();
        awsCryptoHash.update(code);
        var resultFromAWSCrypto = awsCryptoHash.digestSync();
        var b64 = Buffer.from(resultFromAWSCrypto).toString('base64');
        var base64URLFromAWSCrypto = this._base64URL(b64);
        return base64URLFromAWSCrypto;
    };
    OAuth.prototype._base64URL = function (string) {
        return string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    };
    OAuth.prototype._generateRandom = function (size) {
        var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        var buffer = new Uint8Array(size);
        if (typeof window !== 'undefined' && !!window.crypto) {
            window.crypto.getRandomValues(buffer);
        }
        else {
            for (var i = 0; i < size; i += 1) {
                buffer[i] = (Math.random() * CHARSET.length) | 0;
            }
        }
        return this._bufferToString(buffer);
    };
    OAuth.prototype._bufferToString = function (buffer) {
        var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var state = [];
        for (var i = 0; i < buffer.byteLength; i += 1) {
            var index = buffer[i] % CHARSET.length;
            state.push(CHARSET[index]);
        }
        return state.join('');
    };
    return OAuth;
}());
export default OAuth;
//# sourceMappingURL=OAuth.js.map