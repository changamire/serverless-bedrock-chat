"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignature = void 0;
var dataHashHelpers_1 = require("./dataHashHelpers");
var getCanonicalRequest_1 = require("./getCanonicalRequest");
var getSigningKey_1 = require("./getSigningKey");
var getStringToSign_1 = require("./getStringToSign");
/**
 * Calculates and returns an AWS API Signature.
 * https://docs.aws.amazon.com/IAM/latest/UserGuide/create-signed-request.html
 *
 * @param request `HttpRequest` to be signed.
 * @param signRequestOptions `SignRequestOptions` object containing values used to construct the signature.
 * @returns AWS API Signature to sign a request or url with.
 *
 * @internal
 */
var getSignature = function (request, _a) {
    var credentialScope = _a.credentialScope, longDate = _a.longDate, secretAccessKey = _a.secretAccessKey, shortDate = _a.shortDate, signingRegion = _a.signingRegion, signingService = _a.signingService, uriEscapePath = _a.uriEscapePath;
    // step 1: create a canonical request
    var canonicalRequest = (0, getCanonicalRequest_1.getCanonicalRequest)(request, uriEscapePath);
    // step 2: create a hash of the canonical request
    var hashedRequest = (0, dataHashHelpers_1.getHashedDataAsHex)(null, canonicalRequest);
    // step 3: create a string to sign
    var stringToSign = (0, getStringToSign_1.getStringToSign)(longDate, credentialScope, hashedRequest);
    // step 4: calculate the signature
    var signature = (0, dataHashHelpers_1.getHashedDataAsHex)((0, getSigningKey_1.getSigningKey)(secretAccessKey, shortDate, signingRegion, signingService), stringToSign);
    return signature;
};
exports.getSignature = getSignature;
