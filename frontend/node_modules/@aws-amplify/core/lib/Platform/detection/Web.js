"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.webDetect = void 0;
var helpers_1 = require("./helpers");
function webDetect() {
    return (0, helpers_1.windowExists)();
}
exports.webDetect = webDetect;
