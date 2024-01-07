"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDevice = void 0;
var browser_1 = require("./browser");
var ClientDevice = /** @class */ (function () {
    function ClientDevice() {
    }
    ClientDevice.clientInfo = function () {
        return (0, browser_1.clientInfo)();
    };
    ClientDevice.dimension = function () {
        return (0, browser_1.dimension)();
    };
    return ClientDevice;
}());
exports.ClientDevice = ClientDevice;
