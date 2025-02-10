import { TransportOptions, LogEntry } from "../types";

export declare class MarkdownTransport {
  constructor(options?: TransportOptions & { logTitle?: string });

  private options: TransportOptions & { logTitle: string };

  write(logEntry: LogEntry): void;
  private prettyPrintObject(object: any): string;
  private appendToFile(content: string): void;
  private log_standard(logEntry: LogEntry): void;
  private log_json(logEntry: LogEntry): void;
  private log_detailed(logEntry: LogEntry): void;
}
