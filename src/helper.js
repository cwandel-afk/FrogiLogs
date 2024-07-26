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

  if (str.startsWith("Object") || str.startsWith("<")) {
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

function buildCallerInfo(callerInfo) {
  let info = "";
  if (validateString(callerInfo.className)) {
    info += callerInfo.className + ".";
  }

  if (validateString(callerInfo.methodName)) {
    info += callerInfo.methodName;
  }

  if (validateString(info)) {
    const _callerColor = cliColors.fg.cyan;
    if (info.includes("."))
      return `[ ${_callerColor}${info}${cliColors.reset} ]`;
    else return `[ ${_callerColor}${info}()${cliColors.reset} ]`;
  }

  return null;
}

module.exports = {
  validateString,
  evaluateMessageLevel_CLI,
  evaluateMessageLevel_CLI_BG,
  cliColors,
  buildCallerInfo,
};
