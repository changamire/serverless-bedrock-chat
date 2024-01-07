import { LoggingProvider } from '../types';
export interface Logger {
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    addPluggable(pluggable: LoggingProvider): void;
}
