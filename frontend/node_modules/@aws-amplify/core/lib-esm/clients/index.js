// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export { getDnsSuffix } from './endpoints';
export { fetchTransferHandler } from './handlers/fetch';
export { unauthenticatedHandler } from './handlers/unauthenticated';
export { authenticatedHandler } from './handlers/authenticated';
export { getHashedPayload, presignUrl, signRequest, } from './middleware/signing/signer/signatureV4';
export { EMPTY_HASH as EMPTY_SHA256_HASH } from './middleware/signing/signer/signatureV4/constants';
export { extendedEncodeURIComponent } from './middleware/signing/utils/extendedEncodeURIComponent';
export { signingMiddleware } from './middleware/signing';
export { getRetryDecider, jitteredBackoff, retryMiddleware, } from './middleware/retry';
export { userAgentMiddleware } from './middleware/userAgent';
export { parseJsonBody, parseJsonError, parseMetadata } from './serde';
export { withMemoization } from './utils/memoization';
export * from './types';
