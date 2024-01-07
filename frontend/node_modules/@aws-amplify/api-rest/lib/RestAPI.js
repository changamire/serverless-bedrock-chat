"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var RestClient_1 = require("./RestClient");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('RestAPI');
/**
 * Export Cloud Logic APIs
 */
var RestAPIClass = /** @class */ (function () {
    /**
     * Initialize Rest API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    function RestAPIClass(options) {
        this._api = null;
        this.Credentials = core_1.Credentials;
        this._options = options;
        logger.debug('API Options', this._options);
    }
    RestAPIClass.prototype.getModuleName = function () {
        return 'RestAPI';
    };
    /**
     * Configure API part with aws configurations
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    RestAPIClass.prototype.configure = function (options) {
        var _a = options || {}, _b = _a.API, API = _b === void 0 ? {} : _b, otherOptions = tslib_1.__rest(_a, ["API"]);
        var opt = tslib_1.__assign(tslib_1.__assign({}, otherOptions), API);
        logger.debug('configure Rest API', { opt: opt });
        if (opt['aws_project_region']) {
            if (opt['aws_cloud_logic_custom']) {
                var custom = opt['aws_cloud_logic_custom'];
                opt.endpoints =
                    typeof custom === 'string' ? JSON.parse(custom) : custom;
            }
            opt = Object.assign({}, opt, {
                region: opt['aws_project_region'],
                header: {},
            });
        }
        if (Array.isArray(opt.endpoints)) {
            // Check if endpoints has custom_headers and validate if is a function
            opt.endpoints.forEach(function (endpoint) {
                if (typeof endpoint.custom_header !== 'undefined' &&
                    typeof endpoint.custom_header !== 'function') {
                    logger.warn('Rest API ' + endpoint.name + ', custom_header should be a function');
                    endpoint.custom_header = undefined;
                }
            });
        }
        else if (this._options && Array.isArray(this._options.endpoints)) {
            opt.endpoints = this._options.endpoints;
        }
        else {
            opt.endpoints = [];
        }
        this._options = Object.assign({}, this._options, opt);
        this.createInstance();
        return this._options;
    };
    /**
     * Create an instance of API for the library
     * @return - A promise of true if Success
     */
    RestAPIClass.prototype.createInstance = function () {
        logger.debug('create Rest API instance');
        this._api = new RestClient_1.RestClient(this._options);
        // Share Amplify instance with client for SSR
        this._api.Credentials = this.Credentials;
        return true;
    };
    /**
     * Make a GET request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.get = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.get(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a POST request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.post = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.post(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a PUT request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.put = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.put(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a PATCH request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.patch = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.patch(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a DEL request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.del = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.del(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a HEAD request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.head = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.head(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    RestAPIClass.prototype.isCancel = function (error) {
        return this._api.isCancel(error);
    };
    /**
     * Cancels an inflight request
     * @param {any} request - request to cancel
     * @return {boolean} - A boolean indicating if the request was cancelled
     */
    RestAPIClass.prototype.cancel = function (request, message) {
        return this._api.cancel(request, message);
    };
    /**
     * Check if the request has a corresponding cancel token in the WeakMap.
     * @params request - The request promise
     * @return if the request has a corresponding cancel token.
     */
    RestAPIClass.prototype.hasCancelToken = function (request) {
        return this._api.hasCancelToken(request);
    };
    /**
     * Getting endpoint for API
     * @param {string} apiName - The name of the api
     * @return {string} - The endpoint of the api
     */
    RestAPIClass.prototype.endpoint = function (apiName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this._api.endpoint(apiName)];
            });
        });
    };
    /**
     * Getting endpoint info for API
     * @param {string} apiName - The name of the api
     * @param {string} path - The path of the api that is going to accessed
     * @return {ApiInfo} - The endpoint information for that api-name
     */
    RestAPIClass.prototype.getEndpointInfo = function (apiName, path) {
        var cloud_logic_array = this._options.endpoints;
        if (!Array.isArray(cloud_logic_array)) {
            throw new Error("API category not configured");
        }
        var apiConfig = cloud_logic_array.find(function (api) { return api.name === apiName; });
        if (!apiConfig) {
            throw new Error("API " + apiName + " does not exist");
        }
        var response = {
            endpoint: apiConfig.endpoint + path,
        };
        if (typeof apiConfig.region === 'string') {
            response.region = apiConfig.region;
        }
        else if (typeof this._options.region === 'string') {
            response.region = this._options.region;
        }
        if (typeof apiConfig.service === 'string') {
            response.service = apiConfig.service || 'execute-api';
        }
        else {
            response.service = 'execute-api';
        }
        if (typeof apiConfig.custom_header === 'function') {
            response.custom_header = apiConfig.custom_header;
        }
        else {
            response.custom_header = undefined;
        }
        return response;
    };
    return RestAPIClass;
}());
exports.RestAPIClass = RestAPIClass;
exports.RestAPI = new RestAPIClass(null);
core_1.Amplify.register(exports.RestAPI);
//# sourceMappingURL=RestAPI.js.map