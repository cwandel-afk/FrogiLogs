import { TransportOptions, LogEntry } from "../types";
import * as fs from "fs";
import * as path from "path";

export class HTMLTransport {
  private options: TransportOptions & { filepath: string; styles?: string };
  private entryCount: number;
  private initialized: boolean;

  constructor(
    options: TransportOptions & { filepath?: string; styles?: string }
  ) {
    this.options = {
      type: "standard",
      prettyObjects: true,
      gap: 1,
      filepath: options.filepath || "logs/output.html",
      styles: options.styles || this.getDefaultStyles(),
    };

    this.entryCount = 0;
    this.initialized = false;

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Initialize the HTML file
    this.initializeFile();
  }

  write(logEntry: LogEntry): void {
    this.entryCount++;
    const { timestamp, level, message, meta } = logEntry;
    let output = `
      <div class="log-entry ${level.toUpperCase()}">
        <div class="log-content">
          <div class="log-details">
            ${timestamp ? `<strong>Time:</strong> ${timestamp} |` : ""}
            <strong>Level:</strong> ${level.toUpperCase()}
          </div>
          <div class="log-message">${message}</div>
        </div>
    `;

    if (Object.keys(meta).length > 0) {
      output += `
        <div class="meta-container">
          <div id="meta-${this.entryCount}" class="metadata">
            ${this.prettifyMeta(meta)}
          </div>
          <button class="toggle-meta" onclick="toggleMetadata(${
            this.entryCount
          })">
            Toggle Details
          </button>
        </div>
      `;
    }

    output += `</div>`;
    this.appendToFile(output);
  }

  private initializeFile(): void {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Log Output</title>
    <style>
        ${this.options.styles}
    </style>
    <script>
        function toggleMetadata(id) {
            const meta = document.getElementById('meta-' + id);
            meta.style.display = meta.style.display === 'none' ? 'block' : 'none';
        }
    </script>
</head>
<body>
    <div id="log-container">
`;

    fs.writeFileSync(this.options.filepath, html);
    this.initialized = true;
  }

  private getDefaultStyles(): string {
    return `
      body { font-family: Arial, sans-serif; padding: 20px; }
      .log-entry { margin-bottom: 20px; padding: 10px; border-radius: 4px; }
      .ERROR { background-color: #ffebee; }
      .WARN { background-color: #fff3e0; }
      .INFO { background-color: #e3f2fd; }
      .DEBUG { background-color: #f5f5f5; }
      .metadata { display: none; background: #fafafa; padding: 10px; margin-top: 10px; }
      .toggle-meta { 
          cursor: pointer; 
          background: none;
          border: none;
          color: blue;
          text-decoration: underline;
          padding: 0;
          margin-top: 10px;
      }
    `;
  }

  private prettifyMeta(meta: any): string {
    return `<pre>${JSON.stringify(meta, null, 2)}</pre>`;
  }

  private appendToFile(content: string): void {
    if (!this.initialized) {
      this.initializeFile();
    }
    fs.appendFileSync(this.options.filepath, content + "\n");
  }
}
