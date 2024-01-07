import { __assign, __awaiter, __extends, __generator } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { AbstractInteractionsProvider } from './InteractionsProvider';
import { LexRuntimeServiceClient, PostTextCommand, PostContentCommand, } from '@aws-sdk/client-lex-runtime-service';
import { ConsoleLogger as Logger, Credentials, getAmplifyUserAgentObject, } from '@aws-amplify/core';
import { convert } from './AWSLexProviderHelper/utils';
var logger = new Logger('AWSLexProvider');
var AWSLexProvider = /** @class */ (function (_super) {
    __extends(AWSLexProvider, _super);
    function AWSLexProvider(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this._botsCompleteCallback = {};
        return _this;
    }
    AWSLexProvider.prototype.getProviderName = function () {
        return 'AWSLexProvider';
    };
    AWSLexProvider.prototype.configure = function (config) {
        if (config === void 0) { config = {}; }
        var propertiesToTest = ['name', 'alias', 'region'];
        Object.keys(config).forEach(function (botKey) {
            var botConfig = config[botKey];
            // is bot config correct
            if (!propertiesToTest.every(function (x) { return x in botConfig; })) {
                throw new Error('invalid bot configuration');
            }
        });
        return _super.prototype.configure.call(this, config);
    };
    /**
     * @private
     * @deprecated
     * This is used internally by 'sendMessage' to call onComplete callback
     * for a bot if configured
     */
    AWSLexProvider.prototype.reportBotStatus = function (data, botname) {
        var _this = this;
        // Check if state is fulfilled to resolve onFullfilment promise
        logger.debug('postContent state', data.dialogState);
        if (data.dialogState === 'ReadyForFulfillment' ||
            data.dialogState === 'Fulfilled') {
            if (typeof this._botsCompleteCallback[botname] === 'function') {
                setTimeout(function () { return _this._botsCompleteCallback[botname](null, data); }, 0);
            }
            if (this._config &&
                typeof this._config[botname].onComplete === 'function') {
                setTimeout(function () { return _this._config[botname].onComplete(null, data); }, 0);
            }
        }
        if (data.dialogState === 'Failed') {
            if (typeof this._botsCompleteCallback[botname] === 'function') {
                setTimeout(function () { return _this._botsCompleteCallback[botname]('Bot conversation failed'); }, 0);
            }
            if (this._config &&
                typeof this._config[botname].onComplete === 'function') {
                setTimeout(function () { return _this._config[botname].onComplete('Bot conversation failed'); }, 0);
            }
        }
    };
    AWSLexProvider.prototype.sendMessage = function (botname, message) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, error_1, params, postTextCommand, data, err_1, content, messageType, inputStream, _a, postContentCommand, data, audioArray, _b, response, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // check if bot exists
                        if (!this._config[botname]) {
                            return [2 /*return*/, Promise.reject('Bot ' + botname + ' does not exist')];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Credentials.get()];
                    case 2:
                        credentials = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        return [2 /*return*/, Promise.reject('No credentials')];
                    case 4:
                        this.lexRuntimeServiceClient = new LexRuntimeServiceClient({
                            region: this._config[botname].region,
                            credentials: credentials,
                            customUserAgent: getAmplifyUserAgentObject(),
                        });
                        if (!(typeof message === 'string')) return [3 /*break*/, 9];
                        params = {
                            botAlias: this._config[botname].alias,
                            botName: botname,
                            inputText: message,
                            userId: credentials.identityId,
                        };
                        logger.debug('postText to lex', message);
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        postTextCommand = new PostTextCommand(params);
                        return [4 /*yield*/, this.lexRuntimeServiceClient.send(postTextCommand)];
                    case 6:
                        data = _c.sent();
                        this.reportBotStatus(data, botname);
                        return [2 /*return*/, data];
                    case 7:
                        err_1 = _c.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 8: return [3 /*break*/, 21];
                    case 9:
                        content = message.content, messageType = message.options.messageType;
                        if (!(messageType === 'voice')) return [3 /*break*/, 13];
                        if (typeof content !== 'object') {
                            return [2 /*return*/, Promise.reject('invalid content type')];
                        }
                        if (!(content instanceof Uint8Array)) return [3 /*break*/, 10];
                        _a = content;
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, convert(content)];
                    case 11:
                        _a = _c.sent();
                        _c.label = 12;
                    case 12:
                        inputStream = _a;
                        params = {
                            botAlias: this._config[botname].alias,
                            botName: botname,
                            contentType: 'audio/x-l16; sample-rate=16000; channel-count=1',
                            userId: credentials.identityId,
                            accept: 'audio/mpeg',
                            inputStream: inputStream,
                        };
                        return [3 /*break*/, 14];
                    case 13:
                        if (typeof content !== 'string')
                            return [2 /*return*/, Promise.reject('invalid content type')];
                        params = {
                            botAlias: this._config[botname].alias,
                            botName: botname,
                            contentType: 'text/plain; charset=utf-8',
                            inputStream: content,
                            userId: credentials.identityId,
                            accept: 'audio/mpeg',
                        };
                        _c.label = 14;
                    case 14:
                        logger.debug('postContent to lex', message);
                        _c.label = 15;
                    case 15:
                        _c.trys.push([15, 20, , 21]);
                        postContentCommand = new PostContentCommand(params);
                        return [4 /*yield*/, this.lexRuntimeServiceClient.send(postContentCommand)];
                    case 16:
                        data = _c.sent();
                        if (!data.audioStream) return [3 /*break*/, 18];
                        return [4 /*yield*/, convert(data.audioStream)];
                    case 17:
                        _b = _c.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        _b = undefined;
                        _c.label = 19;
                    case 19:
                        audioArray = _b;
                        response = __assign(__assign({}, data), { audioStream: audioArray });
                        this.reportBotStatus(response, botname);
                        return [2 /*return*/, response];
                    case 20:
                        err_2 = _c.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    AWSLexProvider.prototype.onComplete = function (botname, callback) {
        // does bot exist
        if (!this._config[botname]) {
            throw new Error('Bot ' + botname + ' does not exist');
        }
        this._botsCompleteCallback[botname] = callback;
    };
    return AWSLexProvider;
}(AbstractInteractionsProvider));
export { AWSLexProvider };
//# sourceMappingURL=AWSLexProvider.js.map