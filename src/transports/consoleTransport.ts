import { TransportOptions, LogEntry } from "../types";

export class ConsoleTransport {
  private options: TransportOptions;
  private colors: {
    error: string;
    warn: string;
    info: string;
    debug: string;
    reset: string;
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

  constructor(options: TransportOptions = {}) {
    this.options = {
      colorize: true,
      gap: 0,
      type: "standard",
      prettyObjects: true,
      ...options,
    };

    this.colors = {
      error: "\x1b[31m", // Red
      warn: "\x1b[33m", // Yellow
      info: "\x1b[36m", // Cyan
      debug: "\x1b[90m", // Gray
      reset: "\x1b[0m",
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
      gray: "\x1b[90m",
    };
  }

  write(logEntry: LogEntry): void {
    switch (this.options.type) {
      case "json":
        this.log_json(logEntry);
        break;
      case "detailed":
        this.log_detailed(logEntry);
        break;
      default:
        this.log_standard(logEntry);
    }
  }

  private log_standard(logEntry: LogEntry): void {
    const { timestamp, level, message, meta } = logEntry;
    let output = "";

    if (timestamp) {
      output += `[${timestamp}] `;
    }

    if (this.options.colorize) {
      output += `${
        this.colors[level as keyof typeof this.colors]
      }${level.toUpperCase()}${this.colors.reset}: ${message}`;
    } else {
      output += `${level.toUpperCase()}: ${message}`;
    }

    if (Object.keys(meta).length > 0) {
      output += "\nMetadata: ";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
    }

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    switch (level) {
      case "error":
        console.error(output);
        break;
      case "warn":
        console.warn(output);
        break;
      case "debug":
        console.debug(output);
        break;
      default:
        console.log(output);
    }
  }

  private log_json(logEntry: LogEntry): void {
    console.log(JSON.stringify(logEntry, null, 2));
    if (this.options.gap && this.options.gap > 0) {
      console.log("\n".repeat(this.options.gap));
    }
  }

  private log_detailed(logEntry: LogEntry): void {
    const { timestamp, level, message, meta } = logEntry;
    let output = "=".repeat(80) + "\n";

    if (timestamp) {
      output += `Timestamp: ${timestamp}\n`;
    }

    if (this.options.colorize) {
      output += `${this.colors[level as keyof typeof this.colors]}`;
    }

    output += `Level: ${level.toUpperCase()}\n`;
    output += `Message: ${message}\n`;

    if (this.options.colorize) {
      output += this.colors.reset;
    }

    if (Object.keys(meta).length > 0) {
      output += "Metadata:\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta, null, 2);
      output += "\n";
    }

    output += "=".repeat(80);

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    console.log(output);
  }

  private prettyPrintObject(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}
