"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundProcessManagerState = exports.BackgroundManagerNotOpenError = exports.BackgroundProcessManager = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @private For internal Amplify use.
 *
 * Creates a new scope for promises, observables, and other types of work or
 * processes that may be running in the background. This manager provides
 * an singular entrypoint to request termination and await completion.
 *
 * As work completes on its own prior to close, the manager removes them
 * from the registry to avoid holding references to completed jobs.
 */
var BackgroundProcessManager = /** @class */ (function () {
    /**
     * Creates a new manager for promises, observables, and other types
     * of work that may be running in the background. This manager provides
     * a centralized mechanism to request termination and await completion.
     */
    function BackgroundProcessManager() {
        /**
         * A string indicating whether the manager is accepting new work ("Open"),
         * waiting for work to complete ("Closing"), or fully done with all
         * submitted work and *not* accepting new jobs ("Closed").
         */
        this._state = BackgroundProcessManagerState.Open;
        /**
         * The list of outstanding jobs we'll need to wait for upon `close()`
         */
        this.jobs = new Set();
    }
    BackgroundProcessManager.prototype.add = function (jobOrDescription, optionalDescription) {
        var job;
        var description;
        if (typeof jobOrDescription === 'string') {
            job = undefined;
            description = jobOrDescription;
        }
        else {
            job = jobOrDescription;
            description = optionalDescription;
        }
        var error = this.closedFailure(description);
        if (error)
            return error;
        if (job === undefined) {
            return this.addHook(description);
        }
        else if (typeof job === 'function') {
            return this.addFunction(job, description);
        }
        else if (job instanceof BackgroundProcessManager) {
            return this.addManager(job, description);
        }
        else {
            throw new Error('If `job` is provided, it must be an Observable, Function, or BackgroundProcessManager.');
        }
    };
    /**
     * Adds a **cleaner** function that doesn't immediately get executed.
     * Instead, the caller gets a **terminate** function back. The *cleaner* is
     * invoked only once the mananger *closes* or the returned **terminate**
     * function is called.
     *
     * @param clean The cleanup function.
     * @param description Optional description to help identify pending jobs.
     * @returns A terminate function.
     */
    BackgroundProcessManager.prototype.addCleaner = function (clean, description) {
        var _this = this;
        var _a = this.addHook(description), resolve = _a.resolve, onTerminate = _a.onTerminate;
        var proxy = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, clean()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); };
        onTerminate.then(proxy);
        return proxy;
    };
    BackgroundProcessManager.prototype.addFunction = function (job, description) {
        // the function we call when we want to try to terminate this job.
        var terminate;
        // the promise the job can opt into listening to for termination.
        var onTerminate = new Promise(function (resolve) {
            terminate = resolve;
        });
        // finally! start the job.
        var jobResult = job(onTerminate);
        // depending on what the job gives back, register the result
        // so we can monitor for completion.
        if (typeof (jobResult === null || jobResult === void 0 ? void 0 : jobResult.then) === 'function') {
            this.registerPromise(jobResult, terminate, description);
        }
        // At the end of the day, or you know, method call, it doesn't matter
        // what the return value is at all; we just pass it through to the
        // caller.
        return jobResult;
    };
    BackgroundProcessManager.prototype.addManager = function (manager, description) {
        var _this = this;
        this.addCleaner(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, manager.close()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }, description);
    };
    /**
     * Creates and registers a fabricated job for processes that need to operate
     * with callbacks/hooks. The returned `resolve` and `reject`
     * functions can be used to signal the job is done successfully or not.
     * The returned `onTerminate` is a promise that will resolve when the
     * manager is requesting the termination of the job.
     *
     * @param description Optional description to help identify pending jobs.
     * @returns `{ resolve, reject, onTerminate }`
     */
    BackgroundProcessManager.prototype.addHook = function (description) {
        // the resolve/reject functions we'll provide to the caller to signal
        // the state of the job.
        var resolve;
        var reject;
        // the underlying promise we'll use to manage it, pretty much like
        // any other promise.
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        // the function we call when we want to try to terminate this job.
        var terminate;
        // the promise the job can opt into listening to for termination.
        var onTerminate = new Promise(function (resolveTerminate) {
            terminate = resolveTerminate;
        });
        this.registerPromise(promise, terminate, description);
        return {
            resolve: resolve,
            reject: reject,
            onTerminate: onTerminate,
        };
    };
    /**
     * Adds a Promise based job to the list of jobs for monitoring and listens
     * for either a success or failure, upon which the job is considered "done"
     * and removed from the registry.
     *
     * @param promise A promise that is on its way to being returned to a
     * caller, which needs to be tracked as a background job.
     * @param terminate The termination function to register, which can be
     * invoked to request the job stop.
     * @param description Optional description to help identify pending jobs.
     */
    BackgroundProcessManager.prototype.registerPromise = function (promise, terminate, description) {
        var _this = this;
        var jobEntry = { promise: promise, terminate: terminate, description: description };
        this.jobs.add(jobEntry);
        // in all of my testing, it is safe to multi-subscribe to a promise.
        // so, rather than create another layer of promising, we're just going
        // to hook into the promise we already have, and when it's done
        // (successfully or not), we no longer need to wait for it upon close.
        //
        // sorry this is a bit hand-wavy:
        //
        // i believe we use `.then` and `.catch` instead of `.finally` because
        // `.finally` is invoked in a different order in the sequence, and this
        // breaks assumptions throughout and causes failures.
        promise
            .then(function () {
            _this.jobs.delete(jobEntry);
        })
            .catch(function () {
            _this.jobs.delete(jobEntry);
        });
    };
    Object.defineProperty(BackgroundProcessManager.prototype, "length", {
        /**
         * The number of jobs being waited on.
         *
         * We don't use this for anything. It's just informational for the caller,
         * and can be used in logging and testing.
         *
         * @returns the number of jobs.
         */
        get: function () {
            return this.jobs.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BackgroundProcessManager.prototype, "state", {
        /**
         * The execution state of the manager. One of:
         *
         * 1. "Open" -> Accepting new jobs
         * 1. "Closing" -> Not accepting new work. Waiting for jobs to complete.
         * 1. "Closed" -> Not accepting new work. All submitted jobs are complete.
         */
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BackgroundProcessManager.prototype, "pending", {
        /**
         * The registered `description` of all still-pending jobs.
         *
         * @returns descriptions as an array.
         */
        get: function () {
            return Array.from(this.jobs).map(function (job) { return job.description; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BackgroundProcessManager.prototype, "isOpen", {
        /**
         * Whether the manager is accepting new jobs.
         */
        get: function () {
            return this._state === BackgroundProcessManagerState.Open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BackgroundProcessManager.prototype, "isClosing", {
        /**
         * Whether the manager is rejecting new work, but still waiting for
         * submitted work to complete.
         */
        get: function () {
            return this._state === BackgroundProcessManagerState.Closing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BackgroundProcessManager.prototype, "isClosed", {
        /**
         * Whether the manager is rejecting work and done waiting for submitted
         * work to complete.
         */
        get: function () {
            return this._state === BackgroundProcessManagerState.Closed;
        },
        enumerable: false,
        configurable: true
    });
    BackgroundProcessManager.prototype.closedFailure = function (description) {
        if (!this.isOpen) {
            return Promise.reject(new BackgroundManagerNotOpenError([
                "The manager is ".concat(this.state, "."),
                "You tried to add \"".concat(description, "\"."),
                "Pending jobs: [\n".concat(this.pending
                    .map(function (t) { return '    ' + t; })
                    .join(',\n'), "\n]"),
            ].join('\n')));
        }
    };
    /**
     * Signals jobs to stop (for those that accept interruptions) and waits
     * for confirmation that jobs have stopped.
     *
     * This immediately puts the manager into a closing state and just begins
     * to reject new work. After all work in the manager is complete, the
     * manager goes into a `Completed` state and `close()` returns.
     *
     * This call is idempotent.
     *
     * If the manager is already closing or closed, `finalCleaup` is not executed.
     *
     * @param onClosed
     * @returns The settled results of each still-running job's promise. If the
     * manager is already closed, this will contain the results as of when the
     * manager's `close()` was called in an `Open` state.
     */
    BackgroundProcessManager.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, job;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.isOpen) return [3 /*break*/, 2];
                        this._state = BackgroundProcessManagerState.Closing;
                        try {
                            for (_a = __values(Array.from(this.jobs)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                job = _b.value;
                                try {
                                    job.terminate();
                                }
                                catch (error) {
                                    // Due to potential races with a job's natural completion, it's
                                    // reasonable to expect the termination call to fail. Hence,
                                    // not logging as an error.
                                    console.warn("Failed to send termination signal to job. Error: ".concat(error.message), job);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        // Use `allSettled()` because we want to wait for all to finish. We do
                        // not want to stop waiting if there is a failure.
                        this._closingPromise = Promise.allSettled(Array.from(this.jobs).map(function (j) { return j.promise; }));
                        return [4 /*yield*/, this._closingPromise];
                    case 1:
                        _d.sent();
                        this._state = BackgroundProcessManagerState.Closed;
                        _d.label = 2;
                    case 2: return [2 /*return*/, this._closingPromise];
                }
            });
        });
    };
    /**
     * Signals the manager to start accepting work (again) and returns once
     * the manager is ready to do so.
     *
     * If the state is already `Open`, this call is a no-op.
     *
     * If the state is `Closed`, this call simply updates state and returns.
     *
     * If the state is `Closing`, this call waits for completion before it
     * updates the state and returns.
     */
    BackgroundProcessManager.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isClosing) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this._state = BackgroundProcessManagerState.Open;
                        return [2 /*return*/];
                }
            });
        });
    };
    return BackgroundProcessManager;
}());
exports.BackgroundProcessManager = BackgroundProcessManager;
/**
 *
 */
var BackgroundManagerNotOpenError = /** @class */ (function (_super) {
    __extends(BackgroundManagerNotOpenError, _super);
    function BackgroundManagerNotOpenError(message) {
        return _super.call(this, "BackgroundManagerNotOpenError: ".concat(message)) || this;
    }
    return BackgroundManagerNotOpenError;
}(Error));
exports.BackgroundManagerNotOpenError = BackgroundManagerNotOpenError;
/**
 * All possible states a `BackgroundProcessManager` instance can be in.
 */
var BackgroundProcessManagerState;
(function (BackgroundProcessManagerState) {
    /**
     * Accepting new jobs.
     */
    BackgroundProcessManagerState["Open"] = "Open";
    /**
     * Not accepting new jobs. Waiting for submitted jobs to complete.
     */
    BackgroundProcessManagerState["Closing"] = "Closing";
    /**
     * Not accepting new jobs. All submitted jobs are complete.
     */
    BackgroundProcessManagerState["Closed"] = "Closed";
})(BackgroundProcessManagerState = exports.BackgroundProcessManagerState || (exports.BackgroundProcessManagerState = {}));
