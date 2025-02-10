import { TransportOptions, LogEntry } from "../types";
import * as fs from "fs";
import * as path from "path";

export class MarkdownTransport {
  private options: TransportOptions & { filepath: string; logTitle: string };

  constructor(options: TransportOptions & { logTitle?: string } = {}) {
    this.options = {
      filepath: "logs/output.md",
      type: "standard",
      prettyObjects: true,
      gap: 1,
      logTitle: "Application Logs",
      ...options,
    };

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create or clear the file and add title
    fs.writeFileSync(this.options.filepath, `# ${this.options.logTitle}\n\n`);
  }

  write(logEntry: LogEntry): void {
    switch (this.options.type) {
      case "standard":
        this.log_standard(logEntry);
        break;
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

  private prettyPrintObject(object: any): string {
    return JSON.stringify(object, null, 2);
  }

  private appendToFile(content: string): void {
    fs.appendFileSync(this.options.filepath, content + "\n");
  }

  private log_standard(logEntry: LogEntry): void {
    const { timestamp, level, caller, message, meta } = logEntry;
    let output = "## ";

    if (timestamp) {
      output += `[${timestamp}] `;
    }

    output += `${level.toUpperCase()}\n\n`;
    if (caller) {
      output += `**Caller:** ${caller}\n\n`;
    }

    output += `${message}\n`;

    if (Object.keys(meta).length > 0) {
      output += "\n### Metadata\n```json\n";
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

  private log_json(logEntry: LogEntry): void {
    let output = "## Log Entry\n\n```json\n";
    output += JSON.stringify(logEntry, null, 2);
    output += "\n```\n\n---\n";

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private log_detailed(logEntry: LogEntry): void {
    const { timestamp, level, caller, message, meta } = logEntry;
    let output = "## Log Details\n\n";

    if (timestamp) {
      output += `**Timestamp:** ${timestamp}\n\n`;
    }
    output += `**Level:** ${level.toUpperCase()}\n\n`;
    if (caller) {
      output += `**Caller:** ${caller}\n\n`;
    }
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
}
