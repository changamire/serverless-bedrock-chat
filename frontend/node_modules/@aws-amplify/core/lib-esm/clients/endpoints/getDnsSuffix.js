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
import { defaultPartition, partitionsInfo } from './partitions';
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
export var getDnsSuffix = function (region) {
    var e_1, _a;
    var partitions = partitionsInfo.partitions;
    try {
        for (var partitions_1 = __values(partitions), partitions_1_1 = partitions_1.next(); !partitions_1_1.done; partitions_1_1 = partitions_1.next()) {
            var _b = partitions_1_1.value, regions = _b.regions, outputs = _b.outputs, regionRegex = _b.regionRegex;
            var regex = new RegExp(regionRegex);
            if (regions.includes(region) || regex.test(region)) {
                return outputs.dnsSuffix;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (partitions_1_1 && !partitions_1_1.done && (_a = partitions_1.return)) _a.call(partitions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return defaultPartition.outputs.dnsSuffix;
};
