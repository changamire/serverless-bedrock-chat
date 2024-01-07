// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Platform, Dimensions } from 'react-native';
import { ConsoleLogger as Logger } from '../Logger';
var logger = new Logger('DeviceInfo');
export var clientInfo = function () {
    var dim = Dimensions.get('screen');
    logger.debug(Platform, dim);
    var OS = 'android';
    var Version = Platform.Version;
    return {
        platform: OS,
        version: String(Version),
        appVersion: [OS, String(Version)].join('/'),
    };
};
