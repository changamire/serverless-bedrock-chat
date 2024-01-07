// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Platform } from 'react-native';
import { clientInfo as iOSClientInfo } from './ios';
import { clientInfo as androidClientInfo } from './android';
var OS = Platform.OS;
var ClientDevice = /** @class */ (function () {
    function ClientDevice() {
    }
    ClientDevice.clientInfo = function () {
        if (OS === 'ios') {
            return iOSClientInfo();
        }
        else {
            return androidClientInfo();
        }
    };
    return ClientDevice;
}());
export { ClientDevice };
