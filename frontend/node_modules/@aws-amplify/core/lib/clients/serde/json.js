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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonBody = exports.parseJsonError = void 0;
var responseInfo_1 = require("./responseInfo");
/**
 * Utility functions for serializing and deserializing of JSON protocol in general(including: REST-JSON, JSON-RPC, etc.)
 */
/**
 * Error parser for AWS JSON protocol.
 */
var parseJsonError = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, sanitizeErrorCode, code, message, error;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!response || response.statusCode < 300) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, exports.parseJsonBody)(response)];
            case 1:
                body = _f.sent();
                sanitizeErrorCode = function (rawValue) {
                    var _a = __read(rawValue.toString().split(/[\,\:]+/), 1), cleanValue = _a[0];
                    if (cleanValue.includes('#')) {
                        return cleanValue.split('#')[1];
                    }
                    return cleanValue;
                };
                code = sanitizeErrorCode((_c = (_b = (_a = response.headers['x-amzn-errortype']) !== null && _a !== void 0 ? _a : body.code) !== null && _b !== void 0 ? _b : body.__type) !== null && _c !== void 0 ? _c : 'UnknownError');
                message = (_e = (_d = body.message) !== null && _d !== void 0 ? _d : body.Message) !== null && _e !== void 0 ? _e : 'Unknown error';
                error = new Error(message);
                return [2 /*return*/, Object.assign(error, {
                        name: code,
                        $metadata: (0, responseInfo_1.parseMetadata)(response),
                    })];
        }
    });
}); };
exports.parseJsonError = parseJsonError;
/**
 * Parse JSON response body to JavaScript object.
 */
var parseJsonBody = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!response.body) {
                    throw new Error('Missing response payload');
                }
                return [4 /*yield*/, response.body.json()];
            case 1:
                output = _a.sent();
                return [2 /*return*/, Object.assign(output, {
                        $metadata: (0, responseInfo_1.parseMetadata)(response),
                    })];
        }
    });
}); };
exports.parseJsonBody = parseJsonBody;
