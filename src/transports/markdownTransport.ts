import { TransportOptions, LogEntry } from "../types";
import * as fs from "fs";
import * as path from "path";

export class MarkdownTransport {
  private options: TransportOptions & {
    filepath: string;
    logTitle?: string;
  };

  constructor(
    options: TransportOptions & {
      filepath?: string;
      logTitle?: string;
    }
  ) {
    this.options = {
      type: "standard",
      prettyObjects: true,
      gap: 1,
      filepath: options.filepath || "logs/output.md",
      logTitle: options.logTitle || "Application Logs",
    };

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Initialize file with title
    fs.writeFileSync(this.options.filepath, `# ${this.options.logTitle}\n\n`);
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

    // Create the main log line with all basic info
    const logLine = [
      timestamp ? `**Time:** ${timestamp}` : null,
      `**Level:** ${level.toUpperCase()}`,
      `**Message:** ${message}`,
    ]
      .filter(Boolean)
      .join(" | ");

    output += `${logLine}\n`;

    // Add metadata if it exists
    if (Object.keys(meta).length > 0) {
      output += "\n```json\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
      output += "\n```\n";
    }

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    output += "\n---\n\n";
    this.appendToFile(output);
  }

  private log_json(logEntry: LogEntry): void {
    let output = "```json\n";
    output += JSON.stringify(logEntry, null, 2);
    output += "\n```\n\n---\n\n";

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private log_detailed(logEntry: LogEntry): void {
    const { timestamp, level, message, meta } = logEntry;
    let output = "## Log Details\n\n";

    if (timestamp) {
      output += `**Timestamp:** ${timestamp}\n\n`;
    }
    output += `**Level:** ${level.toUpperCase()}\n\n`;
    output += `**Message:** ${message}\n\n`;

    if (Object.keys(meta).length > 0) {
      output += "### Metadata\n```json\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
      output += "\n```\n";
    }

    output += "\n---\n";

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private prettyPrintObject(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  private appendToFile(content: string): void {
    fs.appendFileSync(this.options.filepath, content);
  }
}
