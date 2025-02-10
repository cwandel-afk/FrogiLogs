class BrowserTransport {
  constructor(options = {}) {
    this.options = {
      colorize: true,
      gap: 0,
      type: "standard",
      prettyObjects: false,
      ...options,
    };

    // CSS styles for different levels
    this.styles = {
      error: "color: #ff0000; font-weight: bold", // Red
      warn: "color: #ffa500; font-weight: bold", // Orange
      info: "color: #00bcd4; font-weight: bold", // Cyan
      debug: "color: #9e9e9e; font-weight: bold", // Gray
      timestamp: "color: #e3e3e3; font-weight: bold",
      caller: "color:rgb(224, 59, 222); font-weight: bold",
      meta: "color:rgb(169, 221, 240); font-weight: bold",

      // Text colors
      black: "color: #000000",
      red: "color: #ff0000",
      green: "color: #4caf50",
      yellow: "color: #ffeb3b",
      blue: "color: #2196f3",
      magenta: "color: #e91e63",
      cyan: "color: #00bcd4",
      white: "color: #ffffff",
      gray: "color: #9e9e9e",
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
    let styles = [];

    let log = "";
    if (timestamp) {
      if (this.options.colorize) {
        styles.push(this.styles.timestamp);
      } else {
        styles.push("font-weight: bold");
      }
      log += `%c [ ${timestamp} ] `;
    }

    if (caller) {
      if (this.options.colorize) {
        styles.push(this.styles.caller);
      } else {
        styles.push("font-weight: bold");
      }

      log += `%c [ ${caller} ] `;
    }

    if (this.options.colorize) {
      styles.push(this.styles[level], "");
    } else {
      styles.push("font-weight: bold", "");
    }

    log += `%c ${level.toUpperCase()}%c: ${message}`;

    // Add metadata if it exists
    if (Object.keys(meta).length > 0) {
      if (this.options.prettyObjects) {
        log += `\n\n${JSON.stringify(meta, null, 2)}`;
      } else {
        log += `\n${JSON.stringify(meta)}`;
      }
    }

    // Add color to meta keys if colorize is true
    if (this.options.colorize) {
      const metaKeys = Object.keys(meta);
      metaKeys.forEach((key) => {
        styles.push(this.styles.meta, "");
      });

      // Split log into pre-meta and meta sections
      const metaStart = this.options.prettyObjects
        ? log.lastIndexOf("\n\n")
        : log.lastIndexOf("\n");
      if (metaStart !== -1) {
        const preMeta = log.substring(0, metaStart);
        let metaPart = log.substring(metaStart);

        // Only colorize keys in the meta section
        metaKeys.forEach((key) => {
          if (this.options.prettyObjects) {
            metaPart = metaPart.replace(
              new RegExp(`"(${key})"(?=\\s*:)`, "g"),
              `%c"$1"%c`
            );
          } else {
            metaPart = metaPart.replace(`"${key}"`, `%c"${key}"%c`);
          }
        });

        log = preMeta + metaPart;
      }
    }

    // Use appropriate console method with styling
    switch (level) {
      case "error":
        console.error(log, ...styles);
        break;
      case "warn":
        console.warn(log, ...styles);
        break;
      case "debug":
        console.debug(log, ...styles);
        break;
      default:
        console.log(log, ...styles);
    }

    // Add gap if specified
    if (this.options.gap > 0) {
      console.log("\n".repeat(this.options.gap));
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

    let log = "";
    let styles = [];

    if (this.options.prettyObjects) {
      log = this.prettyPrintObject(logObject);
    } else {
      log = JSON.stringify(logObject);
    }

    if (this.options.colorize) {
      // Find all keys in the logObject
      const keys = Object.keys(logObject);
      keys.forEach((key) => {
        log = log.replace(new RegExp(`"${key}"`, "g"), `%c"${key}"%c`);
        styles.push(this.styles.timestamp, "");
      });

      const metaKeys = Object.keys(logObject.meta);
      metaKeys.forEach((key) => {
        log = log.replace(new RegExp(`"${key}"`, "g"), `%c"${key}"%c`);
        styles.push(this.styles.meta, "");
      });
    }

    // Use appropriate console method with styling
    switch (level) {
      case "error":
        console.error(log, ...styles);
        break;
      case "warn":
        console.warn(log, ...styles);
        break;
      case "debug":
        console.debug(log, ...styles);
        break;
      default:
        console.log(log, ...styles);
    }

    // Add gap if specified
    if (this.options.gap > 0) {
      console.log("\n".repeat(this.options.gap));
    }
  }

  log_detailed(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;

    // Create styled groups for detailed view
    console.groupCollapsed(
      `%c${level.toUpperCase()}: ${message}`,
      this.styles[level]
    );

    // Log timestamp if exists
    if (timestamp) {
      console.log("%cTimestamp:%c %s", "font-weight: bold", "", timestamp);
    }

    // Log caller
    console.log("%cCaller:%c %s", "font-weight: bold", "", caller);

    // Log message
    console.log("%cMessage:%c %s", "font-weight: bold", "", message);

    // Log meta if it exists
    if (Object.keys(meta).length > 0) {
      console.log("%cMeta:%c", "font-weight: bold", "");
      if (this.options.prettyObjects) {
        console.log(meta);
      } else {
        console.log(JSON.stringify(meta, null, 2));
      }
    }

    console.groupEnd();

    // Add gap if specified
    if (this.options.gap > 0) {
      console.log("\n".repeat(this.options.gap));
    }
  }
}

module.exports = BrowserTransport;
