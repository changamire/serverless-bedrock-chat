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
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18n = void 0;
var Logger_1 = require("../Logger");
var logger = new Logger_1.ConsoleLogger('I18n');
/**
 * Language transition class
 */
var I18n = /** @class */ (function () {
    /**
     * @constructor
     * Initialize with configurations
     * @param {Object} options
     */
    function I18n(options) {
        /**
         * @private
         */
        this._options = null;
        /**
         * @private
         */
        this._lang = null;
        /**
         * @private
         */
        this._dict = {};
        this._options = Object.assign({}, options);
        this._lang = this._options.language;
        if (!this._lang &&
            typeof window !== 'undefined' &&
            window &&
            window.navigator) {
            this._lang = window.navigator.language;
        }
        logger.debug(this._lang);
    }
    /**
     * @method
     * Explicitly setting language
     * @param {String} lang
     */
    I18n.prototype.setLanguage = function (lang) {
        this._lang = lang;
    };
    /**
     * @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */
    I18n.prototype.get = function (key, defVal) {
        if (defVal === void 0) { defVal = undefined; }
        if (!this._lang) {
            return typeof defVal !== 'undefined' ? defVal : key;
        }
        var lang = this._lang;
        var val = this.getByLanguage(key, lang);
        if (val) {
            return val;
        }
        if (lang.indexOf('-') > 0) {
            val = this.getByLanguage(key, lang.split('-')[0]);
        }
        if (val) {
            return val;
        }
        return typeof defVal !== 'undefined' ? defVal : key;
    };
    /**
     * @method
     * Get value according to specified language
     * @param {String} key
     * @param {String} language - Specified langurage to be used
     * @param {String} defVal - Default value
     */
    I18n.prototype.getByLanguage = function (key, language, defVal) {
        if (defVal === void 0) { defVal = null; }
        if (!language) {
            return defVal;
        }
        var lang_dict = this._dict[language];
        if (!lang_dict) {
            return defVal;
        }
        return lang_dict[key];
    };
    /**
     * @method
     * Add vocabularies for one language
     * @param {String} language - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */
    I18n.prototype.putVocabulariesForLanguage = function (language, vocabularies) {
        var lang_dict = this._dict[language];
        if (!lang_dict) {
            lang_dict = this._dict[language] = {};
        }
        this._dict[language] = __assign(__assign({}, lang_dict), vocabularies);
    };
    /**
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */
    I18n.prototype.putVocabularies = function (vocabularies) {
        var _this = this;
        Object.keys(vocabularies).map(function (key) {
            _this.putVocabulariesForLanguage(key, vocabularies[key]);
        });
    };
    return I18n;
}());
exports.I18n = I18n;
