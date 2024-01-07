// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var parseMetadata = function (response) {
    var _a, _b;
    var headers = response.headers, statusCode = response.statusCode;
    return __assign(__assign({}, (isMetadataBearer(response) ? response.$metadata : {})), { httpStatusCode: statusCode, requestId: (_b = (_a = headers['x-amzn-requestid']) !== null && _a !== void 0 ? _a : headers['x-amzn-request-id']) !== null && _b !== void 0 ? _b : headers['x-amz-request-id'], extendedRequestId: headers['x-amz-id-2'], cfId: headers['x-amz-cf-id'] });
};
var isMetadataBearer = function (response) {
    return typeof (response === null || response === void 0 ? void 0 : response['$metadata']) === 'object';
};
