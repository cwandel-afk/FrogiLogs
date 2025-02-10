import { LoggerOptions, LogMeta, Transport } from "../types";

export declare class Logger {
  constructor(options?: LoggerOptions);

  addTransport(transport: Transport): void;
  log(level: string, message: string, meta?: LogMeta): void;
  error(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  debug(message: string, meta?: LogMeta): void;
}
