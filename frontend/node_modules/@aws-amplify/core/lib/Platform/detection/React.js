"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactSSRDetect = exports.reactWebDetect = void 0;
var helpers_1 = require("./helpers");
// Tested with react 18.2 - built using Vite
function reactWebDetect() {
    var elementKeyPrefixedWithReact = function (key) {
        return key.startsWith('_react') || key.startsWith('__react');
    };
    var elementIsReactEnabled = function (element) {
        return Object.keys(element).find(elementKeyPrefixedWithReact);
    };
    var allElementsWithId = function () { return Array.from(document.querySelectorAll('[id]')); };
    return (0, helpers_1.documentExists)() && allElementsWithId().some(elementIsReactEnabled);
}
exports.reactWebDetect = reactWebDetect;
function reactSSRDetect() {
    return ((0, helpers_1.processExists)() &&
        typeof process.env !== 'undefined' &&
        !!Object.keys(process.env).find(function (key) { return key.includes('react'); }));
}
exports.reactSSRDetect = reactSSRDetect;
