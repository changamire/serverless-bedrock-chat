// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getCredentialScope } from './getCredentialScope';
import { getFormattedDates } from './getFormattedDates';
/**
 * Extracts common values used for signing both requests and urls.
 *
 * @param options `SignRequestOptions` object containing values used to construct the signature.
 * @returns Common `SigningValues` used for signing.
 *
 * @internal
 */
export var getSigningValues = function (_a) {
    var credentials = _a.credentials, _b = _a.signingDate, signingDate = _b === void 0 ? new Date() : _b, signingRegion = _a.signingRegion, signingService = _a.signingService, _c = _a.uriEscapePath, uriEscapePath = _c === void 0 ? true : _c;
    // get properties from credentials
    var accessKeyId = credentials.accessKeyId, secretAccessKey = credentials.secretAccessKey, sessionToken = credentials.sessionToken;
    // get formatted dates for signing
    var _d = getFormattedDates(signingDate), longDate = _d.longDate, shortDate = _d.shortDate;
    // copy header and set signing properties
    var credentialScope = getCredentialScope(shortDate, signingRegion, signingService);
    return {
        accessKeyId: accessKeyId,
        credentialScope: credentialScope,
        longDate: longDate,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken,
        shortDate: shortDate,
        signingRegion: signingRegion,
        signingService: signingService,
        uriEscapePath: uriEscapePath,
    };
};
