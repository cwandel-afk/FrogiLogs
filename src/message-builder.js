const messageTypes = ["condensed", "detailed", "pretty", "important"];
const cliColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
  },

  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
};

class MessageBuilder {
  buildCommandLineMessage(message, callerInfo, messType, messLevel) {
    if (!messageTypes.includes(messType)) {
      throw new Error(
        `Invalid log type: ${messType} \n\n Types: (default)condensed, detailed, pretty, important`
      );
    }

    if (!validateString(message)) {
      return "";
    }

    let _message = "";
    let _callerInfo = this.#buildCallerInfo(callerInfo);

    if(messType === 'condensed')
        _message = this.#condenseMessage(message, _callerInfo, messLevel);
    else if(messType === 'detailed'){
        _message = this.#detailedMessage(message, _callerInfo, messLevel);
    }
    else if(messType === 'pretty'){
        _message = this.#prettyMessage(message, _callerInfo, messLevel);
    }
    else if(messType === 'important'){
        _message = this.#importantMessage(message, _callerInfo, messLevel);
    }

    return _message;
  }

  buildBrowserMessage(message) {}

  #buildCallerInfo(callerInfo) {
    let info = "";
    if (validateString(callerInfo.className)) {
      info += callerInfo.className + ".";
    }

    if (validateString(callerInfo.methodName)) {
      info += callerInfo.methodName;
    }

    if (validateString(info)) {
      const _callerColor = cliColors.fg.cyan;
      if(info.includes("."))
        return `[ ${_callerColor}${info}${cliColors.reset} ]`;
      else 
        return `[ ${_callerColor}${info}()${cliColors.reset} ]`;
    }

    return null;
  }

  #condenseMessage(message, caller, messLevel) {
    const timestamp = new Date().toLocaleTimeString("it-IT");
    const _levelColor = evaluateMessageLevel_CLI(messLevel);
    const _tsColor = cliColors.fg.white;

    if(caller === null) {
        return `${_tsColor}${cliColors.bright}${timestamp}${cliColors.reset} [ ${_levelColor}${cliColors.bright}${messLevel}${cliColors.reset} ]: ${message}`;
    }

    return `${_tsColor}${cliColors.bright}${timestamp}${cliColors.reset} ${caller} [ ${_levelColor}${cliColors.bright}${messLevel}${cliColors.reset} ]: ${message}`;
  }

  #detailedMessage(message, caller, messLevel) {
    const timestamp = new Date().toISOString();
    const _levelColor = evaluateMessageLevel_CLI(messLevel);
    const _tsColor = cliColors.fg.white;

    if(caller === null) {
        return `Timestamp: ${_tsColor}${cliColors.bright}${timestamp}${cliColors.reset}\n\t[ Level ]: [ ${_levelColor}${cliColors.bright}${messLevel}${cliColors.reset} ]\n\t[ Message ]: ${message}\n`;
    }

    return `Timestamp: ${_tsColor}${cliColors.bright}${timestamp}${cliColors.reset}\n\t[ Caller ]: ${caller}\n\t[ Level ]: [ ${_levelColor}${cliColors.bright}${messLevel}${cliColors.reset} ]\n\t[ Message ]: ${message}\n`;
  }

  #prettyMessage(message, caller, messLevel) {
    const _d = new Date();
    const time = _d.toLocaleTimeString("it-IT");
    const date = _d.toLocaleDateString("it-IT");
    const _levelColor = evaluateMessageLevel_CLI(messLevel);
    const _tsColor = cliColors.fg.white;
    const separator = "=".repeat(50);

    if(caller === null) {
        return `\n${separator}\n • Time: ${_tsColor}${cliColors.bright}${time}${cliColors.reset}\n • Date: ${_tsColor}${cliColors.bright}${date}${cliColors.reset}\n • Level: [ ${_levelColor}${cliColors.bright}${messLevel}${cliColors.reset} ]\n • Message: ${message}\n${separator}\n`
    }

    return `\n${separator}\n • Time: ${_tsColor}${cliColors.bright}${time}${cliColors.reset}\n • Date: ${_tsColor}${cliColors.bright}${date}${cliColors.reset}\n • Caller: ${caller}\n • Level: [ ${_levelColor}${cliColors.bright}${messLevel}${cliColors.reset} ]\n • Message: ${message}\n${separator}\n`
  }

  #importantMessage(message, caller, messLevel) {
    const _d = new Date();
    const time = _d.toLocaleTimeString("it-IT");
    const date = _d.toLocaleDateString("it-IT");
    const _levelColor = evaluateMessageLevel_CLI(messLevel);
    const _tsColor = cliColors.fg.white;
    const separator = `\n${"=".repeat(25)}||${cliColors.bg.red} IMPORTANT ${cliColors.reset}||${"=".repeat(25)}\n`;
    const separator2 = "=".repeat(64);

    return `${separator}\n ${this.#condenseMessage(message, caller, messLevel)}\n ${separator2}`

  }
}

function validateString(str) {
  if (str === undefined || str === null) {
    return false;
  }

  if (str.trim() === "") {
    return false;
  }

  if (typeof str !== "string") {
    return false;
  }

  if(str.startsWith("Object") || str.startsWith("<")){
    return false;
  }

  return true;
}

function evaluateMessageLevel_CLI(level) {
  if (level === "INFO") {
    return cliColors.fg.green;
  } else if (level === "WARN") {
    return cliColors.fg.yellow;
  } else if (level === "ERROR") {
    return cliColors.fg.red;
  } else if (level === "LOG") {
    return cliColors.fg.blue;
  } else {
    return cliColors.fg.white;
  }
}

function evaluateMessageLevel_CLI_BG(level) {
    if (level === "INFO") {
      return cliColors.bg.green;
    } else if (level === "WARN") {
      return cliColors.bg.yellow;
    } else if (level === "ERROR") {
      return cliColors.bg.red;
    } else if (level === "LOG") {
      return cliColors.bg.blue;
    } else {
      return cliColors.bg.white;
    }
  }

// Export MessageBuilder class for Node.js logs
module.exports = new MessageBuilder();
