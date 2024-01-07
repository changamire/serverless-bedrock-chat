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
import { getSignedHeaders } from './utils/getSignedHeaders';
import { getSigningValues } from './utils/getSigningValues';
import { AMZ_DATE_HEADER, AUTH_HEADER, HOST_HEADER, SHA256_ALGORITHM_IDENTIFIER, TOKEN_HEADER, } from './constants';
import { getSignature } from './utils/getSignature';
/**
 * Given a `HttpRequest`, returns a Signature Version 4 signed `HttpRequest`.
 *
 * @param request `HttpRequest` to be signed.
 * @param signRequestOptions `SignRequestOptions` object containing values used to construct the signature.
 * @returns A `HttpRequest` with authentication headers which can grant temporary access to AWS resources.
 */
export var signRequest = function (request, options) {
    var signingValues = getSigningValues(options);
    var accessKeyId = signingValues.accessKeyId, credentialScope = signingValues.credentialScope, longDate = signingValues.longDate, sessionToken = signingValues.sessionToken;
    // create the request to sign
    var headers = __assign({}, request.headers);
    headers[HOST_HEADER] = request.url.host;
    headers[AMZ_DATE_HEADER] = longDate;
    if (sessionToken) {
        headers[TOKEN_HEADER] = sessionToken;
    }
    var requestToSign = __assign(__assign({}, request), { headers: headers });
    // calculate and add the signature to the request
    var signature = getSignature(requestToSign, signingValues);
    var credentialEntry = "Credential=".concat(accessKeyId, "/").concat(credentialScope);
    var signedHeadersEntry = "SignedHeaders=".concat(getSignedHeaders(headers));
    var signatureEntry = "Signature=".concat(signature);
    headers[AUTH_HEADER] = "".concat(SHA256_ALGORITHM_IDENTIFIER, " ").concat(credentialEntry, ", ").concat(signedHeadersEntry, ", ").concat(signatureEntry);
    return requestToSign;
};
