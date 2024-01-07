// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import 'isomorphic-unfetch'; // TODO: remove this dependency in v6
import { withMemoization } from '../utils/memoization';
var shouldSendBody = function (method) {
    return !['HEAD', 'GET', 'DELETE'].includes(method.toUpperCase());
};
export var fetchTransferHandler = function (_a, _b) {
    var url = _a.url, method = _a.method, headers = _a.headers, body = _a.body;
    var abortSignal = _b.abortSignal;
    return __awaiter(void 0, void 0, void 0, function () {
        var resp, e_1, responseHeaders, httpResponse, bodyWithMixin;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(url, {
                            method: method,
                            headers: headers,
                            body: shouldSendBody(method) ? body : undefined,
                            signal: abortSignal,
                        })];
                case 1:
                    resp = _e.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _e.sent();
                    // TODO: needs to revise error handling in v6
                    // For now this is a thin wrapper over original fetch error similar to cognito-identity-js package.
                    // Ref: https://github.com/aws-amplify/amplify-js/blob/4fbc8c0a2be7526aab723579b4c95b552195a80b/packages/amazon-cognito-identity-js/src/Client.js#L103-L108
                    if (e_1 instanceof TypeError) {
                        throw new Error('Network error');
                    }
                    throw e_1;
                case 3:
                    responseHeaders = {};
                    (_c = resp.headers) === null || _c === void 0 ? void 0 : _c.forEach(function (value, key) {
                        responseHeaders[key.toLowerCase()] = value;
                    });
                    httpResponse = {
                        statusCode: resp.status,
                        headers: responseHeaders,
                        body: null,
                    };
                    bodyWithMixin = Object.assign((_d = resp.body) !== null && _d !== void 0 ? _d : {}, {
                        text: withMemoization(function () { return resp.text(); }),
                        blob: withMemoization(function () { return resp.blob(); }),
                        json: withMemoization(function () { return resp.json(); }),
                    });
                    return [2 /*return*/, __assign(__assign({}, httpResponse), { body: bodyWithMixin })];
            }
        });
    });
};
