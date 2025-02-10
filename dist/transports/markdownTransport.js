const fs = require("fs");
const path = require("path");

class MarkdownTransport {
  constructor(options = {}) {
    this.options = {
      colorize: false, // Markdown doesn't support console colors
      gap: 0,
      type: "standard",
      prettyObjects: true,
      filepath: "logs/output.md", // Default filepath
      logTitle: "Application Logs",
      ...options,
    };

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create or clear the file
    fs.writeFileSync(this.options.filepath, `# ${this.options.logTitle}\n\n`);
  }

  write(logEntry) {
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

  prettyPrintObject(object) {
    return JSON.stringify(object, null, 2);
  }

  appendToFile(content) {
    fs.appendFileSync(this.options.filepath, content + "\n");
  }

  log_standard(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;

    let output = "";

    // Create the main log line with all basic info
    const logLine = [
      timestamp ? `**Time:** ${timestamp}` : null,
      caller ? `**Caller:** ${caller}` : null,
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

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    output += "\n---\n\n";
    this.appendToFile(output);
  }

  log_json(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;
    const logObject = {
      timestamp,
      level,
      caller,
      message,
      meta,
    };

    let output = "```json\n";
    output += this.options.prettyObjects
      ? this.prettyPrintObject(logObject)
      : JSON.stringify(logObject);
    output += "\n```\n\n---\n\n";

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  log_detailed(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;

    let output = "";
    output += `### ${level.toUpperCase()}: ${message}\n\n`;

    if (timestamp) {
      output += `- **Timestamp:** ${timestamp}\n`;
    }

    output += `- **Level:** ${level.toUpperCase()}\n`;
    output += `- **Caller:** ${caller}\n`;
    output += `- **Message:** ${message}\n\n`;

    if (Object.keys(meta).length > 0) {
      output += "### Metadata\n\n```json\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
      output += "\n```\n";
    }

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    output += "\n---\n\n";
    this.appendToFile(output);
  }
}

module.exports = MarkdownTransport;
