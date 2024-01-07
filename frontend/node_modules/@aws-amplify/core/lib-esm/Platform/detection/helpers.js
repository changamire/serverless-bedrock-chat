// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export var globalExists = function () {
    return typeof global !== 'undefined';
};
export var globalThisExists = function () {
    return typeof globalThis !== 'undefined';
};
export var windowExists = function () {
    return typeof window !== 'undefined';
};
export var documentExists = function () {
    return typeof document !== 'undefined';
};
export var processExists = function () {
    return typeof process !== 'undefined';
};
export var keyPrefixMatch = function (object, prefix) {
    return !!Object.keys(object).find(function (key) { return key.startsWith(prefix); });
};
