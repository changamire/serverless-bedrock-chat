// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { retryMiddleware } from '../middleware/retry';
import { signingMiddleware } from '../middleware/signing';
import { userAgentMiddleware } from '../middleware/userAgent';
import { composeTransferHandler } from '../internal/composeTransferHandler';
import { fetchTransferHandler } from './fetch';
export var authenticatedHandler = composeTransferHandler(fetchTransferHandler, [
    userAgentMiddleware,
    retryMiddleware,
    signingMiddleware,
]);
