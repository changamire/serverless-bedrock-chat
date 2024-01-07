"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@aws-amplify/core");
var AuthErrorStrings_1 = require("./common/AuthErrorStrings");
var logger = new core_1.ConsoleLogger('AuthError');
var AuthError = /** @class */ (function (_super) {
    tslib_1.__extends(AuthError, _super);
    function AuthError(type) {
        var _this = this;
        var _a = exports.authErrorMessages[type], message = _a.message, log = _a.log;
        _this = _super.call(this, message) || this;
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        _this.constructor = AuthError;
        Object.setPrototypeOf(_this, AuthError.prototype);
        _this.name = 'AuthError';
        _this.log = log || message;
        logger.error(_this.log);
        return _this;
    }
    return AuthError;
}(Error));
exports.AuthError = AuthError;
var NoUserPoolError = /** @class */ (function (_super) {
    tslib_1.__extends(NoUserPoolError, _super);
    function NoUserPoolError(type) {
        var _this = _super.call(this, type) || this;
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        _this.constructor = NoUserPoolError;
        Object.setPrototypeOf(_this, NoUserPoolError.prototype);
        _this.name = 'NoUserPoolError';
        return _this;
    }
    return NoUserPoolError;
}(AuthError));
exports.NoUserPoolError = NoUserPoolError;
exports.authErrorMessages = {
    noConfig: {
        message: AuthErrorStrings_1.AuthErrorStrings.DEFAULT_MSG,
        log: "\n            Error: Amplify has not been configured correctly.\n            This error is typically caused by one of the following scenarios:\n\n            1. Make sure you're passing the awsconfig object to Amplify.configure() in your app's entry point\n                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information\n            \n            2. There might be multiple conflicting versions of amplify packages in your node_modules.\n\t\t\t\tRefer to our docs site for help upgrading Amplify packages (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js)\n        ",
    },
    missingAuthConfig: {
        message: AuthErrorStrings_1.AuthErrorStrings.DEFAULT_MSG,
        log: "\n            Error: Amplify has not been configured correctly. \n            The configuration object is missing required auth properties.\n            This error is typically caused by one of the following scenarios:\n\n            1. Did you run `amplify push` after adding auth via `amplify add auth`?\n                See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information\n\n            2. This could also be caused by multiple conflicting versions of amplify packages, see (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js) for help upgrading Amplify packages.\n        ",
    },
    emptyUsername: {
        message: AuthErrorStrings_1.AuthErrorStrings.EMPTY_USERNAME,
    },
    // TODO: should include a list of valid sign-in types
    invalidUsername: {
        message: AuthErrorStrings_1.AuthErrorStrings.INVALID_USERNAME,
    },
    emptyPassword: {
        message: AuthErrorStrings_1.AuthErrorStrings.EMPTY_PASSWORD,
    },
    emptyCode: {
        message: AuthErrorStrings_1.AuthErrorStrings.EMPTY_CODE,
    },
    signUpError: {
        message: AuthErrorStrings_1.AuthErrorStrings.SIGN_UP_ERROR,
        log: 'The first parameter should either be non-null string or object',
    },
    noMFA: {
        message: AuthErrorStrings_1.AuthErrorStrings.NO_MFA,
    },
    invalidMFA: {
        message: AuthErrorStrings_1.AuthErrorStrings.INVALID_MFA,
    },
    emptyChallengeResponse: {
        message: AuthErrorStrings_1.AuthErrorStrings.EMPTY_CHALLENGE,
    },
    noUserSession: {
        message: AuthErrorStrings_1.AuthErrorStrings.NO_USER_SESSION,
    },
    deviceConfig: {
        message: AuthErrorStrings_1.AuthErrorStrings.DEVICE_CONFIG,
    },
    networkError: {
        message: AuthErrorStrings_1.AuthErrorStrings.NETWORK_ERROR,
    },
    autoSignInError: {
        message: AuthErrorStrings_1.AuthErrorStrings.AUTOSIGNIN_ERROR,
    },
    default: {
        message: AuthErrorStrings_1.AuthErrorStrings.DEFAULT_MSG,
    },
};
//# sourceMappingURL=Errors.js.map