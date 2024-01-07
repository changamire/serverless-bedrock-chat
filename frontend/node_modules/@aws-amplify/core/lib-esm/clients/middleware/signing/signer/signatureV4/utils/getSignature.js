// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getHashedDataAsHex } from './dataHashHelpers';
import { getCanonicalRequest } from './getCanonicalRequest';
import { getSigningKey } from './getSigningKey';
import { getStringToSign } from './getStringToSign';
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
export var getSignature = function (request, _a) {
    var credentialScope = _a.credentialScope, longDate = _a.longDate, secretAccessKey = _a.secretAccessKey, shortDate = _a.shortDate, signingRegion = _a.signingRegion, signingService = _a.signingService, uriEscapePath = _a.uriEscapePath;
    // step 1: create a canonical request
    var canonicalRequest = getCanonicalRequest(request, uriEscapePath);
    // step 2: create a hash of the canonical request
    var hashedRequest = getHashedDataAsHex(null, canonicalRequest);
    // step 3: create a string to sign
    var stringToSign = getStringToSign(longDate, credentialScope, hashedRequest);
    // step 4: calculate the signature
    var signature = getHashedDataAsHex(getSigningKey(secretAccessKey, shortDate, signingRegion, signingService), stringToSign);
    return signature;
};
