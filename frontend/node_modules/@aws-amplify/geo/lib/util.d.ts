import { Longitude, Latitude, GeofenceId, GeofenceInput, GeofencePolygon, LinearRing } from './types';
export declare function validateCoordinates(lng: Longitude, lat: Latitude): void;
export declare function validateGeofenceId(geofenceId: GeofenceId): void;
export declare function validateLinearRing(linearRing: LinearRing, geofenceId?: GeofenceId): void;
export declare function validatePolygon(polygon: GeofencePolygon, geofenceId?: GeofenceId): void;
export declare function validateGeofencesInput(geofences: GeofenceInput[]): void;
export declare function mapSearchOptions(options: any, locationServiceInput: any): any;
