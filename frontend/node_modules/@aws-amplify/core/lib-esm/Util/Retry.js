var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ConsoleLogger as Logger } from '../Logger/ConsoleLogger';
var logger = new Logger('Util');
var NonRetryableError = /** @class */ (function (_super) {
    __extends(NonRetryableError, _super);
    function NonRetryableError(message) {
        var _this = _super.call(this, message) || this;
        _this.nonRetryable = true;
        return _this;
    }
    return NonRetryableError;
}(Error));
export { NonRetryableError };
export var isNonRetryableError = function (obj) {
    var key = 'nonRetryable';
    return obj && obj[key];
};
/**
 * @private
 * Internal use of Amplify only
 */
export function retry(functionToRetry, args, delayFn, onTerminate) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            if (typeof functionToRetry !== 'function') {
                throw Error('functionToRetry must be a function');
            }
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var attempt, terminated, timeout, wakeUp, lastError, _loop_1, state_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                attempt = 0;
                                terminated = false;
                                wakeUp = function () { };
                                onTerminate &&
                                    onTerminate.then(function () {
                                        // signal not to try anymore.
                                        terminated = true;
                                        // stop sleeping if we're sleeping.
                                        clearTimeout(timeout);
                                        wakeUp();
                                    });
                                _loop_1 = function () {
                                    var _b, _c, err_1, retryIn_1;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                attempt++;
                                                logger.debug("".concat(functionToRetry.name, " attempt #").concat(attempt, " with this vars: ").concat(JSON.stringify(args)));
                                                _d.label = 1;
                                            case 1:
                                                _d.trys.push([1, 3, , 7]);
                                                _b = {};
                                                _c = resolve;
                                                return [4 /*yield*/, functionToRetry.apply(void 0, __spreadArray([], __read(args), false))];
                                            case 2: return [2 /*return*/, (_b.value = _c.apply(void 0, [_d.sent()]), _b)];
                                            case 3:
                                                err_1 = _d.sent();
                                                lastError = err_1;
                                                logger.debug("error on ".concat(functionToRetry.name), err_1);
                                                if (isNonRetryableError(err_1)) {
                                                    logger.debug("".concat(functionToRetry.name, " non retryable error"), err_1);
                                                    return [2 /*return*/, { value: reject(err_1) }];
                                                }
                                                retryIn_1 = delayFn(attempt, args, err_1);
                                                logger.debug("".concat(functionToRetry.name, " retrying in ").concat(retryIn_1, " ms"));
                                                if (!(retryIn_1 === false || terminated)) return [3 /*break*/, 4];
                                                return [2 /*return*/, { value: reject(err_1) }];
                                            case 4: return [4 /*yield*/, new Promise(function (r) {
                                                    wakeUp = r; // export wakeUp for onTerminate handling
                                                    timeout = setTimeout(wakeUp, retryIn_1);
                                                })];
                                            case 5:
                                                _d.sent();
                                                _d.label = 6;
                                            case 6: return [3 /*break*/, 7];
                                            case 7: return [2 /*return*/];
                                        }
                                    });
                                };
                                _a.label = 1;
                            case 1:
                                if (!!terminated) return [3 /*break*/, 3];
                                return [5 /*yield**/, _loop_1()];
                            case 2:
                                state_1 = _a.sent();
                                if (typeof state_1 === "object")
                                    return [2 /*return*/, state_1.value];
                                return [3 /*break*/, 1];
                            case 3:
                                // reached if terminated while waiting for a timer.
                                reject(lastError);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
var MAX_DELAY_MS = 5 * 60 * 1000;
/**
 * @private
 * Internal use of Amplify only
 */
export function jitteredBackoff(maxDelayMs) {
    if (maxDelayMs === void 0) { maxDelayMs = MAX_DELAY_MS; }
    var BASE_TIME_MS = 100;
    var JITTER_FACTOR = 100;
    return function (attempt) {
        var delay = Math.pow(2, attempt) * BASE_TIME_MS + JITTER_FACTOR * Math.random();
        return delay > maxDelayMs ? false : delay;
    };
}
/**
 * @private
 * Internal use of Amplify only
 */
export var jitteredExponentialRetry = function (functionToRetry, args, maxDelayMs, onTerminate) {
    if (maxDelayMs === void 0) { maxDelayMs = MAX_DELAY_MS; }
    return retry(functionToRetry, args, jitteredBackoff(maxDelayMs), onTerminate);
};
