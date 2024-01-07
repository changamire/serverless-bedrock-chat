"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSigningKey = void 0;
var constants_1 = require("../constants");
var dataHashHelpers_1 = require("./dataHashHelpers");
/**
 * Returns a signing key to be used for signing requests.
 *
 * @param secretAccessKey AWS secret access key from credentials.
 * @param date Current date in the format 'YYYYMMDD'.
 * @param region AWS region in which the service resides.
 * @param service Service to which the signed request is being sent.
 *
 * @returns `Uint8Array` calculated from its composite parts.
 *
 * @internal
 */
var getSigningKey = function (secretAccessKey, date, region, service) {
    var key = "".concat(constants_1.SIGNATURE_IDENTIFIER).concat(secretAccessKey);
    var dateKey = (0, dataHashHelpers_1.getHashedData)(key, date);
    var regionKey = (0, dataHashHelpers_1.getHashedData)(dateKey, region);
    var serviceKey = (0, dataHashHelpers_1.getHashedData)(regionKey, service);
    var signingKey = (0, dataHashHelpers_1.getHashedData)(serviceKey, constants_1.KEY_TYPE_IDENTIFIER);
    return signingKey;
};
exports.getSigningKey = getSigningKey;
