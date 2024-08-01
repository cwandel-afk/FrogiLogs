const messageBuilder = require("./message-builder");
const helpers = require("./helper");

/**
 * Logger Class for creating readable logs for your browser or CLI
 * @class Logger
 * @
 */
class Logger {
  /**
   * Log a message to the console or browser
   * @param {string} message - The message to be logged
   * @param {string} messageType (optional) - The type of message to be logged (condensed, detailed, pretty, important)
   * @param {object} obj (optional) - The object to be logged (only used if messageType is json)
   */
  log(message, messageType = "condensed", obj = "") {
    const callerInfo = getCallerInfo();
    let _message = "";
    if (obj !== "") _message += messageBuilder.buildObjectLog(obj, message);
    else
      _message = messageBuilder.buildCommandLineMessage(
        message,
        callerInfo,
        messageType,
        "LOG"
      );
    console.log(_message);
  }

  /**
   * Log an error to the console or browser
   * @param {string} message - The message to be logged
   * @param {string} messageType (optional) - The type of message to be logged (condensed, detailed, pretty, important)
   * @param {object} obj (optional) - The object to be logged (only used if messageType is json)
   */
  error(message, messageType = "condensed", obj = "") {
    const callerInfo = getCallerInfo();
    let _message = "";
    if (obj !== "") _message += messageBuilder.buildObjectLog(obj, message);
    else
      _message = messageBuilder.buildCommandLineMessage(
        message,
        callerInfo,
        messageType,
        "ERROR"
      );
    console.error(_message);
  }

  /**
   * Log an information message to the console or browser
   * @param {string} message - The message to be logged
   * @param {string} messageType (optional) - The type of message to be logged (condensed, detailed, pretty, important)
   * @param {object} obj (optional) - The object to be logged (only used if messageType is json)
   */
  info(message, messageType = "condensed", obj = "") {
    const callerInfo = getCallerInfo();
    let _message = "";
    if (obj !== "") _message += messageBuilder.buildObjectLog(obj, message);
    else
      _message = messageBuilder.buildCommandLineMessage(
        message,
        callerInfo,
        messageType,
        "INFO"
      );
    console.info(_message);
  }

  /**
   * Log a warning to the console or browser
   * @param {string} message - The message to be logged
   * @param {string} messageType (optional) - The type of message to be logged (condensed, detailed, pretty, important)
   * @param {object} obj (optional) - The object to be logged (only used if messageType is json)
   */
  warn(message, messageType = "condensed", obj = "") {
    const callerInfo = getCallerInfo();
    let _message = "";
    if (obj !== "") _message += messageBuilder.buildObjectLog(obj, message);
    else
      _message = messageBuilder.buildCommandLineMessage(
        message,
        callerInfo,
        messageType,
        "WARN"
      );
    console.warn(_message);
  }

  
  /**
   * Log a group of messages to the console or browser
   * @param {string} groupLabel - The Label of the group you are logging
   * @param {string} messageType - The type of messages to be logged (condensed, detailed, pretty, important)
   * @param ...messages - 
   * each message can be: @type {string} @type {object} with the following structure:
   * @example { message: "Logging message!", level: "LOG" } 
   * @field Level - The level of the message ("ERROR", "WARN", "LOG", "INFO")
   */
  group(groupLabel, messageType, ...messages) {
    console.group(groupLabel);
    for (const message of messages) {
      if (typeof message === "object") {
        this.#logOnMessageLevel(message.message, message.level, messageType);
      } else {
        this.log(message, messageType);
      }
    }
    console.groupEnd();
  }

  /**
   * Log an object to the console or browser
   * @param {object} obj - The object to be logged in JSON format
   * @param {string} message (optional) - The message to be logged
   */
  logObject(obj, message = "") {
    console.log(messageBuilder.buildObjectLog(obj, message));
  }

  #logOnMessageLevel(message, messageLevel, messageType) {
    if (messageLevel === "ERROR") {
      this.error(message, messageType);
    } else if (messageLevel === "WARN") {
      this.warn(message, messageType);
    } else if (messageLevel === "LOG") {
      this.log(message, messageType);
    } else if (messageLevel === "INFO") {
      this.info(message, messageType);
    }
  }
}

function getCallerInfo() {
  const stack = new Error().stack ?? "";
  const stackLines = stack.split("\n");

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
