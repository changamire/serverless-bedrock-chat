export interface PushNotificationNativeModule {
    completeNotification?: (completionHandlerId: string) => void;
    getConstants: () => {
        NativeEvent: {
            BACKGROUND_MESSAGE_RECEIVED?: string;
            FOREGROUND_MESSAGE_RECEIVED: string;
            LAUNCH_NOTIFICATION_OPENED: string;
            NOTIFICATION_OPENED: string;
            TOKEN_RECEIVED: string;
        };
        NativeHeadlessTaskKey?: string;
    };
    getLaunchNotification: () => Promise<Record<string, string>>;
    getBadgeCount: () => Promise<number>;
    setBadgeCount: (count: number) => void;
    getPermissionStatus: () => Promise<string>;
    requestPermissions: (permissions: Record<string, boolean>) => Promise<boolean>;
}
