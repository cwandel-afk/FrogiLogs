# FrogiLogs Examples

This directory contains example implementations demonstrating various features and transports of FrogiLogs. Each example is available in both JavaScript and TypeScript.

## Prerequisites

Before running the examples, make sure you have:

1. Node.js (v14 or higher) installed
2. The repository cloned locally
3. Dependencies installed:
   ```bash
   npm install
   ```

## Available Examples

### 1. Console Transport

Demonstrates console logging with different formats, colors, and metadata.

```bash
# JavaScript
node examples/console-example.js

# TypeScript
ts-node examples/console-example.ts
```

Features demonstrated:

- Multiple transport configurations (detailed, standard, JSON)
- ANSI color support
- Pretty-printed objects
- Caller tracking
- Log levels (debug, info, warn, error)
- Important flag usage

### 2. File Transport

Shows file-based logging with different output formats.

```bash
# JavaScript
node examples/file-example.js

# TypeScript
ts-node examples/file-example.ts
```

Features demonstrated:

- Multiple file outputs (detailed and standard formats)
- Structured metadata logging
- Pretty-printed objects
- Automatic file creation
- Line spacing options

### 3. HTML Transport

Creates styled HTML log files with interactive metadata.

```bash
# JavaScript
node examples/html-example.js

# TypeScript
ts-node examples/html-example.ts
```

Features demonstrated:

- Custom CSS styling
- Collapsible metadata sections
- Color-coded log levels
- Error stack traces
- Async operation logging

### 4. Markdown Transport

Generates well-formatted markdown log files.

```bash
# JavaScript
node examples/markdown-example.js

# TypeScript
ts-node examples/markdown-example.ts
```

Features demonstrated:

- Multiple markdown formats (detailed, standard)
- Custom log titles
- Code block formatting
- Metadata sections
- Section dividers

### 5. Browser Example

Demonstrates browser-based logging (open in a web browser).

1. Build the browser bundle:

   ```bash
   npm run build
   ```

2. Start the development server:

   ```bash
   python3 server.py
   ```

3. Open in your browser:
   ```
   http://localhost:8000/examples/browser-example.html
   ```

Features demonstrated:

- Browser console integration
- Real-time logging
- Error handling
- Async operations

## Output Locations

Log files will be created in the following directories:

```
logs/
├── *.txt    # Text log files
├── *.html   # HTML log files
└── *.md     # Markdown log files
```

## TypeScript Support

All examples are available in both JavaScript and TypeScript. TypeScript examples provide:

- Type safety
- Interface definitions
- Better IDE support
- Type guards for error handling

## Running All Examples

To run all examples at once:

```bash
npm run examples
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
