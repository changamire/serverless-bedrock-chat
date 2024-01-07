"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signingMiddleware = void 0;
var signatureV4_1 = require("./signer/signatureV4");
var getSkewCorrectedDate_1 = require("./utils/getSkewCorrectedDate");
var getUpdatedSystemClockOffset_1 = require("./utils/getUpdatedSystemClockOffset");
/**
 * Middleware that SigV4 signs request with AWS credentials, and correct system clock offset.
 * This middleware is expected to be placed after retry middleware.
 */
var signingMiddleware = function (_a) {
    var credentials = _a.credentials, region = _a.region, service = _a.service, _b = _a.uriEscapePath, uriEscapePath = _b === void 0 ? true : _b;
    var currentSystemClockOffset;
    return function (next) {
        return function signingMiddleware(request) {
            return __awaiter(this, void 0, void 0, function () {
                var signRequestOptions, _a, signedRequest, response, dateString;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            currentSystemClockOffset = currentSystemClockOffset !== null && currentSystemClockOffset !== void 0 ? currentSystemClockOffset : 0;
                            _b = {};
                            if (!(typeof credentials === 'function')) return [3 /*break*/, 2];
                            return [4 /*yield*/, credentials()];
                        case 1:
                            _a = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = credentials;
                            _c.label = 3;
                        case 3:
                            signRequestOptions = (_b.credentials = _a,
                                _b.signingDate = (0, getSkewCorrectedDate_1.getSkewCorrectedDate)(currentSystemClockOffset),
                                _b.signingRegion = region,
                                _b.signingService = service,
                                _b.uriEscapePath = uriEscapePath,
                                _b);
                            return [4 /*yield*/, (0, signatureV4_1.signRequest)(request, signRequestOptions)];
                        case 4:
                            signedRequest = _c.sent();
                            return [4 /*yield*/, next(signedRequest)];
                        case 5:
                            response = _c.sent();
                            dateString = getDateHeader(response);
                            if (dateString) {
                                currentSystemClockOffset = (0, getUpdatedSystemClockOffset_1.getUpdatedSystemClockOffset)(Date.parse(dateString), currentSystemClockOffset);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        };
    };
};
exports.signingMiddleware = signingMiddleware;
var getDateHeader = function (_a) {
    var _b, _c;
    var _d = _a === void 0 ? {} : _a, headers = _d.headers;
    return (_c = (_b = headers === null || headers === void 0 ? void 0 : headers.date) !== null && _b !== void 0 ? _b : headers === null || headers === void 0 ? void 0 : headers.Date) !== null && _c !== void 0 ? _c : headers === null || headers === void 0 ? void 0 : headers['x-amz-date'];
};
