"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDnsSuffix = void 0;
var partitions_1 = require("./partitions");
/**
 * Get the AWS Services endpoint URL's DNS suffix for a given region. A typical AWS regional service endpoint URL will
 * follow this pattern: {endpointPrefix}.{region}.{dnsSuffix}. For example, the endpoint URL for Cognito Identity in
 * us-east-1 will be cognito-identity.us-east-1.amazonaws.com. Here the DnsSuffix is `amazonaws.com`.
 *
 * @param region
 * @returns The DNS suffix
 *
 * @internal
 */
var getDnsSuffix = function (region) {
    var e_1, _a;
    var partitions = partitions_1.partitionsInfo.partitions;
    try {
        for (var partitions_2 = __values(partitions), partitions_2_1 = partitions_2.next(); !partitions_2_1.done; partitions_2_1 = partitions_2.next()) {
            var _b = partitions_2_1.value, regions = _b.regions, outputs = _b.outputs, regionRegex = _b.regionRegex;
            var regex = new RegExp(regionRegex);
            if (regions.includes(region) || regex.test(region)) {
                return outputs.dnsSuffix;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (partitions_2_1 && !partitions_2_1.done && (_a = partitions_2.return)) _a.call(partitions_2);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return partitions_1.defaultPartition.outputs.dnsSuffix;
};
exports.getDnsSuffix = getDnsSuffix;
