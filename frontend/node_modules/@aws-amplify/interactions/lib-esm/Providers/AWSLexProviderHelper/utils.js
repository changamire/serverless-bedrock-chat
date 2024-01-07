// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __awaiter, __generator } from "tslib";
import { gunzip, strFromU8 } from 'fflate';
export var convert = function (stream) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (stream instanceof Blob || stream instanceof ReadableStream) {
            return [2 /*return*/, new Response(stream)
                    .arrayBuffer()
                    .then(function (buffer) { return new Uint8Array(buffer); })];
        }
        else {
            return [2 /*return*/, Promise.reject('Invalid content type')];
        }
        return [2 /*return*/];
    });
}); };
export var base64ToArrayBuffer = function (base64) {
    return Uint8Array.from(window.atob(base64), function (c) { return c.charCodeAt(0); });
};
export var gzipDecompressToString = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    gunzip(data, function (err, resp) {
                        if (err)
                            reject(err);
                        else
                            resolve(strFromU8(resp));
                    });
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//# sourceMappingURL=utils.js.map