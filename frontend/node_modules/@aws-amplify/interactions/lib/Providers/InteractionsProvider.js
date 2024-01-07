"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('AbstractInteractionsProvider');
var AbstractInteractionsProvider = /** @class */ (function () {
    function AbstractInteractionsProvider(options) {
        if (options === void 0) { options = {}; }
        this._config = options;
    }
    AbstractInteractionsProvider.prototype.configure = function (config) {
        if (config === void 0) { config = {}; }
        this._config = tslib_1.__assign(tslib_1.__assign({}, this._config), config);
        logger.debug("configure " + this.getProviderName(), this._config);
        return this.options;
    };
    AbstractInteractionsProvider.prototype.getCategory = function () {
        return 'Interactions';
    };
    Object.defineProperty(AbstractInteractionsProvider.prototype, "options", {
        get: function () {
            return tslib_1.__assign({}, this._config);
        },
        enumerable: true,
        configurable: true
    });
    return AbstractInteractionsProvider;
}());
exports.AbstractInteractionsProvider = AbstractInteractionsProvider;
//# sourceMappingURL=InteractionsProvider.js.map