"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSafeDecode = exports.urlSafeEncode = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function urlSafeEncode(str) {
    return str
        .split('')
        .map(function (char) {
        return char
            .charCodeAt(0)
            .toString(16)
            .padStart(2, '0');
    })
        .join('');
}
exports.urlSafeEncode = urlSafeEncode;
function urlSafeDecode(hex) {
    return hex
        .match(/.{2}/g)
        .map(function (char) { return String.fromCharCode(parseInt(char, 16)); })
        .join('');
}
exports.urlSafeDecode = urlSafeDecode;
