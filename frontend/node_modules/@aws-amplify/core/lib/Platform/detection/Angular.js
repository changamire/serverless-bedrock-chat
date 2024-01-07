"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularSSRDetect = exports.angularWebDetect = void 0;
var helpers_1 = require("./helpers");
// Tested with @angular/core 16.0.0
function angularWebDetect() {
    var angularVersionSetInDocument = Boolean((0, helpers_1.documentExists)() && document.querySelector('[ng-version]'));
    var angularContentSetInWindow = Boolean(
    // @ts-ignore
    (0, helpers_1.windowExists)() && typeof window['ng'] !== 'undefined');
    return angularVersionSetInDocument || angularContentSetInWindow;
}
exports.angularWebDetect = angularWebDetect;
function angularSSRDetect() {
    var _a;
    return (((0, helpers_1.processExists)() &&
        typeof process.env === 'object' &&
        ((_a = process.env['npm_lifecycle_script']) === null || _a === void 0 ? void 0 : _a.startsWith('ng '))) ||
        false);
}
exports.angularSSRDetect = angularSSRDetect;
