// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { browserOrNode } from '@aws-amplify/core';
export default (function (callback) {
    if (browserOrNode().isBrowser && window.location) {
        var url = window.location.href;
        callback({ url: url });
    }
    else if (browserOrNode().isNode) {
        // continue building on ssr
        (function () { }); // noop
    }
    else {
        throw new Error('Not supported');
    }
});
//# sourceMappingURL=urlListener.js.map