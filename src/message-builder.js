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
}

// Export MessageBuilder class for Node.js logs
module.exports = new MessageBuilder();
