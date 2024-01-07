"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_64_1 = require("base-64");
var pako_1 = require("pako");
exports.convert = function (stream) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        if (!(stream instanceof Blob)) {
            return [2 /*return*/, Promise.reject('Invalid content type')];
        }
        return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var fileReaderInstance_1;
                return tslib_1.__generator(this, function (_a) {
                    try {
                        fileReaderInstance_1 = new FileReader();
                        fileReaderInstance_1.readAsDataURL(stream);
                        fileReaderInstance_1.onload = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var blobURL, base64Blob, decodedArrayBuffer;
                            return tslib_1.__generator(this, function (_a) {
                                blobURL = fileReaderInstance_1.result;
                                base64Blob = blobURL.split(/,(.*)/s)[1];
                                decodedArrayBuffer = exports.base64ToArrayBuffer(base64Blob);
                                resolve(decodedArrayBuffer);
                                return [2 /*return*/];
                            });
                        }); };
                    }
                    catch (error) {
                        reject('unable to convert blob to arrayBuffer: ' + error);
                    }
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
exports.base64ToArrayBuffer = function (base64) {
    var binaryString = base_64_1.decode(base64);
    return Uint8Array.from(binaryString, function (c) { return c.charCodeAt(0); });
};
exports.gzipDecompressToString = function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                try {
                    var result = pako_1.ungzip(data, { to: 'string' });
                    resolve(result);
                }
                catch (error) {
                    reject('unable to decompress' + error);
                }
            })];
    });
}); };
//# sourceMappingURL=utils.native.js.map