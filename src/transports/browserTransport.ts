import { TransportOptions, LogEntry } from "../types";

export class BrowserTransport {
  private options: TransportOptions;
  private styles: {
    error: string;
    warn: string;
    info: string;
    debug: string;
    timestamp: string;
    meta: string;
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

    this.styles = {
      error: "color: #D32F2F; font-weight: bold",
      warn: "color: #F57C00; font-weight: bold",
      info: "color: #1976D2; font-weight: bold",
      debug: "color: #616161; font-weight: bold",
      timestamp: "color: #616161",
      meta: "color: #616161",
      black: "color: black",
      red: "color: #D32F2F",
      green: "color: #388E3C",
      yellow: "color: #F57C00",
      blue: "color: #1976D2",
      magenta: "color: #C2185B",
      cyan: "color: #0097A7",
      white: "color: #FAFAFA",
      gray: "color: #616161",
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
    const style = this.styles[level.toLowerCase() as keyof typeof this.styles];

    if (this.options.colorize) {
      console.group("%c" + level.toUpperCase(), style);
    } else {
      console.group(level.toUpperCase());
    }

    if (timestamp) {
      console.log(
        "%cTimestamp:%c %s",
        this.styles.timestamp,
        "color: inherit",
        timestamp
      );
    }

    console.log(message);

    if (Object.keys(meta).length > 0) {
      console.log(
        "%cMetadata:",
        this.styles.meta,
        this.options.prettyObjects ? meta : JSON.stringify(meta)
      );
    }

    console.groupEnd();

    if (this.options.gap && this.options.gap > 0) {
      console.log("\n".repeat(this.options.gap));
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
    const style = this.styles[level.toLowerCase() as keyof typeof this.styles];

    console.group("%c=== DETAILED LOG ===", this.styles.gray);

    if (timestamp) {
      console.log(
        "%cTimestamp:%c %s",
        this.styles.timestamp,
        "color: inherit",
        timestamp
      );
    }

    console.log("%cLevel:%c %s", style, "color: inherit", level.toUpperCase());
    console.log("%cMessage:%c %s", style, "color: inherit", message);

    if (Object.keys(meta).length > 0) {
      console.group("%cMetadata:", this.styles.meta);
      console.log(
        this.options.prettyObjects ? meta : JSON.stringify(meta, null, 2)
      );
      console.groupEnd();
    }

    console.log("%c" + "=".repeat(80), this.styles.gray);
    console.groupEnd();

    if (this.options.gap && this.options.gap > 0) {
      console.log("\n".repeat(this.options.gap));
    }
  }
}
