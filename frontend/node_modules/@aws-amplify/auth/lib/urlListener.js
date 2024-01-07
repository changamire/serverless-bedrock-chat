"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var core_1 = require("@aws-amplify/core");
exports.default = (function (callback) {
    if (core_1.browserOrNode().isBrowser && window.location) {
        var url = window.location.href;
        callback({ url: url });
    }
    else if (core_1.browserOrNode().isNode) {
        // continue building on ssr
        (function () { }); // noop
    }
    else {
        throw new Error('Not supported');
    }
});
//# sourceMappingURL=urlListener.js.map