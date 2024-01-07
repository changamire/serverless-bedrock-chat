"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRequest = void 0;
var getSignedHeaders_1 = require("./utils/getSignedHeaders");
var getSigningValues_1 = require("./utils/getSigningValues");
var constants_1 = require("./constants");
var getSignature_1 = require("./utils/getSignature");
/**
 * Given a `HttpRequest`, returns a Signature Version 4 signed `HttpRequest`.
 *
 * @param request `HttpRequest` to be signed.
 * @param signRequestOptions `SignRequestOptions` object containing values used to construct the signature.
 * @returns A `HttpRequest` with authentication headers which can grant temporary access to AWS resources.
 */
var signRequest = function (request, options) {
    var signingValues = (0, getSigningValues_1.getSigningValues)(options);
    var accessKeyId = signingValues.accessKeyId, credentialScope = signingValues.credentialScope, longDate = signingValues.longDate, sessionToken = signingValues.sessionToken;
    // create the request to sign
    var headers = __assign({}, request.headers);
    headers[constants_1.HOST_HEADER] = request.url.host;
    headers[constants_1.AMZ_DATE_HEADER] = longDate;
    if (sessionToken) {
        headers[constants_1.TOKEN_HEADER] = sessionToken;
    }
    var requestToSign = __assign(__assign({}, request), { headers: headers });
    // calculate and add the signature to the request
    var signature = (0, getSignature_1.getSignature)(requestToSign, signingValues);
    var credentialEntry = "Credential=".concat(accessKeyId, "/").concat(credentialScope);
    var signedHeadersEntry = "SignedHeaders=".concat((0, getSignedHeaders_1.getSignedHeaders)(headers));
    var signatureEntry = "Signature=".concat(signature);
    headers[constants_1.AUTH_HEADER] = "".concat(constants_1.SHA256_ALGORITHM_IDENTIFIER, " ").concat(credentialEntry, ", ").concat(signedHeadersEntry, ", ").concat(signatureEntry);
    return requestToSign;
};
exports.signRequest = signRequest;
