"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyPrefixMatch = exports.processExists = exports.documentExists = exports.windowExists = exports.globalThisExists = exports.globalExists = void 0;
var globalExists = function () {
    return typeof global !== 'undefined';
};
exports.globalExists = globalExists;
var globalThisExists = function () {
    return typeof globalThis !== 'undefined';
};
exports.globalThisExists = globalThisExists;
var windowExists = function () {
    return typeof window !== 'undefined';
};
exports.windowExists = windowExists;
var documentExists = function () {
    return typeof document !== 'undefined';
};
exports.documentExists = documentExists;
var processExists = function () {
    return typeof process !== 'undefined';
};
exports.processExists = processExists;
var keyPrefixMatch = function (object, prefix) {
    return !!Object.keys(object).find(function (key) { return key.startsWith(prefix); });
};
exports.keyPrefixMatch = keyPrefixMatch;
