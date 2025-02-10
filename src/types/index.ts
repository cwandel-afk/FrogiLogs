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

export interface LogEntry {
  timestamp: string | null;
  level: string;
  caller: string;
  message: string;
  meta: LogMeta;
}

export interface Transport {
  write(logEntry: LogEntry): void;
}
