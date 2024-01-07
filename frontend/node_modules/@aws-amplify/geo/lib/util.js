"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var boolean_clockwise_1 = tslib_1.__importDefault(require("@turf/boolean-clockwise"));
function validateCoordinates(lng, lat) {
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
        throw new Error("Invalid coordinates: [" + lng + "," + lat + "]");
    }
    if (lat < -90 || 90 < lat) {
        throw new Error('Latitude must be between -90 and 90 degrees inclusive.');
    }
    else if (lng < -180 || 180 < lng) {
        throw new Error('Longitude must be between -180 and 180 degrees inclusive.');
    }
}
exports.validateCoordinates = validateCoordinates;
function validateGeofenceId(geofenceId) {
    var geofenceIdRegex = /^[-._\p{L}\p{N}]+$/iu;
    // Check if geofenceId is valid
    if (!geofenceIdRegex.test(geofenceId)) {
        throw new Error("Invalid geofenceId: '" + geofenceId + "' - IDs can only contain alphanumeric characters, hyphens, underscores and periods.");
    }
}
exports.validateGeofenceId = validateGeofenceId;
function validateLinearRing(linearRing, geofenceId) {
    var errorPrefix = geofenceId ? geofenceId + ": " : '';
    // Validate LinearRing size, must be at least 4 points
    if (linearRing.length < 4) {
        throw new Error(errorPrefix + "LinearRing must contain 4 or more coordinates.");
    }
    // Validate all coordinates are valid, error with which ones are bad
    var badCoordinates = [];
    linearRing.forEach(function (coordinates) {
        try {
            validateCoordinates(coordinates[0], coordinates[1]);
        }
        catch (error) {
            badCoordinates.push({ coordinates: coordinates, error: error.message });
        }
    });
    if (badCoordinates.length > 0) {
        throw new Error(errorPrefix + "One or more of the coordinates in the Polygon LinearRing are not valid: " + JSON.stringify(badCoordinates));
    }
    // Validate first and last coordinates are the same
    var _a = tslib_1.__read(linearRing[0], 2), lngA = _a[0], latA = _a[1];
    var _b = tslib_1.__read(linearRing[linearRing.length - 1], 2), lngB = _b[0], latB = _b[1];
    if (lngA !== lngB || latA !== latB) {
        throw new Error(errorPrefix + "LinearRing's first and last coordinates are not the same");
    }
    if (boolean_clockwise_1.default(linearRing)) {
        throw new Error(errorPrefix + "LinearRing coordinates must be wound counterclockwise");
    }
}
exports.validateLinearRing = validateLinearRing;
function validatePolygon(polygon, geofenceId) {
    var errorPrefix = geofenceId ? geofenceId + ": " : '';
    if (!Array.isArray(polygon)) {
        throw new Error(errorPrefix + "Polygon is of incorrect structure. It should be an array of LinearRings");
    }
    if (polygon.length < 1) {
        throw new Error(errorPrefix + "Polygon must have a single LinearRing array.");
    }
    if (polygon.length > 1) {
        throw new Error(errorPrefix + "Polygon must have a single LinearRing array. Note: We do not currently support polygons with holes, multipolygons, polygons that are wound clockwise, or that cross the antimeridian.");
    }
    var verticesCount = polygon.reduce(function (prev, linearRing) { return prev + linearRing.length; }, 0);
    if (verticesCount > 1000) {
        throw new Error(errorPrefix + "Polygon has more than the maximum 1000 vertices.");
    }
    polygon.forEach(function (linearRing) {
        validateLinearRing(linearRing, geofenceId);
    });
}
exports.validatePolygon = validatePolygon;
function validateGeofencesInput(geofences) {
    var geofenceIds = {};
    geofences.forEach(function (geofence) {
        // verify all required properties are present
        // Validate geofenceId exists
        if (!geofence.geofenceId) {
            throw new Error("Geofence '" + geofence + "' is missing geofenceId");
        }
        var geofenceId = geofence.geofenceId;
        validateGeofenceId(geofenceId);
        // Validate geofenceId is unique
        if (geofenceIds[geofenceId]) {
            throw new Error("Duplicate geofenceId: " + geofenceId);
        }
        else {
            geofenceIds[geofenceId] = true;
        }
        // Validate geometry exists
        if (!geofence.geometry) {
            throw new Error("Geofence '" + geofenceId + "' is missing geometry");
        }
        var geometry = geofence.geometry;
        // Validate polygon exists
        if (!geometry.polygon) {
            throw new Error("Geofence '" + geofenceId + "' is missing geometry.polygon");
        }
        var polygon = geometry.polygon;
        // Validate polygon length and structure
        try {
            validatePolygon(polygon, geofenceId);
        }
        catch (error) {
            if (error.message.includes('Polygon has more than the maximum 1000 vertices.')) {
                throw new Error("Geofence '" + geofenceId + "' has more than the maximum of 1000 vertices");
            }
        }
        // Validate LinearRing length, structure, and coordinates
        var _a = tslib_1.__read(polygon, 1), linearRing = _a[0];
        validateLinearRing(linearRing, geofenceId);
    });
}
exports.validateGeofencesInput = validateGeofencesInput;
function mapSearchOptions(options, locationServiceInput) {
    var locationServiceModifiedInput = tslib_1.__assign({}, locationServiceInput);
    locationServiceModifiedInput.FilterCountries = options.countries;
    locationServiceModifiedInput.MaxResults = options.maxResults;
    if (options.searchIndexName) {
        locationServiceModifiedInput.IndexName = options.searchIndexName;
    }
    if (options['biasPosition'] && options['searchAreaConstraints']) {
        throw new Error('BiasPosition and SearchAreaConstraints are mutually exclusive, please remove one or the other from the options object');
    }
    if (options['biasPosition']) {
        locationServiceModifiedInput.BiasPosition = options['biasPosition'];
    }
    if (options['searchAreaConstraints']) {
        locationServiceModifiedInput.FilterBBox = options['searchAreaConstraints'];
    }
    return locationServiceModifiedInput;
}
exports.mapSearchOptions = mapSearchOptions;
//# sourceMappingURL=util.js.map