class ConsoleTransport {
  constructor(options = {}) {
    this.options = {
      colorize: true,
      gap: 0,
      type: "standard",
      prettyObjects: false,
      ...options,
    };

    // ANSI color codes for different levels
    this.colors = {
      error: "\x1b[31m", // Red
      warn: "\x1b[33m", // Yellow
      info: "\x1b[36m", // Cyan
      debug: "\x1b[90m", // Gray
      reset: "\x1b[0m", // Reset
    };
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

  log_standard(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;

    let output = "";

    // Add timestamp if exists
    if (timestamp) {
      output += `[${timestamp}] `;
    }

    // Add caller information
    output += `(${caller}) `;

    // Format the log message
    const logMessage = `${level.toUpperCase()}: ${message}`;

    // Add colors if enabled
    if (this.options.colorize) {
      output += `${this.colors[level]}${logMessage}${this.colors.reset}`;
    } else {
      output += logMessage;
    }

    if (this.options.prettyObjects) {
      let prettyObj = this.prettyPrintObject(meta);
      if (this.options.colorize) {
        prettyObj = prettyObj.replace(
          /"([^"]+)":/g,
          `${this.colors[level]}"$1"${this.colors.reset}:`
        );
        output += ` \n${prettyObj}`;
      } else {
        output += ` ${prettyObj}`;
      }
    } else {
      if (Object.keys(meta).length > 0) {
        output += ` ${JSON.stringify(meta)}`;
      }
    }

    if (this.options.gap > 0) {
      output += "\n".repeat(this.options.gap);
    }

    // Use appropriate console method
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

  log_json(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;
    const logObject = {
      timestamp,
      level,
      caller,
      message,
      meta,
    };

    let output = JSON.stringify(logObject);

    if (this.options.prettyObjects) {
      output = this.prettyPrintObject(JSON.parse(output));
    }

    if (this.options.colorize) {
      output = output.replace(
        /"([^"]+)":/g,
        `${this.colors[level]}"$1"${this.colors.reset}:`
      );
    }

    if (this.options.gap > 0) {
      output = output.replace(/\n/g, "\n".repeat(this.options.gap));
    }

    console.log(output);
  }

  log_detailed(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;

    // Create box-drawing characters
    const boxChars = {
      horizontal: "─",
      divider: "─",
    };

    // Calculate the maximum width needed
    const contentWidth = 80;
    const padding = 2;

    // Helper function to create horizontal lines
    const createLine = () => boxChars.divider.repeat(contentWidth);

    // Helper function to create content line
    const createContentLine = (label, content) => {
      const labelStr = `${label}: `;
      const contentStr =
        typeof content === "object"
          ? this.options.prettyObjects
            ? this.prettyPrintObject(content)
            : JSON.stringify(content)
          : String(content);

      let output = `${labelStr.padEnd(12)}${contentStr}`;
      return output;
    };

    // Build the output
    let output = [];
    output.push(createLine());

    // Add timestamp
    if (timestamp) {
      output.push(createContentLine("Timestamp", timestamp));
      output.push(createLine());
    }

    // Add level (with color if enabled)
    const levelStr = this.options.colorize
      ? `${this.colors[level]}${level.toUpperCase()}${this.colors.reset}`
      : level.toUpperCase();
    output.push(createContentLine("Level", levelStr));
    output.push(createLine());

    // Add caller
    output.push(createContentLine("Caller", caller));
    output.push(createLine());

    // Add message
    output.push(createContentLine("Message", message));

    // Add meta if it exists
    if (Object.keys(meta).length > 0) {
      output.push(createLine());
      output.push(createContentLine("Meta", meta));
    }

    output.push(createLine());

    // Join all lines
    let finalOutput = output.join("\n");

    // Output to console
    console.log(finalOutput);
  }
}

module.exports = ConsoleTransport;
