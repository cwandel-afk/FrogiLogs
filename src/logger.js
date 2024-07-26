class Logger {
    logToCLI(message) {
      console.log(message);
    }
  
    logToBrowserConsole(message) {
      if (typeof window !== 'undefined' && window.console) {
        window.console.log(message);
      }
    }
  
    logToFile(message) {
      if (typeof window !== 'undefined') {
        alert('File logging is not supported in the browser.');
      } else {
        const fs = require('fs');
        const path = require('path');
        const logFilePath = path.resolve(__dirname, 'log.txt');
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
      }
    }
  }
  
  // Export Logger class for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Logger;
  }
  
  // Attach Logger to the window object for the browser
  if (typeof window !== 'undefined') {
    window.Logger = Logger;
  }
  