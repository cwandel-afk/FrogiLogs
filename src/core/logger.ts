import { ConsoleTransport } from "../transports/consoleTransport";
import { LoggerOptions, LogEntry, LogMeta, Transport } from "../types";

export class Logger {
  private levels: { [key: string]: number };
  private options: LoggerOptions;
  private transports: Transport[];

  constructor(options: LoggerOptions = {}) {
    // Default log levels with their priority
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };

    // Default options
    this.options = {
      level: "info",
      timestamp: true,
      traceCaller: false,
      ...options,
    };

    // Array to store active transports
    this.transports = [];
  }

  addTransport(transport: Transport): void {
    this.transports.push(transport);
  }

  private getCaller(): string {
    const error = new Error();
    const stack = error.stack!.split("\n");

    // Find the first non-logger call in the stack
    const callerLine =
      stack.find((line, index) => {
        return (
          index > 1 && !line.includes("Logger.") && !line.includes("/logger.ts")
        );
      }) || "Unknown caller";

    // Parse the caller line to get useful information
    const callerInfo = callerLine
      .trim()
      .replace(/^at /, "") // Remove the 'at ' prefix
      .split(" ")[0]; // Get just the function/method name or file path

    switch (callerInfo) {
      case "Object.<anonymous>":
        return "Anonymous";
      case "new":
        return "Constructor";
      default:
        return callerInfo;
    }
  }

  private log(level: string, message: string, meta: LogMeta = {}): void {
    if (this.shouldLog(level)) {
      const logEntry = this.formatLogEntry(level, message, meta);
      this.writeToTransports(logEntry);
    }
  }

  private shouldLog(level: string): boolean {
    return this.levels[level] <= this.levels[this.options.level || "info"];
  }

  private formatLogEntry(
    level: string,
    message: string,
    meta: LogMeta
  ): LogEntry {
    return {
      timestamp: this.options.timestamp ? new Date().toISOString() : null,
      level,
      caller: this.options.traceCaller ? this.getCaller() : "",
      message,
      meta,
    };
  }

  private writeToTransports(logEntry: LogEntry): void {
    if (this.transports.length === 0) {
      new ConsoleTransport().write(logEntry);
    } else {
      this.transports.forEach((transport) => {
        transport.write(logEntry);
      });
    }
  }

  // Create convenience methods for each log level
  error(message: string, meta: LogMeta = {}, important: boolean = false): void {
    if (important) {
      console.log("\n---------------- Important ----------------\n");
      this.log("error", message, meta);
      console.log("\n-----------------------------------------\n");
    } else {
      this.log("error", message, meta);
    }
  }

  warn(message: string, meta: LogMeta = {}, important: boolean = false): void {
    if (important) {
      console.log("\n---------------- Important ----------------\n");
      this.log("warn", message, meta);
      console.log("\n-----------------------------------------\n");
    } else {
      this.log("warn", message, meta);
    }
  }

  info(message: string, meta: LogMeta = {}, important: boolean = false): void {
    if (important) {
      console.log("\n---------------- Important ----------------\n");
      this.log("info", message, meta);
      console.log("\n-----------------------------------------\n");
    } else {
      this.log("info", message, meta);
    }
  }

  debug(message: string, meta: LogMeta = {}, important: boolean = false): void {
    if (important) {
      console.log("\n---------------- Important ----------------\n");
      this.log("debug", message, meta);
      console.log("\n-----------------------------------------\n");
    } else {
      this.log("debug", message, meta);
    }
  }
}
