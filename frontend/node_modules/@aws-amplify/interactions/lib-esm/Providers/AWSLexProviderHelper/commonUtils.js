import { __awaiter, __generator } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { base64ToArrayBuffer, gzipDecompressToString } from './utils';
export var unGzipBase64AsJson = function (gzipBase64) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedArrayBuffer, objString, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof gzipBase64 === 'undefined')
                    return [2 /*return*/, undefined];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                decodedArrayBuffer = base64ToArrayBuffer(gzipBase64);
                return [4 /*yield*/, gzipDecompressToString(decodedArrayBuffer)];
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