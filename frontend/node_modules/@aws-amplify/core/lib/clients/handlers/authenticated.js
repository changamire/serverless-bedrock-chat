"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedHandler = void 0;
var retry_1 = require("../middleware/retry");
var signing_1 = require("../middleware/signing");
var userAgent_1 = require("../middleware/userAgent");
var composeTransferHandler_1 = require("../internal/composeTransferHandler");
var fetch_1 = require("./fetch");
exports.authenticatedHandler = (0, composeTransferHandler_1.composeTransferHandler)(fetch_1.fetchTransferHandler, [
    userAgent_1.userAgentMiddleware,
    retry_1.retryMiddleware,
    signing_1.signingMiddleware,
]);
