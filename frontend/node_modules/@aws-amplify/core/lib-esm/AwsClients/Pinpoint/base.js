// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getDnsSuffix } from '../../clients/endpoints';
import { jitteredBackoff, getRetryDecider, } from '../../clients/middleware/retry';
import { parseJsonError } from '../../clients/serde/json';
import { getAmplifyUserAgent } from '../../Platform';
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
        url: new URL("https://pinpoint.".concat(region, ".").concat(getDnsSuffix(region))),
    });
};
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
/**
 * @internal
 */
export var getSharedHeaders = function () { return ({
    'content-type': 'application/json',
}); };
