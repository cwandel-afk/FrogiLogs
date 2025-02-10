import { TransportOptions, LogEntry } from "../types";

export declare class HTMLTransport {
  constructor(options?: TransportOptions & { logTitle?: string });

  private options: TransportOptions & { logTitle: string };
  private entryCount: number;

  write(logEntry: LogEntry): void;
  private prettifyMeta(meta: any): string;
  private appendToFile(content: string): void;
  close(): void;
}
