"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.detect = void 0;
var types_1 = require("../types");
var React_1 = require("./React");
var Vue_1 = require("./Vue");
var Svelte_1 = require("./Svelte");
var Next_1 = require("./Next");
var Nuxt_1 = require("./Nuxt");
var Angular_1 = require("./Angular");
var ReactNative_1 = require("./ReactNative");
var Expo_1 = require("./Expo");
var Web_1 = require("./Web");
// These are in the order of detection where when both are detectable, the early Framework will be reported
var detectionMap = [
    // First, detect mobile
    { platform: types_1.Framework.Expo, detectionMethod: Expo_1.expoDetect },
    { platform: types_1.Framework.ReactNative, detectionMethod: ReactNative_1.reactNativeDetect },
    // Next, detect web frameworks
    { platform: types_1.Framework.NextJs, detectionMethod: Next_1.nextWebDetect },
    { platform: types_1.Framework.Nuxt, detectionMethod: Nuxt_1.nuxtWebDetect },
    { platform: types_1.Framework.Angular, detectionMethod: Angular_1.angularWebDetect },
    { platform: types_1.Framework.React, detectionMethod: React_1.reactWebDetect },
    { platform: types_1.Framework.VueJs, detectionMethod: Vue_1.vueWebDetect },
    { platform: types_1.Framework.Svelte, detectionMethod: Svelte_1.svelteWebDetect },
    { platform: types_1.Framework.WebUnknown, detectionMethod: Web_1.webDetect },
    // Last, detect ssr frameworks
    { platform: types_1.Framework.NextJsSSR, detectionMethod: Next_1.nextSSRDetect },
    { platform: types_1.Framework.NuxtSSR, detectionMethod: Nuxt_1.nuxtSSRDetect },
    { platform: types_1.Framework.ReactSSR, detectionMethod: React_1.reactSSRDetect },
    { platform: types_1.Framework.VueJsSSR, detectionMethod: Vue_1.vueSSRDetect },
    { platform: types_1.Framework.AngularSSR, detectionMethod: Angular_1.angularSSRDetect },
    { platform: types_1.Framework.SvelteSSR, detectionMethod: Svelte_1.svelteSSRDetect },
];
function detect() {
    var _a;
    return (((_a = detectionMap.find(function (detectionEntry) { return detectionEntry.detectionMethod(); })) === null || _a === void 0 ? void 0 : _a.platform) || types_1.Framework.ServerSideUnknown);
}
exports.detect = detect;
