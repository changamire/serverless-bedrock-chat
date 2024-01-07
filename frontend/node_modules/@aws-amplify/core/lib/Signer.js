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
exports.Signer = void 0;
var Util_1 = require("./Util");
var signatureV4_1 = require("./clients/middleware/signing/signer/signatureV4");
var IOT_SERVICE_NAME = 'iotdevicegateway';
// Best practice regex to parse the service and region from an AWS endpoint
var AWS_ENDPOINT_REGEX = /([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com(.cn)?$/;
var Signer = /** @class */ (function () {
    function Signer() {
    }
    /**
    * Sign a HTTP request, add 'Authorization' header to request param
    * @method sign
    * @memberof Signer
    * @static
    *
    * @param {object} request - HTTP request object
    <pre>
    request: {
        method: GET | POST | PUT ...
        url: ...,
        headers: {
            header1: ...
        },
        data: data
    }
    </pre>
    * @param {object} access_info - AWS access credential info
    <pre>
    access_info: {
        access_key: ...,
        secret_key: ...,
        session_token: ...
    }
    </pre>
    * @param {object} [service_info] - AWS service type and region, optional,
    *                                  if not provided then parse out from url
    <pre>
    service_info: {
        service: ...,
        region: ...
    }
    </pre>
    *
    * @returns {object} Signed HTTP request
    */
    Signer.sign = function (request, accessInfo, serviceInfo) {
        request.headers = request.headers || {};
        if (request.body && !request.data) {
            throw new Error('The attribute "body" was found on the request object. Please use the attribute "data" instead.');
        }
        var requestToSign = __assign(__assign({}, request), { body: request.data, url: new URL(request.url) });
        var options = getOptions(requestToSign, accessInfo, serviceInfo);
        var signedRequest = (0, signatureV4_1.signRequest)(requestToSign, options);
        // Prior to using `signRequest`, Signer accepted urls as strings and outputted urls as string. Coerce the property
        // back to a string so as not to disrupt consumers of Signer.
        signedRequest.url = signedRequest.url.toString();
        // HTTP headers should be case insensitive but, to maintain parity with the previous Signer implementation and
        // limit the impact of this implementation swap, replace lowercased headers with title cased ones.
        signedRequest.headers.Authorization = signedRequest.headers.authorization;
        signedRequest.headers['X-Amz-Security-Token'] =
            signedRequest.headers['x-amz-security-token'];
        delete signedRequest.headers.authorization;
        delete signedRequest.headers['x-amz-security-token'];
        return signedRequest;
    };
    Signer.signUrl = function (urlOrRequest, accessInfo, serviceInfo, expiration) {
        var urlToSign = typeof urlOrRequest === 'object' ? urlOrRequest.url : urlOrRequest;
        var method = typeof urlOrRequest === 'object' ? urlOrRequest.method : 'GET';
        var body = typeof urlOrRequest === 'object' ? urlOrRequest.body : undefined;
        var presignable = {
            body: body,
            method: method,
            url: new URL(urlToSign),
        };
        var options = getOptions(presignable, accessInfo, serviceInfo, expiration);
        var signedUrl = (0, signatureV4_1.presignUrl)(presignable, options);
        if (accessInfo.session_token &&
            !sessionTokenRequiredInSigning(options.signingService)) {
            signedUrl.searchParams.append(signatureV4_1.TOKEN_QUERY_PARAM, accessInfo.session_token);
        }
        return signedUrl.toString();
    };
    return Signer;
}());
exports.Signer = Signer;
var getOptions = function (request, accessInfo, serviceInfo, expiration) {
    var _a = accessInfo !== null && accessInfo !== void 0 ? accessInfo : {}, access_key = _a.access_key, secret_key = _a.secret_key, session_token = _a.session_token;
    var _b = parseServiceInfo(request.url), urlRegion = _b.region, urlService = _b.service;
    var _c = serviceInfo !== null && serviceInfo !== void 0 ? serviceInfo : {}, _d = _c.region, region = _d === void 0 ? urlRegion : _d, _e = _c.service, service = _e === void 0 ? urlService : _e;
    var credentials = __assign({ accessKeyId: access_key, secretAccessKey: secret_key }, (sessionTokenRequiredInSigning(service)
        ? { sessionToken: session_token }
        : {}));
    return __assign({ credentials: credentials, signingDate: Util_1.DateUtils.getDateWithClockOffset(), signingRegion: region, signingService: service }, (expiration && { expiration: expiration }));
};
// TODO: V6 investigate whether add to custom clients' general signer implementation.
var parseServiceInfo = function (url) {
    var _a;
    var host = url.host;
    var matched = (_a = host.match(AWS_ENDPOINT_REGEX)) !== null && _a !== void 0 ? _a : [];
    var parsed = matched.slice(1, 3);
    if (parsed[1] === 'es') {
        // Elastic Search
        parsed = parsed.reverse();
    }
    return {
        service: parsed[0],
        region: parsed[1],
    };
};
// IoT service does not allow the session token in the canonical request
// https://docs.aws.amazon.com/general/latest/gr/sigv4-add-signature-to-request.html
// TODO: V6 investigate whether add to custom clients' general signer implementation.
var sessionTokenRequiredInSigning = function (service) {
    return service !== IOT_SERVICE_NAME;
};
