const fs = require("fs");
const path = require("path");

class FileTransport {
  constructor(options = {}) {
    this.options = {
      filepath: "logs/output.txt",
      type: "standard",
      prettyObjects: true,
      gap: 1,
      timestamp: true,
      ...options,
    };

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create or clear the file
    fs.writeFileSync(this.options.filepath, "");
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

    // Add timestamp if exists
    if (timestamp) {
      output += `[${timestamp}] `;
    }

    // Add level and caller
    output += `[${level.toUpperCase()}] `;
    if (caller) {
      output += `(${caller}) `;
    }

    // Add message
    output += message;

    // Add metadata if it exists
    if (Object.keys(meta).length > 0) {
      output += "\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
    }

    // Add separator
    output += "\n" + "-".repeat(80);

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

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

    let output = this.options.prettyObjects
      ? this.prettyPrintObject(logObject)
      : JSON.stringify(logObject);

    output += "\n" + "-".repeat(80);

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }

  log_detailed(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;
    let output = "";

    output += "=".repeat(80) + "\n";
    output += `Level: ${level.toUpperCase()}\n`;
    if (timestamp) {
      output += `Time: ${timestamp}\n`;
    }
    if (caller) {
      output += `Caller: ${caller}\n`;
    }
    output += `Message: ${message}\n`;

    if (Object.keys(meta).length > 0) {
      output += "\nMetadata:\n";
      output += this.options.prettyObjects
        ? this.prettyPrintObject(meta)
        : JSON.stringify(meta);
    }

    output += "\n" + "=".repeat(80);

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    this.appendToFile(output);
  }
}

module.exports = FileTransport;
