// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export var setState = function (state) {
    window.sessionStorage.setItem('oauth_state', state);
};
export var getState = function () {
    var oauth_state = window.sessionStorage.getItem('oauth_state');
    window.sessionStorage.removeItem('oauth_state');
    return oauth_state;
};
export var setPKCE = function (private_key) {
    window.sessionStorage.setItem('ouath_pkce_key', private_key);
};
export var getPKCE = function () {
    var ouath_pkce_key = window.sessionStorage.getItem('ouath_pkce_key');
    window.sessionStorage.removeItem('ouath_pkce_key');
    return ouath_pkce_key;
};
export var clearAll = function () {
    window.sessionStorage.removeItem('ouath_pkce_key');
    window.sessionStorage.removeItem('oauth_state');
};
//# sourceMappingURL=oauthStorage.js.map