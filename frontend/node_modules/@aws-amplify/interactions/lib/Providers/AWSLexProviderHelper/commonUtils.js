"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var utils_1 = require("./utils");
exports.unGzipBase64AsJson = function (gzipBase64) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var decodedArrayBuffer, objString, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof gzipBase64 === 'undefined')
                    return [2 /*return*/, undefined];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                decodedArrayBuffer = utils_1.base64ToArrayBuffer(gzipBase64);
                return [4 /*yield*/, utils_1.gzipDecompressToString(decodedArrayBuffer)];
            case 2:
                objString = _a.sent();
                return [2 /*return*/, JSON.parse(objString)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, Promise.reject('unable to decode and decompress ' + error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=commonUtils.js.map