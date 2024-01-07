import { MapStyle, GeofenceOptions, ListGeofenceOptions, Geofence, DeleteGeofencesResults, GeofenceError } from './Geo';
export interface AmazonLocationServiceMapStyle extends MapStyle {
    region: string;
}
export declare type AmazonLocationServiceGeofenceOptions = GeofenceOptions & {
    collectionName?: string;
};
export declare type AmazonLocationServiceGeofenceStatus = 'ACTIVE' | 'PENDING' | 'FAILED' | 'DELETED' | 'DELETING';
export declare type AmazonLocationServiceGeofence = Omit<Geofence, 'status'> & {
    status: AmazonLocationServiceGeofenceStatus;
};
export declare type AmazonLocationServiceListGeofenceOptions = ListGeofenceOptions & {
    collectionName?: string;
};
export declare type AmazonLocationServiceBatchGeofenceErrorMessages = 'AccessDeniedException' | 'InternalServerException' | 'ResourceNotFoundException' | 'ThrottlingException' | 'ValidationException';
export declare type AmazonLocationServiceBatchGeofenceError = Omit<GeofenceError, 'error'> & {
    error: {
        code: string;
        message: AmazonLocationServiceBatchGeofenceErrorMessages;
    };
};
export declare type AmazonLocationServiceDeleteGeofencesResults = Omit<DeleteGeofencesResults, 'errors'> & {
    errors: AmazonLocationServiceBatchGeofenceError[];
};
