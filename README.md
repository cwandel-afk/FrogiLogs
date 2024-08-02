# 🐸 Welcome to FrogiLogs!

**FrogiLogs** is your friendly neighborhood JavaScript logging library designed to make your logs not only functional but also eye-catching. Whether you're debugging in the browser console or the CLI, FrogiLogs ensures your logs are clean, visually appealing, and easy to understand.


## 🌟 Features

- **Clean and Stylish Logs**: FrogiLogs provides beautifully formatted logs that are easy on the eyes.
- **Browser and CLI Support**: Seamlessly logs to both browser consoles and command-line interfaces.
- **Customizable**: Tailor the log appearance to suit your preferences.


## 📦 Installation

Getting started with FrogiLogs is a breeze. Simply install the package via npm:
```
npm i frogilogs
```


## 🚀 Usage

Pure JS:
```
// Import FrogiLogs
const FrogiLogs = require('frogilogs');

// Initialize FrogiLogs
const logger = new FrogiLogs();

// Log messages
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
```

TS:
```
// Import FrogiLogs
import Logger from 'frogilogs';

// Initialize FrogiLogs
const logger = new Logger();

// Log messages
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
```