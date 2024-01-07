"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('urlListener');
var handler;
exports.default = (function (callback) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var Linking, AppState, subscription;
    var _a;
    var _b;
    return tslib_1.__generator(this, function (_c) {
        if (handler) {
            return [2 /*return*/];
        }
        try {
            (_a = require('react-native'), Linking = _a.Linking, AppState = _a.AppState);
        }
        catch (error) {
            /* Keep webpack happy */
        }
        handler =
            handler ||
                (function (_a) {
                    var url = _a.url, rest = tslib_1.__rest(_a, ["url"]);
                    logger.debug('urlListener', tslib_1.__assign({ url: url }, rest));
                    callback({ url: url });
                });
        // Handles backward compatibility. removeEventListener is only available on RN versions before 0.65.
        if (Linking.removeEventListener === typeof 'function') {
            Linking.removeEventListener('url', handler);
            Linking.addEventListener('url', handler);
        }
        else {
            // remove() method is only available on RN v0.65+.
            (_b = subscription === null || subscription === void 0 ? void 0 : subscription.remove) === null || _b === void 0 ? void 0 : _b.call(subscription);
            subscription = Linking.addEventListener('url', handler);
        }
        AppState.addEventListener('change', function (newAppState) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var initialUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(newAppState === 'active')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Linking.getInitialURL()];
                    case 1:
                        initialUrl = _a.sent();
                        handler({ url: initialUrl });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=urlListener.native.js.map