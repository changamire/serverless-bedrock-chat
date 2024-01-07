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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { ALGORITHM_QUERY_PARAM, AMZ_DATE_QUERY_PARAM, CREDENTIAL_QUERY_PARAM, EXPIRES_QUERY_PARAM, HOST_HEADER, SHA256_ALGORITHM_IDENTIFIER, SIGNATURE_QUERY_PARAM, SIGNED_HEADERS_QUERY_PARAM, TOKEN_QUERY_PARAM, } from './constants';
import { getSigningValues } from './utils/getSigningValues';
import { getSignature } from './utils/getSignature';
/**
 * Given a `Presignable` object, returns a Signature Version 4 presigned `URL` object.
 *
 * @param presignable `Presignable` object containing at least a url to be presigned with authentication query params.
 * @param presignUrlOptions `PresignUrlOptions` object containing values used to construct the signature.
 * @returns A `URL` with authentication query params which can grant temporary access to AWS resources.
 */
export var presignUrl = function (_a, _b) {
    var _c, _d, _e, _f;
    var body = _a.body, _g = _a.method, method = _g === void 0 ? 'GET' : _g, url = _a.url;
    var expiration = _b.expiration, options = __rest(_b, ["expiration"]);
    var signingValues = getSigningValues(options);
    var accessKeyId = signingValues.accessKeyId, credentialScope = signingValues.credentialScope, longDate = signingValues.longDate, sessionToken = signingValues.sessionToken;
    // create the request to sign
    // @ts-ignore URL constructor accepts a URL object
    var presignedUrl = new URL(url);
    Object.entries(__assign(__assign((_c = {}, _c[ALGORITHM_QUERY_PARAM] = SHA256_ALGORITHM_IDENTIFIER, _c[CREDENTIAL_QUERY_PARAM] = "".concat(accessKeyId, "/").concat(credentialScope), _c[AMZ_DATE_QUERY_PARAM] = longDate, _c[SIGNED_HEADERS_QUERY_PARAM] = HOST_HEADER, _c), (expiration && (_d = {}, _d[EXPIRES_QUERY_PARAM] = expiration.toString(), _d))), (sessionToken && (_e = {}, _e[TOKEN_QUERY_PARAM] = sessionToken, _e)))).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        presignedUrl.searchParams.append(key, value);
    });
    var requestToSign = {
        body: body,
        headers: (_f = {}, _f[HOST_HEADER] = url.host, _f),
        method: method,
        url: presignedUrl,
    };
    // calculate and add the signature to the url
    var signature = getSignature(requestToSign, signingValues);
    presignedUrl.searchParams.append(SIGNATURE_QUERY_PARAM, signature);
    return presignedUrl;
};
