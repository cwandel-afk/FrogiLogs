"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransport = void 0;
class ConsoleTransport {
    constructor(options = {}) {
        this.options = {
            colorize: true,
            gap: 0,
            type: "standard",
            prettyObjects: false,
            ...options,
        };
        this.colors = {
            error: "\x1b[31m",
            warn: "\x1b[33m",
            info: "\x1b[36m",
            debug: "\x1b[90m",
            reset: "\x1b[0m",
        };
    }
    write(logEntry) {
        switch (this.options.type) {
            case "json":
                this.log_json(logEntry);
                break;
            case "detailed":
                this.log_detailed(logEntry);
                break;
            default:
                this.log_standard(logEntry);
        }
    }
    prettyPrintObject(object) {
        return JSON.stringify(object, null, 2);
    }
    log_standard(logEntry) {
        const { timestamp, level, message, meta } = logEntry;
        let output = "";
        if (timestamp) {
            output += `[${timestamp}] `;
        }
        if (this.options.colorize) {
            output += `${this.colors[level]}${level.toUpperCase()}${this.colors.reset}: ${message}`;
        }
        else {
            output += `${level.toUpperCase()}: ${message}`;
        }
        if (Object.keys(meta).length > 0) {
            output += "\nMetadata: ";
            output += this.options.prettyObjects
                ? this.prettyPrintObject(meta)
                : JSON.stringify(meta);
        }
        if (this.options.gap && this.options.gap > 0) {
            output += "\n".repeat(this.options.gap);
        }
        console.log(output);
    }
    log_json(logEntry) {
        console.log(JSON.stringify(logEntry, null, 2));
    }
    log_detailed(logEntry) {
        const { timestamp, level, caller, message, meta } = logEntry;
        console.log("=".repeat(80));
        if (timestamp) {
            console.log(`Timestamp: ${timestamp}`);
        }
        console.log(`Level: ${level.toUpperCase()}`);
        if (caller) {
            console.log(`Caller: ${caller}`);
        }
        console.log(`Message: ${message}`);
        if (Object.keys(meta).length > 0) {
            console.log("Metadata:");
            console.log(this.options.prettyObjects
                ? this.prettyPrintObject(meta)
                : JSON.stringify(meta));
        }
        console.log("=".repeat(80));
        if (this.options.gap && this.options.gap > 0) {
            console.log("\n".repeat(this.options.gap));
        }
    }
}
exports.ConsoleTransport = ConsoleTransport;
