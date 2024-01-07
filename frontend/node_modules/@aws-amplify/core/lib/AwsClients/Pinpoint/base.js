"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedHeaders = exports.defaultConfig = void 0;
var endpoints_1 = require("../../clients/endpoints");
var retry_1 = require("../../clients/middleware/retry");
var json_1 = require("../../clients/serde/json");
var Platform_1 = require("../../Platform");
/**
 * The service name used to sign requests if the API requires authentication.
 */
var SERVICE_NAME = 'mobiletargeting';
/**
 * The endpoint resolver function that returns the endpoint URL for a given region.
 */
var endpointResolver = function (_a) {
    var region = _a.region;
    return ({
        url: new URL("https://pinpoint.".concat(region, ".").concat((0, endpoints_1.getDnsSuffix)(region))),
    });
};
/**
 * @internal
 */
exports.defaultConfig = {
    service: SERVICE_NAME,
    endpointResolver: endpointResolver,
    retryDecider: (0, retry_1.getRetryDecider)(json_1.parseJsonError),
    computeDelay: retry_1.jitteredBackoff,
    userAgentValue: (0, Platform_1.getAmplifyUserAgent)(),
};
/**
 * @internal
 */
var getSharedHeaders = function () { return ({
    'content-type': 'application/json',
}); };
exports.getSharedHeaders = getSharedHeaders;
