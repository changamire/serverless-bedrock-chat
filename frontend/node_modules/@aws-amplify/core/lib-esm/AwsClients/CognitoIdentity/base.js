// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getDnsSuffix, unauthenticatedHandler, parseJsonError, } from '../../clients';
import { composeTransferHandler } from '../../clients/internal/composeTransferHandler';
import { jitteredBackoff, getRetryDecider, } from '../../clients/middleware/retry';
import { getAmplifyUserAgent } from '../../Platform';
import { observeFrameworkChanges } from '../../Platform/detectFramework';
/**
 * The service name used to sign requests if the API requires authentication.
 */
var SERVICE_NAME = 'cognito-identity';
/**
 * The endpoint resolver function that returns the endpoint URL for a given region.
 */
var endpointResolver = function (_a) {
    var region = _a.region;
    return ({
        url: new URL("https://cognito-identity.".concat(region, ".").concat(getDnsSuffix(region))),
    });
};
/**
 * A Cognito Identity-specific middleware that disables caching for all requests.
 */
var disableCacheMiddleware = function () { return function (next, context) {
    return function disableCacheMiddleware(request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                request.headers['cache-control'] = 'no-store';
                return [2 /*return*/, next(request)];
            });
        });
    };
}; };
/**
 * A Cognito Identity-specific transfer handler that does NOT sign requests, and
 * disables caching.
 *
 * @internal
 */
export var cognitoIdentityTransferHandler = composeTransferHandler(unauthenticatedHandler, [disableCacheMiddleware]);
/**
 * @internal
 */
export var defaultConfig = {
    service: SERVICE_NAME,
    endpointResolver: endpointResolver,
    retryDecider: getRetryDecider(parseJsonError),
    computeDelay: jitteredBackoff,
    userAgentValue: getAmplifyUserAgent(),
};
observeFrameworkChanges(function () {
    defaultConfig.userAgentValue = getAmplifyUserAgent();
});
/**
 * @internal
 */
export var getSharedHeaders = function (operation) { return ({
    'content-type': 'application/x-amz-json-1.1',
    'x-amz-target': "AWSCognitoIdentityService.".concat(operation),
}); };
/**
 * @internal
 */
export var buildHttpRpcRequest = function (_a, headers, body) {
    var url = _a.url;
    return ({
        headers: headers,
        url: url,
        body: body,
        method: 'POST',
    });
};
