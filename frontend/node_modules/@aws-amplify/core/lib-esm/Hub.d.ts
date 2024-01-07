export type HubCapsule = {
    channel: string;
    payload: HubPayload;
    source: string;
    patternInfo?: string[];
};
export type HubPayload = {
    event: string;
    data?: any;
    message?: string;
};
export type HubCallback = (capsule: HubCapsule) => void;
export type LegacyCallback = {
    onHubCapsule: HubCallback;
};
export declare class HubClass {
    name: string;
    private listeners;
    private patterns;
    protectedChannels: string[];
    constructor(name: string);
    /**
     * Used internally to remove a Hub listener.
     *
     * @remarks
     * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
     */
    private _remove;
    /**
     * @deprecated Instead of calling Hub.remove, call the result of Hub.listen.
     */
    remove(channel: string | RegExp, listener: HubCallback): void;
    /**
     * Used to send a Hub event.
     *
     * @param channel - The channel on which the event will be broadcast
     * @param payload - The HubPayload
     * @param source  - The source of the event; defaults to ''
     * @param ampSymbol - Symbol used to determine if the event is dispatched internally on a protected channel
     *
     */
    dispatch(channel: string, payload: HubPayload, source?: string, ampSymbol?: Symbol): void;
    /**
     * Used to listen for Hub events.
     *
     * @param channel - The channel on which to listen
     * @param callback - The callback to execute when an event is received on the specified channel
     * @param listenerName - The name of the listener; defaults to 'noname'
     * @returns A function which can be called to cancel the listener.
     *
     */
    listen(channel: string | RegExp, callback?: HubCallback | LegacyCallback, listenerName?: string): () => void;
    private _toListeners;
}
export declare const Hub: HubClass;
