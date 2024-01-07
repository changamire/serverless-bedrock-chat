// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __awaiter, __generator } from "tslib";
import { decode } from 'base-64';
import { ungzip } from 'pako';
export var convert = function (stream) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!(stream instanceof Blob)) {
            return [2 /*return*/, Promise.reject('Invalid content type')];
        }
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var fileReaderInstance_1;
                return __generator(this, function (_a) {
                    try {
                        fileReaderInstance_1 = new FileReader();
                        fileReaderInstance_1.readAsDataURL(stream);
                        fileReaderInstance_1.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var blobURL, base64Blob, decodedArrayBuffer;
                            return __generator(this, function (_a) {
                                blobURL = fileReaderInstance_1.result;
                                base64Blob = blobURL.split(/,(.*)/s)[1];
                                decodedArrayBuffer = base64ToArrayBuffer(base64Blob);
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
export var base64ToArrayBuffer = function (base64) {
    var binaryString = decode(base64);
    return Uint8Array.from(binaryString, function (c) { return c.charCodeAt(0); });
};
export var gzipDecompressToString = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                try {
                    var result = ungzip(data, { to: 'string' });
                    resolve(result);
                }
                catch (error) {
                    reject('unable to decompress' + error);
                }
            })];
    });
}); };
//# sourceMappingURL=utils.native.js.map