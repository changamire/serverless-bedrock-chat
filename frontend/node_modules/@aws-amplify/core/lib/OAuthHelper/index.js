"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOAuth = exports.GoogleOAuth = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var GoogleOAuth_1 = require("./GoogleOAuth");
var FacebookOAuth_1 = require("./FacebookOAuth");
exports.GoogleOAuth = new GoogleOAuth_1.GoogleOAuth();
exports.FacebookOAuth = new FacebookOAuth_1.FacebookOAuth();
