"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidParameter = exports.missingConfig = void 0;
function missingConfig(name) {
    return new Error('Missing config value of ' + name);
}
exports.missingConfig = missingConfig;
function invalidParameter(name) {
    return new Error('Invalid parameter value of ' + name);
}
exports.invalidParameter = invalidParameter;
