// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Compose a transfer handler with a core transfer handler and a list of middleware.
 * @param coreHandler Core transfer handler
 * @param middleware	List of middleware
 * @returns A transfer handler whose option type is the union of the core
 * 	transfer handler's option type and the middleware's option type.
 * @internal
 */
export var composeTransferHandler = function (coreHandler, middleware) {
    return function (request, options) {
        var context = {};
        var composedHandler = function (request) { return coreHandler(request, options); };
        for (var i = middleware.length - 1; i >= 0; i--) {
            var m = middleware[i];
            var resolvedMiddleware = m(options);
            composedHandler = resolvedMiddleware(composedHandler, context);
        }
        return composedHandler(request);
    };
};
