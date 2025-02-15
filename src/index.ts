// Core exports
export { Logger } from "./core/logger";

// Transport exports
export { ConsoleTransport } from "./transports/consoleTransport";
export { FileTransport } from "./transports/fileTransport";
export { HTMLTransport } from "./transports/htmlTransport";
export { MarkdownTransport } from "./transports/markdownTransport";
export { BrowserTransport } from "./transports/browserTransport";

// Re-export all types
export * from "./types";

// Type definitions
interface LoggerOptions {
  level?: string;
  timestamp?: boolean;
}

interface TransportOptions {
  colorize?: boolean;
  gap?: number;
  type?: "standard" | "json" | "detailed";
  prettyObjects?: boolean;
  filepath?: string;
  styles?: string;
}

interface LogMeta {
  [key: string]: any;
}

interface LogEntry {
  timestamp: string | null;
  level: string;
  message: string;
  meta: LogMeta;
}

interface Transport {
  write(logEntry: LogEntry): void;
}
