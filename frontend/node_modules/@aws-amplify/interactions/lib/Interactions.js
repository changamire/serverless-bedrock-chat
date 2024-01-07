"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@aws-amplify/core");
var Providers_1 = require("./Providers");
var logger = new core_1.ConsoleLogger('Interactions');
var InteractionsClass = /** @class */ (function () {
    /**
     * Initialize PubSub with AWS configurations
     *
     * @param {InteractionsOptions} options - Configuration object for Interactions
     */
    function InteractionsClass(options) {
        if (options === void 0) { options = {}; }
        this._options = options;
        logger.debug('Interactions Options', this._options);
        this._pluggables = {};
    }
    InteractionsClass.prototype.getModuleName = function () {
        return 'Interactions';
    };
    /**
     *
     * @param {InteractionsOptions} options - Configuration object for Interactions
     * @return {InteractionsOptions} - The current configuration
     */
    InteractionsClass.prototype.configure = function (options) {
        var _this = this;
        var opt = options ? options.Interactions || options : {};
        logger.debug('configure Interactions', { opt: opt });
        this._options = tslib_1.__assign(tslib_1.__assign({ bots: {} }, opt), opt.Interactions);
        var aws_bots_config = this._options.aws_bots_config;
        var bots_config = this._options.bots;
        if (!Object.keys(bots_config).length && aws_bots_config) {
            // Convert aws_bots_config to bots object
            if (Array.isArray(aws_bots_config)) {
                aws_bots_config.forEach(function (bot) {
                    _this._options.bots[bot.name] = bot;
                });
            }
        }
        // configure bots to their specific providers
        Object.keys(bots_config).forEach(function (botKey) {
            var _a;
            var bot = bots_config[botKey];
            var providerName = bot.providerName || 'AWSLexProvider';
            // add default provider if required
            if (!_this._pluggables.AWSLexProvider &&
                providerName === 'AWSLexProvider') {
                _this._pluggables.AWSLexProvider = new Providers_1.AWSLexProvider();
            }
            // configure bot with it's respective provider
            if (_this._pluggables[providerName]) {
                _this._pluggables[providerName].configure((_a = {}, _a[bot.name] = bot, _a));
            }
            else {
                logger.debug("bot " + bot.name + " was not configured as " + providerName + " provider was not found");
            }
        });
        return this._options;
    };
    InteractionsClass.prototype.addPluggable = function (pluggable) {
        var _this = this;
        if (pluggable && pluggable.getCategory() === 'Interactions') {
            if (!this._pluggables[pluggable.getProviderName()]) {
                // configure bots for the new plugin
                Object.keys(this._options.bots)
                    .filter(function (botKey) {
                    return _this._options.bots[botKey].providerName ===
                        pluggable.getProviderName();
                })
                    .forEach(function (botKey) {
                    var _a;
                    var bot = _this._options.bots[botKey];
                    pluggable.configure((_a = {}, _a[bot.name] = bot, _a));
                });
                this._pluggables[pluggable.getProviderName()] = pluggable;
                return;
            }
            else {
                throw new Error('Pluggable ' + pluggable.getProviderName() + ' already plugged');
            }
        }
    };
    InteractionsClass.prototype.send = function (botname, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var botProvider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._options.bots || !this._options.bots[botname]) {
                            return [2 /*return*/, Promise.reject('Bot ' + botname + ' does not exist')];
                        }
                        botProvider = this._options.bots[botname].providerName || 'AWSLexProvider';
                        if (!this._pluggables[botProvider]) {
                            return [2 /*return*/, Promise.reject('Bot ' +
                                    botProvider +
                                    ' does not have valid pluggin did you try addPluggable first?')];
                        }
                        return [4 /*yield*/, this._pluggables[botProvider].sendMessage(botname, message)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InteractionsClass.prototype.onComplete = function (botname, callback) {
        if (!this._options.bots || !this._options.bots[botname]) {
            throw new Error('Bot ' + botname + ' does not exist');
        }
        var botProvider = this._options.bots[botname].providerName || 'AWSLexProvider';
        if (!this._pluggables[botProvider]) {
            throw new Error('Bot ' +
                botProvider +
                ' does not have valid pluggin did you try addPluggable first?');
        }
        this._pluggables[botProvider].onComplete(botname, callback);
    };
    return InteractionsClass;
}());
exports.InteractionsClass = InteractionsClass;
exports.Interactions = new InteractionsClass();
core_1.Amplify.register(exports.Interactions);
//# sourceMappingURL=Interactions.js.map