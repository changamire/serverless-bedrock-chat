// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getCanonicalHeaders } from './getCanonicalHeaders';
import { getCanonicalQueryString } from './getCanonicalQueryString';
import { getCanonicalUri } from './getCanonicalUri';
import { getHashedPayload } from './getHashedPayload';
import { getSignedHeaders } from './getSignedHeaders';
/**
 * Returns a canonical request.
 *
 * @param request `HttpRequest` from which to create the canonical request from.
 * @param uriEscapePath Whether to uri encode the path as part of canonical uri. It's used for S3 only where the
 *   pathname is already uri encoded, and the signing process is not expected to uri encode it again. Defaults to true.
 * @returns String created by by concatenating the following strings, separated by newline characters:
 * - HTTPMethod
 * - CanonicalUri
 * - CanonicalQueryString
 * - CanonicalHeaders
 * - SignedHeaders
 * - HashedPayload
 *
 * @internal
 */
export var getCanonicalRequest = function (_a, uriEscapePath) {
    var body = _a.body, headers = _a.headers, method = _a.method, url = _a.url;
    if (uriEscapePath === void 0) { uriEscapePath = true; }
    return [
        method,
        getCanonicalUri(url.pathname, uriEscapePath),
        getCanonicalQueryString(url.searchParams),
        getCanonicalHeaders(headers),
        getSignedHeaders(headers),
        getHashedPayload(body),
    ].join('\n');
};
