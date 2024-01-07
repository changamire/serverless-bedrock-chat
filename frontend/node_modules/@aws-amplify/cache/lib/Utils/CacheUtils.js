"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
/**
 * Default cache config
 */
exports.defaultConfig = {
    keyPrefix: 'aws-amplify-cache',
    capacityInBytes: 1048576,
    itemMaxSize: 210000,
    defaultTTL: 259200000,
    defaultPriority: 5,
    warningThreshold: 0.8,
    // the storage helper will check if localStorage exists,
    // if not, will use a in-memory object instead
    storage: new core_1.StorageHelper().getStorage(),
};
/**
 * return the byte size of the string
 * @param str
 */
function getByteLength(str) {
    var ret = 0;
    ret = str.length;
    for (var i = str.length; i >= 0; i -= 1) {
        var charCode = str.charCodeAt(i);
        if (charCode > 0x7f && charCode <= 0x7ff) {
            ret += 1;
        }
        else if (charCode > 0x7ff && charCode <= 0xffff) {
            ret += 2;
        }
        // trail surrogate
        if (charCode >= 0xdc00 && charCode <= 0xdfff) {
            i -= 1;
        }
    }
    return ret;
}
exports.getByteLength = getByteLength;
/**
 * get current time
 */
function getCurrTime() {
    var currTime = new Date();
    return currTime.getTime();
}
exports.getCurrTime = getCurrTime;
/**
 * check if passed value is an integer
 */
function isInteger(value) {
    if (Number.isInteger) {
        return Number.isInteger(value);
    }
    return _isInteger(value);
}
exports.isInteger = isInteger;
function _isInteger(value) {
    return (typeof value === 'number' && isFinite(value) && Math.floor(value) === value);
}
/**
 * provide an object as the in-memory cache
 */
var store = {};
var CacheObject = /** @class */ (function () {
    function CacheObject() {
    }
    CacheObject.clear = function () {
        store = {};
    };
    CacheObject.getItem = function (key) {
        return store[key] || null;
    };
    CacheObject.setItem = function (key, value) {
        store[key] = value;
    };
    CacheObject.removeItem = function (key) {
        delete store[key];
    };
    return CacheObject;
}());
exports.CacheObject = CacheObject;
//# sourceMappingURL=CacheUtils.js.map