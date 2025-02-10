import { TransportOptions, LogEntry } from "../types";

export declare class BrowserTransport {
  constructor(options?: TransportOptions);

  private options: TransportOptions;
  private styles: {
    error: string;
    warn: string;
    info: string;
    debug: string;
    timestamp: string;
    caller: string;
    meta: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    gray: string;
  };

  write(logEntry: LogEntry): void;
  private prettyPrintObject(object: any): string;
  private log_standard(logEntry: LogEntry): void;
  private log_json(logEntry: LogEntry): void;
  private log_detailed(logEntry: LogEntry): void;
}
