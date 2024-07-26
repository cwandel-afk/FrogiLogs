const Logger = require('./src/logger');

const logger = new Logger();
logger.logToCLI('Logging to CLI!');
logger.logToFile('Logging to file!');
