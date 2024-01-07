"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashedDataAsHex = exports.getHashedData = void 0;
// TODO: V6 update to different crypto dependency?
var sha256_js_1 = require("@aws-crypto/sha256-js");
var util_hex_encoding_1 = require("@aws-sdk/util-hex-encoding");
/**
 * Returns the hashed data a `Uint8Array`.
 *
 * @param key `SourceData` to be used as hashing key.
 * @param data Hashable `SourceData`.
 * @returns `Uint8Array` created from the data as input to a hash function.
 */
var getHashedData = function (key, data) {
    var sha256 = new sha256_js_1.Sha256(key);
    sha256.update(data);
    // TODO: V6 flip to async digest
    var hashedData = sha256.digestSync();
    return hashedData;
};
exports.getHashedData = getHashedData;
/**
 * Returns the hashed data as a hex string.
 *
 * @param key `SourceData` to be used as hashing key.
 * @param data Hashable `SourceData`.
 * @returns String using lowercase hexadecimal characters created from the data as input to a hash function.
 *
 * @internal
 */
var getHashedDataAsHex = function (key, data) {
    var hashedData = (0, exports.getHashedData)(key, data);
    return (0, util_hex_encoding_1.toHex)(hashedData);
};
exports.getHashedDataAsHex = getHashedDataAsHex;
