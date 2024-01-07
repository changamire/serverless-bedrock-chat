"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@aws-amplify/core");
var axios_1 = tslib_1.__importDefault(require("axios"));
var url_1 = require("url");
var logger = new core_1.ConsoleLogger('RestClient');
/**
* HTTP Client for REST requests. Send and receive JSON data.
* Sign request with AWS credentials if available
* Usage:
<pre>
const restClient = new RestClient();
restClient.get('...')
    .then(function(data) {
        console.log(data);
    })
    .catch(err => console.log(err));
</pre>
*/
var RestClient = /** @class */ (function () {
    /**
     * @param {RestClientOptions} [options] - Instance options
     */
    function RestClient(options) {
        this._region = 'us-east-1'; // this will be updated by endpoint function
        this._service = 'execute-api'; // this can be updated by endpoint function
        this._custom_header = undefined; // this can be updated by endpoint function
        /**
         * This weak map provides functionality to let clients cancel
         * in-flight axios requests. https://github.com/axios/axios#cancellation
         *
         * 1. For every axios request, a unique cancel token is generated and added in the request.
         * 2. Promise for fulfilling the request is then mapped to that unique cancel token.
         * 3. The promise is returned to the client.
         * 4. Clients can either wait for the promise to fulfill or call `API.cancel(promise)` to cancel the request.
         * 5. If `API.cancel(promise)` is called, then the corresponding cancel token is retrieved from the map below.
         * 6. Promise returned to the client will be in rejected state with the error provided during cancel.
         * 7. Clients can check if the error is because of cancelling by calling `API.isCancel(error)`.
         *
         * For more details, see https://github.com/aws-amplify/amplify-js/pull/3769#issuecomment-552660025
         */
        this._cancelTokenMap = null;
        this.Credentials = core_1.Credentials;
        this._options = options;
        logger.debug('API Options', this._options);
        if (this._cancelTokenMap == null) {
            this._cancelTokenMap = new WeakMap();
        }
    }
    /**
    * Update AWS credentials
    * @param {AWSCredentials} credentials - AWS credentials
    *
    updateCredentials(credentials: AWSCredentials) {
        this.options.credentials = credentials;
    }
*/
    /**
     * Basic HTTP request. Customizable
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {string} method - Request HTTP method
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.ajax = function (urlOrApiInfo, method, init) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parsed_url, url, region, service, custom_header, params, libraryHeaders, initParams, isAllResponse, custom_header_obj, _a, _b, search, parsedUrl, credentials, error_1, signedParams, response, error_2, headers, dateHeader, responseDate, requestDate;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger.debug(method, urlOrApiInfo);
                        region = 'us-east-1';
                        service = 'execute-api';
                        custom_header = undefined;
                        if (typeof urlOrApiInfo === 'string') {
                            parsed_url = this._parseUrl(urlOrApiInfo);
                            url = urlOrApiInfo;
                        }
                        else {
                            (url = urlOrApiInfo.endpoint, custom_header = urlOrApiInfo.custom_header, region = urlOrApiInfo.region, service = urlOrApiInfo.service);
                            parsed_url = this._parseUrl(urlOrApiInfo.endpoint);
                        }
                        params = {
                            method: method,
                            url: url,
                            host: parsed_url.host,
                            path: parsed_url.path,
                            headers: {},
                            data: null,
                            responseType: 'json',
                            timeout: 0,
                            cancelToken: null,
                        };
                        libraryHeaders = {};
                        initParams = Object.assign({}, init);
                        isAllResponse = initParams.response;
                        if (initParams.body) {
                            if (typeof FormData === 'function' &&
                                initParams.body instanceof FormData) {
                                libraryHeaders['Content-Type'] = 'multipart/form-data';
                                params.data = initParams.body;
                            }
                            else {
                                libraryHeaders['Content-Type'] = 'application/json; charset=UTF-8';
                                params.data = JSON.stringify(initParams.body);
                            }
                        }
                        if (initParams.responseType) {
                            params.responseType = initParams.responseType;
                        }
                        if (initParams.withCredentials) {
                            params['withCredentials'] = initParams.withCredentials;
                        }
                        if (initParams.timeout) {
                            params.timeout = initParams.timeout;
                        }
                        if (initParams.cancellableToken) {
                            params.cancelToken = initParams.cancellableToken.token;
                        }
                        params['signerServiceInfo'] = initParams.signerServiceInfo;
                        if (!(typeof custom_header === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, custom_header()];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _c.label = 3;
                    case 3:
                        custom_header_obj = _a;
                        params.headers = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, libraryHeaders), custom_header_obj), initParams.headers);
                        _b = url_1.parse(url, true, true), search = _b.search, parsedUrl = tslib_1.__rest(_b, ["search"]);
                        params.url = url_1.format(tslib_1.__assign(tslib_1.__assign({}, parsedUrl), { query: tslib_1.__assign(tslib_1.__assign({}, parsedUrl.query), (initParams.queryStringParameters || {})) }));
                        // Do not sign the request if client has added 'Authorization' header,
                        // which means custom authorizer.
                        if (typeof params.headers['Authorization'] !== 'undefined') {
                            params.headers = Object.keys(params.headers).reduce(function (acc, k) {
                                if (params.headers[k]) {
                                    acc[k] = params.headers[k];
                                }
                                return acc;
                                // tslint:disable-next-line:align
                            }, {});
                            return [2 /*return*/, this._request(params, isAllResponse)];
                        }
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.Credentials.get()];
                    case 5:
                        credentials = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        logger.debug('No credentials available, the request will be unsigned');
                        return [2 /*return*/, this._request(params, isAllResponse)];
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        signedParams = this._sign(tslib_1.__assign({}, params), credentials, {
                            region: region,
                            service: service,
                        });
                        return [4 /*yield*/, axios_1.default(signedParams)];
                    case 8:
                        response = _c.sent();
                        return [2 /*return*/, isAllResponse ? response : response.data];
                    case 9:
                        error_2 = _c.sent();
                        logger.debug(error_2);
                        if (core_1.DateUtils.isClockSkewError(error_2)) {
                            headers = error_2.response.headers;
                            dateHeader = headers && (headers.date || headers.Date);
                            responseDate = new Date(dateHeader);
                            requestDate = core_1.DateUtils.getDateFromHeaderString(signedParams.headers['x-amz-date']);
                            // Compare local clock to the server clock
                            if (core_1.DateUtils.isClockSkewed(responseDate)) {
                                core_1.DateUtils.setClockOffset(responseDate.getTime() - requestDate.getTime());
                                return [2 /*return*/, this.ajax(urlOrApiInfo, method, init)];
                            }
                        }
                        throw error_2;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GET HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {JSON} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.get = function (urlOrApiInfo, init) {
        return this.ajax(urlOrApiInfo, 'GET', init);
    };
    /**
     * PUT HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.put = function (urlOrApiInfo, init) {
        return this.ajax(urlOrApiInfo, 'PUT', init);
    };
    /**
     * PATCH HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.patch = function (urlOrApiInfo, init) {
        return this.ajax(urlOrApiInfo, 'PATCH', init);
    };
    /**
     * POST HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.post = function (urlOrApiInfo, init) {
        return this.ajax(urlOrApiInfo, 'POST', init);
    };
    /**
     * DELETE HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.del = function (urlOrApiInfo, init) {
        return this.ajax(urlOrApiInfo, 'DELETE', init);
    };
    /**
     * HEAD HTTP request
     * @param {string | ApiInfo } urlOrApiInfo - Full request URL or Api information
     * @param {json} init - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestClient.prototype.head = function (urlOrApiInfo, init) {
        return this.ajax(urlOrApiInfo, 'HEAD', init);
    };
    /**
     * Cancel an inflight API request
     * @param {Promise<any>} request - The request promise to cancel
     * @param {string} [message] - A message to include in the cancelation exception
     */
    RestClient.prototype.cancel = function (request, message) {
        var source = this._cancelTokenMap.get(request);
        if (source) {
            source.cancel(message);
            return true;
        }
        return false;
    };
    /**
     * Check if the request has a corresponding cancel token in the WeakMap.
     * @params request - The request promise
     * @return if the request has a corresponding cancel token.
     */
    RestClient.prototype.hasCancelToken = function (request) {
        return this._cancelTokenMap.has(request);
    };
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    RestClient.prototype.isCancel = function (error) {
        return axios_1.default.isCancel(error);
    };
    /**
     * Retrieves a new and unique cancel token which can be
     * provided in an axios request to be cancelled later.
     */
    RestClient.prototype.getCancellableToken = function () {
        return axios_1.default.CancelToken.source();
    };
    /**
     * Updates the weakmap with a response promise and its
     * cancel token such that the cancel token can be easily
     * retrieved (and used for cancelling the request)
     */
    RestClient.prototype.updateRequestToBeCancellable = function (promise, cancelTokenSource) {
        this._cancelTokenMap.set(promise, cancelTokenSource);
    };
    /**
     * Getting endpoint for API
     * @param {string} apiName - The name of the api
     * @return {string} - The endpoint of the api
     */
    RestClient.prototype.endpoint = function (apiName) {
        var _this = this;
        var cloud_logic_array = this._options.endpoints;
        var response = '';
        if (!Array.isArray(cloud_logic_array)) {
            return response;
        }
        cloud_logic_array.forEach(function (v) {
            if (v.name === apiName) {
                response = v.endpoint;
                if (typeof v.region === 'string') {
                    _this._region = v.region;
                }
                else if (typeof _this._options.region === 'string') {
                    _this._region = _this._options.region;
                }
                if (typeof v.service === 'string') {
                    _this._service = v.service || 'execute-api';
                }
                else {
                    _this._service = 'execute-api';
                }
                if (typeof v.custom_header === 'function') {
                    _this._custom_header = v.custom_header;
                }
                else {
                    _this._custom_header = undefined;
                }
            }
        });
        return response;
    };
    /** private methods **/
    RestClient.prototype._sign = function (params, credentials, _a) {
        var service = _a.service, region = _a.region;
        var signerServiceInfoParams = params.signerServiceInfo, otherParams = tslib_1.__rest(params, ["signerServiceInfo"]);
        var endpoint_region = region || this._region || this._options.region;
        var endpoint_service = service || this._service || this._options.service;
        var creds = {
            secret_key: credentials.secretAccessKey,
            access_key: credentials.accessKeyId,
            session_token: credentials.sessionToken,
        };
        var endpointInfo = {
            region: endpoint_region,
            service: endpoint_service,
        };
        var signerServiceInfo = Object.assign(endpointInfo, signerServiceInfoParams);
        var signed_params = core_1.Signer.sign(otherParams, creds, signerServiceInfo);
        if (signed_params.data) {
            signed_params.body = signed_params.data;
        }
        logger.debug('Signed Request: ', signed_params);
        delete signed_params.headers['host'];
        return signed_params;
    };
    RestClient.prototype._request = function (params, isAllResponse) {
        if (isAllResponse === void 0) { isAllResponse = false; }
        return axios_1.default(params)
            .then(function (response) { return (isAllResponse ? response : response.data); })
            .catch(function (error) {
            logger.debug(error);
            throw error;
        });
    };
    RestClient.prototype._parseUrl = function (url) {
        var parts = url.split('/');
        return {
            host: parts[2],
            path: '/' + parts.slice(3).join('/'),
        };
    };
    return RestClient;
}());
exports.RestClient = RestClient;
//# sourceMappingURL=RestClient.js.map