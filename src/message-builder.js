const helpers = require("./helper");
const messageCLI = require("./message-cli");
const messageTypes = ["condensed", "detailed", "pretty", "important"];

class MessageBuilder {
  buildCommandLineMessage(message, callerInfo, messType, messLevel) {
    if (!messageTypes.includes(messType)) {
      throw new Error(
        `Invalid log type: ${messType} \n\n Types: (default)condensed, detailed, pretty, important`
      );
    }

    if (!helpers.validateString(message)) {
      return "";
    }

    let _message = "";
    let _callerInfo = helpers.buildCallerInfo(callerInfo);

    if(messType === 'condensed')
        _message = messageCLI.condenseMessage(message, _callerInfo, messLevel);
    else if(messType === 'detailed'){
        _message = messageCLI.detailedMessage(message, _callerInfo, messLevel);
    }
    else if(messType === 'pretty'){
        _message = messageCLI.prettyMessage(message, _callerInfo, messLevel);
    }
    else if(messType === 'important'){
        _message = messageCLI.importantMessage(message, _callerInfo, messLevel);
    }

    return _message;
  }

  buildBrowserMessage(message) {}

  buildObjectLog(obj, message) {
    let level = 1;
    const colors = {
      1: helpers.cliColors.fg.cyan, 
      2: helpers.cliColors.fg.blue, 
      3: helpers.cliColors.fg.green, 
      4: helpers.cliColors.fg.yellow, 
      5: helpers.cliColors.fg.red,
      6: helpers.cliColors.fg.magenta,
      7: helpers.cliColors.fg.cyan,
      8: helpers.cliColors.fg.blue,
      9: helpers.cliColors.fg.green,
      10: helpers.cliColors.fg.yellow,
      11: helpers.cliColors.fg.red,
      12: helpers.cliColors.fg.magenta,
      reset: helpers.cliColors.reset 
    };

    const indent = (level) => '   '.repeat(level);

    const formatObject = (obj, level) => {
      if (typeof obj !== 'object' || obj === null) {
        return JSON.stringify(obj);
      }

      const keys = Object.keys(obj);
      const color = colors[level] || colors[12];
      const resetColor = colors.reset;
      const nextLevel = level + 1;

      const formatted = keys.map(key => {
        const value = formatObject(obj[key], nextLevel);
        if(value.toString().startsWith("{")){
            return `${indent(level)}${color}${key}${resetColor}: ${value}`;
        }
        return `${indent(level)}${color}${helpers.cliColors.bright}${key}${resetColor}: ${helpers.cliColors.fg.white}${value}${resetColor}`;
      }).join(',\n');

      return `{\n${formatted}\n${indent(level - 1)}}`;
    };

    if(message !== '')
        return `\n${message}\n${formatObject(obj, level)}`;
    else
        return `\n${formatObject(obj, level)}`;
  }
}

// Export MessageBuilder class for Node.js logs
module.exports = new MessageBuilder();
