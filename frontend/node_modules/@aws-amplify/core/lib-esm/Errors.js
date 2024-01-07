// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export function missingConfig(name) {
    return new Error('Missing config value of ' + name);
}
export function invalidParameter(name) {
    return new Error('Invalid parameter value of ' + name);
}
