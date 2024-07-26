const helpers = require("./helper");

function condenseMessage(message, caller, messLevel) {
  const timestamp = new Date().toLocaleTimeString("it-IT");
  const _levelColor = helpers.evaluateMessageLevel_CLI(messLevel);
  const _tsColor = helpers.cliColors.fg.white;

  if (caller === null) {
    return `${_tsColor}${helpers.cliColors.bright}${timestamp}${helpers.cliColors.reset} [ ${_levelColor}${helpers.cliColors.bright}${messLevel}${helpers.cliColors.reset} ]: ${message}`;
  }

  return `${_tsColor}${helpers.cliColors.bright}${timestamp}${helpers.cliColors.reset} ${caller} [ ${_levelColor}${helpers.cliColors.bright}${messLevel}${helpers.cliColors.reset} ]: ${message}`;
}

function detailedMessage(message, caller, messLevel) {
  const timestamp = new Date().toISOString();
  const _levelColor = helpers.evaluateMessageLevel_CLI(messLevel);
  const _tsColor = helpers.cliColors.fg.white;

  if (caller === null) {
    return `Timestamp: ${_tsColor}${helpers.cliColors.bright}${timestamp}${helpers.cliColors.reset}\n\t[ Level ]: [ ${_levelColor}${helpers.cliColors.bright}${messLevel}${helpers.cliColors.reset} ]\n\t[ Message ]: ${message}\n`;
  }

  return `Timestamp: ${_tsColor}${helpers.cliColors.bright}${timestamp}${helpers.cliColors.reset}\n\t[ Caller ]: ${caller}\n\t[ Level ]: [ ${_levelColor}${helpers.cliColors.bright}${messLevel}${helpers.cliColors.reset} ]\n\t[ Message ]: ${message}\n`;
}

function prettyMessage(message, caller, messLevel) {
  const _d = new Date();
  const time = _d.toLocaleTimeString("it-IT");
  const date = _d.toLocaleDateString("it-IT");
  const _levelColor = helpers.evaluateMessageLevel_CLI(messLevel);
  const _tsColor = helpers.cliColors.fg.white;
  const separator = "=".repeat(50);

  if (caller === null) {
    return `\n${separator}\n • Time: ${_tsColor}${helpers.cliColors.bright}${time}${helpers.cliColors.reset}\n • Date: ${_tsColor}${helpers.cliColors.bright}${date}${helpers.cliColors.reset}\n • Level: [ ${_levelColor}${helpers.cliColors.bright}${messLevel}${helpers.cliColors.reset} ]\n • Message: ${message}\n${separator}\n`;
  }

  return `\n${separator}\n • Time: ${_tsColor}${helpers.cliColors.bright}${time}${helpers.cliColors.reset}\n • Date: ${_tsColor}${helpers.cliColors.bright}${date}${helpers.cliColors.reset}\n • Caller: ${caller}\n • Level: [ ${_levelColor}${helpers.cliColors.bright}${messLevel}${helpers.cliColors.reset} ]\n • Message: ${message}\n${separator}\n`;
}

function importantMessage(message, caller, messLevel) {
  const _d = new Date();
  const time = _d.toLocaleTimeString("it-IT");
  const date = _d.toLocaleDateString("it-IT");
  const _levelColor = helpers.evaluateMessageLevel_CLI(messLevel);
  const _tsColor = helpers.cliColors.fg.white;
  const separator = `\n${"=".repeat(25)}||${
    helpers.cliColors.bg.red
  } IMPORTANT ${helpers.cliColors.reset}||${"=".repeat(25)}\n`;
  const separator2 = "=".repeat(64);

  return `${separator}\n ${condenseMessage(
    message,
    caller,
    messLevel
  )}\n ${separator2}`;
}

module.exports = {
  condenseMessage,
  detailedMessage,
  prettyMessage,
  importantMessage,
};
