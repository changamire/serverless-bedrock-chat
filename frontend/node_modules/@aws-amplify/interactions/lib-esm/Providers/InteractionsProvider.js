// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __assign } from "tslib";
import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('AbstractInteractionsProvider');
var AbstractInteractionsProvider = /** @class */ (function () {
    function AbstractInteractionsProvider(options) {
        if (options === void 0) { options = {}; }
        this._config = options;
    }
    AbstractInteractionsProvider.prototype.configure = function (config) {
        if (config === void 0) { config = {}; }
        this._config = __assign(__assign({}, this._config), config);
        logger.debug("configure " + this.getProviderName(), this._config);
        return this.options;
    };
    AbstractInteractionsProvider.prototype.getCategory = function () {
        return 'Interactions';
    };
    Object.defineProperty(AbstractInteractionsProvider.prototype, "options", {
        get: function () {
            return __assign({}, this._config);
        },
        enumerable: true,
        configurable: true
    });
    return AbstractInteractionsProvider;
}());
export { AbstractInteractionsProvider };
//# sourceMappingURL=InteractionsProvider.js.map