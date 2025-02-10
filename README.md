# 🐸 FrogiLogs

> Make your logs hop with style! 🌟

A powerful TypeScript/JavaScript logging library designed to enhance your debugging workflow with structured, customizable, and feature-rich logging capabilities.

## ✨ Features

- 🎨 Beautiful, colorful console output
- 📁 Multiple transport types:
  - 🖥️ Console logs with ANSI colors
  - 📄 File-based logging
  - 🌐 HTML output with interactive UI
  - ✍️ Markdown formatting
  - 🌍 Browser console integration
- 🎯 TypeScript support with full type definitions
- 🔍 Caller tracking
- 🎭 Multiple log levels (debug, info, warn, error)
- 🎪 Pretty-printed objects
- 🔧 Highly configurable

## 🚀 Installation

```bash
npm install frogilogs
```

## 🎮 Quick Start

```typescript
import { Logger, ConsoleTransport } from "frogilogs";

// Create a new logger
const logger = new Logger({
  level: "debug",
  timestamp: true,
  traceCaller: true,
});

// Add a console transport
logger.addTransport(
  new ConsoleTransport({
    colorize: true,
    type: "detailed",
    prettyObjects: true,
  })
);
// Start logging!
logger.info("Hello, FrogiLogs! 🐸", {
  mood: "hoppy",
  weather: "perfect for frogs",
});
```

## 📚 Transport Types

### 🖥️ Console Transport

```typescript
import { Logger, ConsoleTransport } from "frogilogs";
const logger = new Logger();
logger.addTransport(
  new ConsoleTransport({
    colorize: true, // Enable ANSI colors
    type: "detailed", // or 'standard', 'json'
    prettyObjects: true,
    gap: 1, // Add spacing between logs
  })
);
```

### 📄 File Transport

```typescript
import { Logger, FileTransport } from "frogilogs";
const logger = new Logger();
logger.addTransport(
  new FileTransport({
    filepath: "logs/app.log",
    type: "detailed",
    prettyObjects: true,
  })
);
```

### 🌐 HTML Transport

```typescript
import { Logger, HTMLTransport } from "frogilogs";
const logger = new Logger();
logger.addTransport(
  new HTMLTransport({
    filepath: "logs/app.html",
    prettyObjects: true,
  })
);
```

### ✍️ Markdown Transport

```typescript
import { Logger, MarkdownTransport } from "frogilogs";
const logger = new Logger();
logger.addTransport(
  new MarkdownTransport({
    filepath: "logs/app.md",
    type: "detailed", // or 'standard', 'json'
    prettyObjects: true,
    logTitle: "Application Logs",
    gap: 1,
  })
);
```

### 🌍 Browser Transport

```typescript
import { Logger, BrowserTransport } from "frogilogs";
const logger = new Logger();
logger.addTransport(
  new BrowserTransport({
    colorize: true, // Enable CSS styling
    type: "detailed", // or 'standard', 'json'
    prettyObjects: true, // Pretty print objects in console
    styles: {
      debug: "color: gray",
      info: "color: blue",
      warn: "color: orange",
      error: "color: red; font-weight: bold",
    },
  })
);
```

## 🎨 Log Levels

- 🔵 `debug`: Detailed debugging information
- ℹ️ `info`: General information
- ⚠️ `warn`: Warning messages
- 🔴 `error`: Error messages

## 🌈 Type Safety

FrogiLogs is written in TypeScript and provides full type definitions. You can define custom metadata interfaces:

```typescript
interface UserLogMeta extends LogMeta {
  userId: string;
  action: string;
  timestamp: Date;
}
logger.info("User action", {
  userId: "123",
  action: "login",
  timestamp: new Date(),
} as UserLogMeta);
```

## 📖 Examples

Check out our examples directory for more detailed usage:

- `examples/console-example.ts` - Console logging with colors
- `examples/file-example.ts` - File logging with different formats
- `examples/html-example.ts` - Interactive HTML log output
- `examples/markdown-example.ts` - Markdown formatted logs
- `examples/browser-example.html` - Browser console integration

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📜 License

ISC © Christopher Wandel 🐸

---

Made with 💚 by frogs, for developers 🐸✨
