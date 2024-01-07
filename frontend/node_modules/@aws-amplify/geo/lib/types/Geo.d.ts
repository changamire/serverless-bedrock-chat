export interface GeoConfig {
    region?: string;
    AmazonLocationService?: {
        maps?: {
            items: {};
            default: string;
        };
        search_indices?: {
            items: string[];
            default: string;
        };
        geofenceCollections?: {
            items: string[];
            default: string;
        };
    };
}
export interface MapStyle {
    mapName: string;
    style: string;
}
export declare type Longitude = number;
export declare type Latitude = number;
export declare type Coordinates = [Longitude, Latitude];
export declare type SWLongitude = Longitude;
export declare type SWLatitude = Latitude;
export declare type NELongitude = Longitude;
export declare type NELatitude = Latitude;
export declare type BoundingBox = [SWLongitude, SWLatitude, NELongitude, NELatitude];
export interface SearchByTextOptionsBase {
    countries?: string[];
    maxResults?: number;
    searchIndexName?: string;
    providerName?: string;
}
export interface SearchByTextOptionsWithBiasPosition extends SearchByTextOptionsBase {
    biasPosition?: Coordinates;
}
export interface SearchByTextOptionsWithSearchAreaConstraints extends SearchByTextOptionsBase {
    searchAreaConstraints?: BoundingBox;
}
export declare type SearchByTextOptions = SearchByTextOptionsWithBiasPosition | SearchByTextOptionsWithSearchAreaConstraints;
export declare type SearchByCoordinatesOptions = {
    maxResults?: number;
    searchIndexName?: string;
    providerName?: string;
};
export declare type searchByPlaceIdOptions = {
    searchIndexName?: string;
};
export declare type PlaceGeometry = {
    point: Coordinates;
};
export interface Place {
    addressNumber?: string;
    country?: string;
    geometry: PlaceGeometry | undefined;
    label?: string;
    municipality?: string;
    neighborhood?: string;
    postalCode?: string;
    region?: string;
    street?: string;
    subRegion?: string;
}
export declare type LinearRing = Coordinates[];
export declare type GeofencePolygon = LinearRing[];
export declare type PolygonGeometry = {
    polygon: GeofencePolygon;
};
export declare type GeofenceId = string;
export declare type GeofenceInput = {
    geofenceId: GeofenceId;
    geometry: PolygonGeometry;
};
export declare type GeofenceOptions = {
    providerName?: string;
};
export declare type GeofenceError = {
    error: {
        code: string;
        message: string;
    };
    geofenceId: GeofenceId;
};
declare type GeofenceBase = {
    geofenceId: GeofenceId;
    createTime?: Date;
    updateTime?: Date;
};
export declare type Geofence = GeofenceBase & {
    geometry: PolygonGeometry;
};
export declare type SaveGeofencesResults = {
    successes: GeofenceBase[];
    errors: GeofenceError[];
};
export declare type ListGeofenceOptions = GeofenceOptions & {
    nextToken?: string;
};
export declare type ListGeofenceResults = {
    entries: Geofence[];
    nextToken: string | undefined;
};
export declare type DeleteGeofencesResults = {
    successes: GeofenceId[];
    errors: GeofenceError[];
};
export declare type SearchForSuggestionsResults = SearchForSuggestionsResult[];
export declare type SearchForSuggestionsResult = {
    text: string;
    placeId?: string;
};
export {};
