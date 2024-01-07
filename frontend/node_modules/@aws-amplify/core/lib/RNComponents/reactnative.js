"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncStorage = exports.AppState = exports.Linking = void 0;
var react_native_1 = require("react-native");
Object.defineProperty(exports, "Linking", { enumerable: true, get: function () { return react_native_1.Linking; } });
Object.defineProperty(exports, "AppState", { enumerable: true, get: function () { return react_native_1.AppState; } });
var async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
exports.AsyncStorage = async_storage_1.default;
