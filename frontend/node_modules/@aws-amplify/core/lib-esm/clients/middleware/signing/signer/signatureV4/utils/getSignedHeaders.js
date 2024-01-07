// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns signed headers.
 *
 * @param headers `headers` from the request.
 * @returns List of headers included in canonical headers, separated by semicolons (;). This indicates which headers
 * are part of the signing process. Header names must use lowercase characters and must appear in alphabetical order.
 *
 * @internal
 */
export var getSignedHeaders = function (headers) {
    return Object.keys(headers)
        .map(function (key) { return key.toLowerCase(); })
        .sort()
        .join(';');
};
