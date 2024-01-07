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
/**
 * Returns canonical headers.
 *
 * @param headers Headers from the request.
 * @returns Request headers that will be signed, and their values, separated by newline characters. Header names must
 * use lowercase characters, must appear in alphabetical order, and must be followed by a colon (:). For the values,
 * trim any leading or trailing spaces, convert sequential spaces to a single space, and separate the values
 * for a multi-value header using commas.
 *
 * @internal
 */
export var getCanonicalHeaders = function (headers) {
    return Object.entries(headers)
        .map(function (_a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        return ({
            key: key.toLowerCase(),
            value: (_b = value === null || value === void 0 ? void 0 : value.trim().replace(/\s+/g, ' ')) !== null && _b !== void 0 ? _b : '',
        });
    })
        .sort(function (a, b) { return (a.key < b.key ? -1 : 1); })
        .map(function (entry) { return "".concat(entry.key, ":").concat(entry.value, "\n"); })
        .join('');
};
