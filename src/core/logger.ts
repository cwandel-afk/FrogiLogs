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
      ...options,
    };

    // Array to store active transports
    this.transports = [];
  }

  addTransport(transport: Transport): void {
    this.transports.push(transport);
  }

  private getCaller(): string {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      try {
        // Create a wrapper function to capture the call context
        const getCallerName = () => {
          const error = new Error();
          const stack = error.stack!.split("\n");

          // Find the relevant caller line (skip internal calls)
          const callerLine =
            stack.find((line) => {
              return (
                line.includes("browser-example.html") &&
                !line.includes("getCaller") &&
                !line.includes("formatLogEntry") &&
                !line.includes("log@") &&
                !line.includes("debug@") &&
                !line.includes("info@") &&
                !line.includes("warn@") &&
                !line.includes("error@")
              );
            }) || "";

          // Extract function name from the Firefox/Chrome style stack trace
          // Format: functionName@file:line:column
          const parts = callerLine.split("@")[0].split("/");
          const functionName = parts[parts.length - 1];

          // Clean up the function name
          if (functionName) {
            // Remove any remaining path segments
            const cleanName = functionName.split(".").pop() || "";
            // Handle special cases
            switch (cleanName) {
              case "":
              case "Anonymous":
              case "anonymous":
                return "Anonymous";
              case "new":
                return "Constructor";
              default:
                return cleanName;
            }
          }

          return "Anonymous";
        };

        return getCallerName();
      } catch (e) {
        return "Anonymous";
      }
    } else {
      // Original Node.js implementation
      const error = new Error();
      const stack = error.stack!.split("\n");

      // Helper to clean up caller info
      const cleanCallerInfo = (info: string): string => {
        // Remove everything after the first parenthesis if it exists
        const parenthesisIndex = info.indexOf("(");
        if (parenthesisIndex !== -1) {
          info = info.substring(0, parenthesisIndex).trim();
        }

        // Handle standard formats
        info = info.replace(/^at /, "").split(" ")[0];
        const parts = info.split(".");
        return parts[parts.length - 1] || "Anonymous";
      };

      // Find the first non-logger call in the stack
      const callerLine =
        stack.find((line, index) => {
          const isNotLogger =
            !line.includes("Logger") &&
            !line.includes("/logger") &&
            !line.includes("frogilogs");
          return index > 1 && isNotLogger;
        }) || "Unknown caller";

      return cleanCallerInfo(callerLine);
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
