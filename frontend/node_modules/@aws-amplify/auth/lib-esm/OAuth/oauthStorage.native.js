// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var obj = {};
export var setState = function (state) {
    obj.oauth_state = state;
};
export var getState = function () {
    var oauth_state = obj.oauth_state;
    obj.oauth_state = undefined;
    return oauth_state;
};
export var setPKCE = function (private_key) {
    obj.ouath_pkce_key = private_key;
};
export var getPKCE = function () {
    var ouath_pkce_key = obj.ouath_pkce_key;
    obj.ouath_pkce_key = undefined;
    return ouath_pkce_key;
};
export var clearAll = function () {
    obj.ouath_pkce_key = undefined;
    obj.oauth_state = undefined;
};
//# sourceMappingURL=oauthStorage.native.js.map