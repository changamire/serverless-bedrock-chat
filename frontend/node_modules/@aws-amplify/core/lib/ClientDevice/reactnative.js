"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDevice = void 0;
var react_native_1 = require("react-native");
var ios_1 = require("./ios");
var android_1 = require("./android");
var OS = react_native_1.Platform.OS;
var ClientDevice = /** @class */ (function () {
    function ClientDevice() {
    }
    ClientDevice.clientInfo = function () {
        if (OS === 'ios') {
            return (0, ios_1.clientInfo)();
        }
        else {
            return (0, android_1.clientInfo)();
        }
    };
    return ClientDevice;
}());
exports.ClientDevice = ClientDevice;
