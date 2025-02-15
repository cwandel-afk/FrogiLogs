import { TransportOptions, LogEntry } from "../types";
import * as fs from "fs";
import * as path from "path";

export class FileTransport {
  private options: TransportOptions & { filepath: string };

  constructor(options: TransportOptions & { filepath?: string }) {
    this.options = {
      type: "standard",
      prettyObjects: true,
      gap: 1,
      filepath: options.filepath || "logs/output.txt",
    };

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create or clear the file
    fs.writeFileSync(this.options.filepath, "");
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

    output += `[${level.toUpperCase()}] `;
    output += message;

    if (Object.keys(meta).length > 0) {
      output += "\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
    }

    output += "\n" + "-".repeat(80);

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private log_json(logEntry: LogEntry): void {
    let output = JSON.stringify(logEntry, null, 2);
    output += "\n" + "-".repeat(80);

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private log_detailed(logEntry: LogEntry): void {
    const { timestamp, level, message, meta } = logEntry;
    let output = "=".repeat(80) + "\n";

    if (timestamp) {
      output += `Timestamp: ${timestamp}\n`;
    }
    output += `Level: ${level.toUpperCase()}\n`;
    output += `Message: ${message}\n`;

    if (Object.keys(meta).length > 0) {
      output += "Metadata:\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
      output += "\n";
    }

    output += "=".repeat(80);

    if (this.options.gap && this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private prettyPrintObject(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  private appendToFile(content: string): void {
    fs.appendFileSync(this.options.filepath, content + "\n");
  }
}
