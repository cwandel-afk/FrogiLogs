declare module "frogilogs" {
  export class Logger {
    constructor(options?: LoggerOptions);
    addTransport(transport: Transport): void;
    debug(message: string, meta?: object, important?: boolean): void;
    info(message: string, meta?: object, important?: boolean): void;
    warn(message: string, meta?: object, important?: boolean): void;
    error(message: string, meta?: object, important?: boolean): void;
  }

  export class ConsoleTransport {
    constructor(options?: TransportOptions);
    write(logEntry: LogEntry): void;
  }

  export class BrowserTransport {
    constructor(options?: TransportOptions);
    write(logEntry: LogEntry): void;
  }

  export class FileTransport {
    constructor(options?: TransportOptions);
    write(logEntry: LogEntry): void;
  }

  export class HTMLTransport {
    constructor(options?: TransportOptions);
    write(logEntry: LogEntry): void;
  }

  export class MarkdownTransport {
    constructor(options?: TransportOptions);
    write(logEntry: LogEntry): void;
  }

  export interface LoggerOptions {
    level?: "debug" | "info" | "warn" | "error";
    timestamp?: boolean;
    traceCaller?: boolean;
  }

  export interface TransportOptions {
    colorize?: boolean;
    type?: "detailed" | "standard" | "json";
    prettyObjects?: boolean;
    gap?: number;
    filepath?: string;
    logTitle?: string;
    styles?:
      | string
      | {
          debug?: string;
          info?: string;
          warn?: string;
          error?: string;
        };
  }

  export interface LogEntry {
    timestamp?: string;
    level: string;
    caller?: string;
    message: string;
    meta?: any;
    important?: boolean;
  }

  export interface LogMeta {
    [key: string]: any;
  }

  export type Transport =
    | ConsoleTransport
    | BrowserTransport
    | FileTransport
    | HTMLTransport
    | MarkdownTransport;
}
