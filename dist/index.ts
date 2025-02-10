// Core exports
export { Logger } from "./core/logger";

// Transport exports
export { ConsoleTransport } from "./transports/consoleTransport";
export { FileTransport } from "./transports/fileTransport";
export { HTMLTransport } from "./transports/htmlTransport";
export { MarkdownTransport } from "./transports/markdownTransport";
export { BrowserTransport } from "./transports/browserTransport";

// Type exports
export interface LoggerOptions {
  level?: string;
  timestamp?: boolean;
  traceCaller?: boolean;
}

export interface TransportOptions {
  colorize?: boolean;
  gap?: number;
  type?: "standard" | "json" | "detailed";
  prettyObjects?: boolean;
  filepath?: string;
  styles?: string;
}

export interface LogMeta {
  [key: string]: any;
}
