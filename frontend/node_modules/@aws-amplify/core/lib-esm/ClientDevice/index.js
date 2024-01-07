// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { clientInfo, dimension } from './browser';
var ClientDevice = /** @class */ (function () {
    function ClientDevice() {
    }
    ClientDevice.clientInfo = function () {
        return clientInfo();
    };
    ClientDevice.dimension = function () {
        return dimension();
    };
    return ClientDevice;
}());
export { ClientDevice };
