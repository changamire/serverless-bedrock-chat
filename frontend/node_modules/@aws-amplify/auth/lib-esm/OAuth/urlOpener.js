// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var SELF = '_self';
export var launchUri = function (url) {
    var windowProxy = window.open(url, SELF);
    if (windowProxy) {
        return Promise.resolve(windowProxy);
    }
    else {
        return Promise.reject();
    }
};
//# sourceMappingURL=urlOpener.js.map