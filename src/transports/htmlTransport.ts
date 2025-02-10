import { TransportOptions, LogEntry } from "../types";
import * as fs from "fs";
import * as path from "path";

export class HTMLTransport {
  private options: TransportOptions & { logTitle: string };
  private entryCount: number = 0;

  constructor(options: TransportOptions & { logTitle?: string } = {}) {
    this.options = {
      filepath: "logs/output.html",
      type: "standard",
      prettyObjects: true,
      gap: 1,
      logTitle: "Application Logs",
      styles: `
        body { font-family: Arial, sans-serif; padding: 20px; }
        .log-entry { margin-bottom: 20px; padding: 10px; border-radius: 4px; }
        .ERROR { background-color: #ffebee; }
        .WARN { background-color: #fff3e0; }
        .INFO { background-color: #e3f2fd; }
        .DEBUG { background-color: #f5f5f5; }
        .metadata { background: #fafafa; padding: 10px; margin-top: 10px; }
      `,
      ...options,
    };

    const dir = path.dirname(this.options?.filepath || "logs/output.html");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const htmlHeader = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${this.options.logTitle}</title>
          <style>${this.options.styles}</style>
        </head>
        <body>
          <h1>${this.options.logTitle}</h1>
    `;

    fs.writeFileSync(this.options.filepath || "logs/output.html", htmlHeader);
  }

  write(logEntry: LogEntry): void {
    this.entryCount++;
    const { timestamp, level, caller, message, meta } = logEntry;
    let output = `<div class="log-entry ${level.toUpperCase()}">`;

    if (timestamp) {
      output += `<strong>Time:</strong> ${timestamp} | `;
    }

    output += `<strong>Level:</strong> ${level.toUpperCase()}`;

    if (caller) {
      output += ` | <strong>Caller:</strong> ${caller}`;
    }

    output += `<br/><strong>Message:</strong> ${message}`;

    if (Object.keys(meta).length > 0) {
      output += `<div class="metadata">`;
      output += `<pre>${this.prettifyMeta(meta)}</pre>`;
      output += `</div>`;
    }

    output += "</div>";

    if (this.options.gap && this.options.gap > 0) {
      output += "<br>".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  private prettifyMeta(meta: any): string {
    return this.options.prettyObjects
      ? JSON.stringify(meta, null, 2)
      : JSON.stringify(meta);
  }

  private appendToFile(content: string): void {
    fs.appendFileSync(this.options.filepath || "logs/output.html", content);
  }

  close(): void {
    fs.appendFileSync(
      this.options.filepath || "logs/output.html",
      "\n</body></html>"
    );
  }
}
