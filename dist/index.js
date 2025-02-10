const Logger = require("./core/logger");
const ConsoleTransport = require("./transports/consoleTransport");
const FileTransport = require("./transports/fileTransport");
const HTMLTransport = require("./transports/htmlTransport");
const MarkdownTransport = require("./transports/markdownTransport");
const BrowserTransport = require("./transports/browserTransport");
// Only include BrowserTransport if we're in a browser environment
// const BrowserTransport =
//   typeof window !== "undefined"
//     ? require("./transports/browserTransport")
//     : null;

// Export all components
module.exports = {
  Logger,
  ConsoleTransport,
  FileTransport,
  HTMLTransport,
  MarkdownTransport,
  BrowserTransport,
  // Only include BrowserTransport if it's available
  //   ...(BrowserTransport && { BrowserTransport }),
};

// // Create a new logger
// const logger = new Logger({
//     level: 'debug',
//     timestamp: true
// });

// // Add console transport
// logger.addTransport(new ConsoleTransport({ colorize: true }));

// // Use the logger
// logger.info('Application started');
// logger.debug('Debug message', { userId: 123 });
// logger.error('An error occurred', { error: 'Database connection failed' });
