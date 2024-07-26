const messageBuilder = require("./message-builder");

class Logger {
  log(message, messageType = 'condensed') {
    const callerInfo = getCallerInfo();
    let _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "LOG")
    console.log(_message);
    //this.#logToBrowserConsole(message);
    //TODO: Browser Message
  }

  error(message, messageType = 'condensed') {
    const callerInfo = getCallerInfo();
    let _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "ERROR")
    console.error(_message);
    //this.#errorToBrowserConsole(message);
  }

  info(message, messageType = 'condensed') {
    const callerInfo = getCallerInfo();
    let _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "INFO")
    console.info(_message);
    //this.#infoToBrowserConsole(message);
  }

  warn(message, messageType = 'condensed') {
    const callerInfo = getCallerInfo();
    let _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "WARN")
    console.warn(_message);
    //this.#warnToBrowserConsole(message);
  }

  logObject(obj, message = '') {
    console.log(messageBuilder.buildObjectLog(obj, message));
  }

  #logToBrowserConsole(message) {
    if (typeof window !== "undefined" && window.console) {
      window.console.log(message);
    }
  }

  #errorToBrowserConsole(message) {
    if (typeof window !== "undefined" && window.console) {
      window.console.error(message);
    }
  }

  #infoToBrowserConsole(message) {
    if (typeof window !== "undefined" && window.console) {
      window.console.info(message);
    }
  }

  #warnToBrowserConsole(message) {
    if (typeof window !== "undefined" && window.console) {
      window.console.warn(message);
    }
  }

  logToFile(message) { //TODO: implement logging to files AFTER NORMAL LOGGING
    if (typeof window !== "undefined") {
      alert("File logging is not supported in the browser.");
    } else {
      const fs = require("fs");
      const path = require("path");
      const logFilePath = path.resolve(__dirname, "log.txt");
      fs.appendFileSync(
        logFilePath,
        `${new Date().toISOString()} - ${message}\n`
      );
    }
  }
}

function getCallerInfo() {
  const stack = new Error().stack ?? "";
  const stackLines = stack.split("\n");

  // Depending on the environment (Node.js, browser, etc.), you may need to adjust this parsing.
  // This example assumes a typical stack trace format.
  const callerLine = stackLines[3]; // This should point to the caller function
  const matched = callerLine.match(/at (\S+) \(([^)]+)\)/);

  if (matched && matched.length > 1) {
    const fullMethodName = matched[1];
    const parts = fullMethodName.split(".");
    const methodName = parts.pop();
    const className = parts.pop();
    return { methodName: methodName || "", className: className || "" };
  }

  return { methodName: "", className: "" };
}

// Export Logger class for Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = Logger;
}

// Attach Logger to the window object for the browser
if (typeof window !== "undefined") {
  window.Logger = Logger;
}
//TODO: Create object parser to output JSON nicely
