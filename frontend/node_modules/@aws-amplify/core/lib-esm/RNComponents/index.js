// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { browserOrNode } from '../JS';
import { StorageHelper } from '../StorageHelper';
export var Linking = {};
export var AppState = {
    addEventListener: function (action, handler) { return undefined; },
};
// if not in react native, just use local storage
export var AsyncStorage = browserOrNode().isBrowser
    ? new StorageHelper().getStorage()
    : undefined;
