// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// query params
export var ALGORITHM_QUERY_PARAM = 'X-Amz-Algorithm';
export var AMZ_DATE_QUERY_PARAM = 'X-Amz-Date';
export var CREDENTIAL_QUERY_PARAM = 'X-Amz-Credential';
export var EXPIRES_QUERY_PARAM = 'X-Amz-Expires';
export var REGION_SET_PARAM = 'X-Amz-Region-Set';
export var SIGNATURE_QUERY_PARAM = 'X-Amz-Signature';
export var SIGNED_HEADERS_QUERY_PARAM = 'X-Amz-SignedHeaders';
export var TOKEN_QUERY_PARAM = 'X-Amz-Security-Token';
// headers
export var AUTH_HEADER = 'authorization';
export var HOST_HEADER = 'host';
export var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
export var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
// identifiers
export var KEY_TYPE_IDENTIFIER = 'aws4_request';
export var SHA256_ALGORITHM_IDENTIFIER = 'AWS4-HMAC-SHA256';
export var SIGNATURE_IDENTIFIER = 'AWS4';
// preset values
export var EMPTY_HASH = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
export var UNSIGNED_PAYLOAD = 'UNSIGNED-PAYLOAD';
