const messageBuilder = require("./message-builder");
const helpers = require("./helper");

class Logger {
  log(message, messageType = 'condensed', obj = '') {
    const callerInfo = getCallerInfo();
    let _message = '';
    if(obj !== '') _message += messageBuilder.buildObjectLog(obj, message);
    else _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "LOG");
    console.log(_message);
  }

  error(message, messageType = 'condensed', obj = '') {
    const callerInfo = getCallerInfo();
    let _message = '';
    if(obj !== '') _message += messageBuilder.buildObjectLog(obj, message);
    else _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "ERROR");
    console.error(_message);
  }

  info(message, messageType = 'condensed', obj = '') {
    const callerInfo = getCallerInfo();
    let _message = '';
    if(obj !== '') _message += messageBuilder.buildObjectLog(obj, message);
    else _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "INFO");
    console.info(_message);
  }

  warn(message, messageType = 'condensed', obj = '') {
    const callerInfo = getCallerInfo();
    let _message = '';
    if(obj !== '') _message += messageBuilder.buildObjectLog(obj, message);
    else _message = messageBuilder.buildCommandLineMessage(message, callerInfo, messageType, "WARN");
    console.warn(_message);
  }

  // messages can contain {message, level} which will log differently
  group(groupLabel, messageType, ...messages) {
    console.group(groupLabel);
    for (const message of messages) {
      if (typeof message === 'object') {
        this.#logOnMessageLevel(message.message, message.level, messageType)
      }
      else {
        this.log(message, messageType)
      }
    }
    console.groupEnd();
  }

  logObject(obj, message = '') {
    console.log(messageBuilder.buildObjectLog(obj, message));
  }

  #logOnMessageLevel(message, messageLevel, messageType) {
    if (messageLevel === 'ERROR') {
      this.error(message, messageType);
    } else if (messageLevel === 'WARN') {
      this.warn(message, messageType);
    } else if (messageLevel === 'LOG') {
      this.log(message, messageType);
    } else if (messageLevel === 'INFO') {
      this.info(message, messageType);
    }
  }
  /* logToFile(message) { //TODO: implement logging to files AFTER NORMAL LOGGING
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
  } */
}

function getCallerInfo() {
  const stack = new Error().stack ?? "";
  const stackLines = stack.split("\n");

  // Depending on the environment (Node.js, browser, etc.), we may need to adjust this parsing.
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
