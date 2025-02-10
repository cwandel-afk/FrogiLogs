const ConsoleTransport = require("../transports/consoleTransport");

class Logger {
  constructor(options = {}) {
    // Default log levels with their priority
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };

    // Default options
    this.options = {
      level: "info",
      timestamp: true,
      traceCaller: false,
      ...options,
    };

    // Array to store active transports
    this.transports = [];
  }

  // Add a transport (console, file, browser, etc.)
  addTransport(transport) {
    this.transports.push(transport);
  }

  // Get information about where the log was called from
  getCaller() {
    const error = new Error();
    const stack = error.stack.split("\n");

    // Find the first non-logger call in the stack
    const callerLine =
      stack.find((line, index) => {
        return (
          index > 1 && !line.includes("Logger.") && !line.includes("/logger.js")
        );
      }) || "Unknown caller";

    // Parse the caller line to get useful information
    const callerInfo = callerLine
      .trim()
      .replace(/^at /, "") // Remove the 'at ' prefix
      .split(" ")[0]; // Get just the function/method name or file path

    switch (callerInfo) {
      case "Object.<anonymous>":
        return "Anonymous";
      case "new":
        return "Constructor";
      default:
        return callerInfo;
    }
  }

  // Create logging methods for each level
  log(level, message, meta = {}) {
    if (this.shouldLog(level)) {
      const logEntry = this.formatLogEntry(level, message, meta);
      this.writeToTransports(logEntry);
    }
  }

  // Check if we should log based on level priority
  shouldLog(level) {
    return this.levels[level] <= this.levels[this.options.level];
  }

  // Update formatLogEntry to include caller information
  formatLogEntry(level, message, meta) {
    return {
      timestamp: this.options.timestamp ? new Date().toISOString() : null,
      level,
      caller: this.getCaller(),
      message,
      meta,
    };
  }

  // Write to all active transports
  writeToTransports(logEntry) {
    if (this.transports.length === 0) {
      new ConsoleTransport().write(logEntry);
    } else {
      this.transports.forEach((transport) => {
        transport.write(logEntry);
      });
    }
  }
}

// Create convenience methods for each log level
["error", "warn", "info", "debug"].forEach((level) => {
  Logger.prototype[level] = function (message, meta, important = false) {
    if (important) {
      console.log("\n---------------- Important ----------------\n");
      this.log(level, message, meta);
      console.log("\n-----------------------------------------\n");
    } else {
      this.log(level, message, meta);
    }
  };
});

module.exports = Logger;
