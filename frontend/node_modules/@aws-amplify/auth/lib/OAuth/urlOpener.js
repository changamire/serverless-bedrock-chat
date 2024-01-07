"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var SELF = '_self';
exports.launchUri = function (url) {
    var windowProxy = window.open(url, SELF);
    if (windowProxy) {
        return Promise.resolve(windowProxy);
    }
    else {
        return Promise.reject();
    }
};
//# sourceMappingURL=urlOpener.js.map