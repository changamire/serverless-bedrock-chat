"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryMiddleware = void 0;
var DEFAULT_RETRY_ATTEMPTS = 3;
/**
 * Retry middleware
 */
var retryMiddleware = function (_a) {
    var _b = _a.maxAttempts, maxAttempts = _b === void 0 ? DEFAULT_RETRY_ATTEMPTS : _b, retryDecider = _a.retryDecider, computeDelay = _a.computeDelay, abortSignal = _a.abortSignal;
    if (maxAttempts < 1) {
        throw new Error('maxAttempts must be greater than 0');
    }
    return function (next, context) {
        return function retryMiddleware(request) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var error, attemptsCount, response, handleTerminalErrorOrResponse, e_1, delay;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            attemptsCount = (_a = context.attemptsCount) !== null && _a !== void 0 ? _a : 0;
                            handleTerminalErrorOrResponse = function () {
                                if (response) {
                                    addOrIncrementMetadataAttempts(response, attemptsCount);
                                    return response;
                                }
                                else {
                                    addOrIncrementMetadataAttempts(error, attemptsCount);
                                    throw error;
                                }
                            };
                            _b.label = 1;
                        case 1:
                            if (!(!(abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) && attemptsCount < maxAttempts)) return [3 /*break*/, 11];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, next(request)];
                        case 3:
                            response = _b.sent();
                            error = undefined;
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            error = e_1;
                            response = undefined;
                            return [3 /*break*/, 5];
                        case 5:
                            // context.attemptsCount may be updated after calling next handler which may retry the request by itself.
                            attemptsCount =
                                context.attemptsCount > attemptsCount
                                    ? context.attemptsCount
                                    : attemptsCount + 1;
                            context.attemptsCount = attemptsCount;
                            return [4 /*yield*/, retryDecider(response, error)];
                        case 6:
                            if (!_b.sent()) return [3 /*break*/, 9];
                            if (!(!(abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) && attemptsCount < maxAttempts)) return [3 /*break*/, 8];
                            delay = computeDelay(attemptsCount);
                            return [4 /*yield*/, cancellableSleep(delay, abortSignal)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8: return [3 /*break*/, 1];
                        case 9: return [2 /*return*/, handleTerminalErrorOrResponse()];
                        case 10: return [3 /*break*/, 1];
                        case 11:
                            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                                throw new Error('Request aborted.');
                            }
                            else {
                                return [2 /*return*/, handleTerminalErrorOrResponse()];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
};
exports.retryMiddleware = retryMiddleware;
var cancellableSleep = function (timeoutMs, abortSignal) {
    if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
        return Promise.resolve();
    }
    var timeoutId;
    var sleepPromiseResolveFn;
    var sleepPromise = new Promise(function (resolve) {
        sleepPromiseResolveFn = resolve;
        timeoutId = setTimeout(resolve, timeoutMs);
    });
    abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener('abort', function cancelSleep(event) {
        clearTimeout(timeoutId);
        abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.removeEventListener('abort', cancelSleep);
        sleepPromiseResolveFn();
    });
    return sleepPromise;
};
var addOrIncrementMetadataAttempts = function (nextHandlerOutput, attempts) {
    var _a;
    if (Object.prototype.toString.call(nextHandlerOutput) !== '[object Object]') {
        return;
    }
    nextHandlerOutput['$metadata'] = __assign(__assign({}, ((_a = nextHandlerOutput['$metadata']) !== null && _a !== void 0 ? _a : {})), { attempts: attempts });
};
