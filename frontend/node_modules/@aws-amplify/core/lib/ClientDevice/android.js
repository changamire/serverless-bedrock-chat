"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientInfo = void 0;
var react_native_1 = require("react-native");
var Logger_1 = require("../Logger");
var logger = new Logger_1.ConsoleLogger('DeviceInfo');
var clientInfo = function () {
    var dim = react_native_1.Dimensions.get('screen');
    logger.debug(react_native_1.Platform, dim);
    var OS = 'android';
    var Version = react_native_1.Platform.Version;
    return {
        platform: OS,
        version: String(Version),
        appVersion: [OS, String(Version)].join('/'),
    };
};
exports.clientInfo = clientInfo;
