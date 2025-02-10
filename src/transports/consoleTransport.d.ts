import { TransportOptions, LogEntry } from "../types";

export declare class ConsoleTransport {
  constructor(options?: TransportOptions);
  write(logEntry: LogEntry): void;
  private prettyPrintObject(object: any): string;
  private log_standard(logEntry: LogEntry): void;
  private log_json(logEntry: LogEntry): void;
  private log_detailed(logEntry: LogEntry): void;
}
