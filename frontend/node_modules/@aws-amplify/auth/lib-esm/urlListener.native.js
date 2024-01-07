import { __assign, __awaiter, __generator, __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('urlListener');
var handler;
export default (function (callback) { return __awaiter(void 0, void 0, void 0, function () {
    var Linking, AppState, subscription;
    var _a;
    var _b;
    return __generator(this, function (_c) {
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
                    var url = _a.url, rest = __rest(_a, ["url"]);
                    logger.debug('urlListener', __assign({ url: url }, rest));
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
        AppState.addEventListener('change', function (newAppState) { return __awaiter(void 0, void 0, void 0, function () {
            var initialUrl;
            return __generator(this, function (_a) {
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