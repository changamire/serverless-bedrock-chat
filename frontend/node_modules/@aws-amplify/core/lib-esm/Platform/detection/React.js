// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { documentExists, processExists } from './helpers';
// Tested with react 18.2 - built using Vite
export function reactWebDetect() {
    var elementKeyPrefixedWithReact = function (key) {
        return key.startsWith('_react') || key.startsWith('__react');
    };
    var elementIsReactEnabled = function (element) {
        return Object.keys(element).find(elementKeyPrefixedWithReact);
    };
    var allElementsWithId = function () { return Array.from(document.querySelectorAll('[id]')); };
    return documentExists() && allElementsWithId().some(elementIsReactEnabled);
}
export function reactSSRDetect() {
    return (processExists() &&
        typeof process.env !== 'undefined' &&
        !!Object.keys(process.env).find(function (key) { return key.includes('react'); }));
}
