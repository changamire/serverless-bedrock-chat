// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { documentExists, processExists, windowExists } from './helpers';
// Tested with @angular/core 16.0.0
export function angularWebDetect() {
    var angularVersionSetInDocument = Boolean(documentExists() && document.querySelector('[ng-version]'));
    var angularContentSetInWindow = Boolean(
    // @ts-ignore
    windowExists() && typeof window['ng'] !== 'undefined');
    return angularVersionSetInDocument || angularContentSetInWindow;
}
export function angularSSRDetect() {
    var _a;
    return ((processExists() &&
        typeof process.env === 'object' &&
        ((_a = process.env['npm_lifecycle_script']) === null || _a === void 0 ? void 0 : _a.startsWith('ng '))) ||
        false);
}
