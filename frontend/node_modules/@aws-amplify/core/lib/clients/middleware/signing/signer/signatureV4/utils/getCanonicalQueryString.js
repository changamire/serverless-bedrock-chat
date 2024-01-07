"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCanonicalQueryString = void 0;
/**
 * Returns a canonical query string.
 *
 * @param searchParams `searchParams` from the request url.
 * @returns URL-encoded query string parameters, separated by ampersands (&). Percent-encode reserved characters,
 * including the space character. Encode names and values separately. If there are empty parameters, append the equals
 * sign to the parameter name before encoding. After encoding, sort the parameters alphabetically by key name. If there
 * is no query string, use an empty string ("").
 *
 * @internal
 */
var getCanonicalQueryString = function (searchParams) {
    return Array.from(searchParams)
        .sort(function (_a, _b) {
        var _c = __read(_a, 2), keyA = _c[0], valA = _c[1];
        var _d = __read(_b, 2), keyB = _d[0], valB = _d[1];
        if (keyA === keyB) {
            return valA < valB ? -1 : 1;
        }
        return keyA < keyB ? -1 : 1;
    })
        .map(function (_a) {
        var _b = __read(_a, 2), key = _b[0], val = _b[1];
        return "".concat(escapeUri(key), "=").concat(escapeUri(val));
    })
        .join('&');
};
exports.getCanonicalQueryString = getCanonicalQueryString;
var escapeUri = function (uri) {
    return encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
};
var hexEncode = function (c) {
    return "%".concat(c.charCodeAt(0).toString(16).toUpperCase());
};
