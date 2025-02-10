"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserTransport = void 0;
class BrowserTransport {
    constructor(options = {}) {
        this.options = {
            colorize: true,
            gap: 0,
            type: "standard",
            prettyObjects: true,
            ...options,
        };
        this.styles = {
            error: "color: #D32F2F; font-weight: bold",
            warn: "color: #F57C00; font-weight: bold",
            info: "color: #1976D2; font-weight: bold",
            debug: "color: #616161; font-weight: bold",
            timestamp: "color: #616161",
            caller: "color: #388E3C",
            meta: "color: #616161",
            black: "color: black",
            red: "color: #D32F2F",
            green: "color: #388E3C",
            yellow: "color: #F57C00",
            blue: "color: #1976D2",
            magenta: "color: #C2185B",
            cyan: "color: #0097A7",
            white: "color: #FAFAFA",
            gray: "color: #616161",
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
        const { timestamp, level, caller, message, meta } = logEntry;
        const style = this.styles[level.toLowerCase()];
        if (this.options.colorize) {
            console.group("%c" + level.toUpperCase(), style);
        }
        else {
            console.group(level.toUpperCase());
        }
        if (timestamp) {
            console.log("%cTimestamp:%c %s", this.styles.timestamp, "color: inherit", timestamp);
        }
        if (caller) {
            console.log("%cCaller:%c %s", this.styles.caller, "color: inherit", caller);
        }
        console.log(message);
        if (Object.keys(meta).length > 0) {
            console.log("%cMetadata:", this.styles.meta, this.options.prettyObjects ? meta : JSON.stringify(meta));
        }
        console.groupEnd();
        if (this.options.gap && this.options.gap > 0) {
            console.log("\n".repeat(this.options.gap));
        }
    }
    log_json(logEntry) {
        console.log(JSON.stringify(logEntry, null, 2));
        if (this.options.gap && this.options.gap > 0) {
            console.log("\n".repeat(this.options.gap));
        }
    }
    log_detailed(logEntry) {
        const { timestamp, level, caller, message, meta } = logEntry;
        const style = this.styles[level.toLowerCase()];
        console.group("%c" + "=".repeat(80), this.styles.gray);
        if (timestamp) {
            console.log("%cTimestamp:%c %s", this.styles.timestamp, "color: inherit", timestamp);
        }
        console.log("%cLevel:%c %s", style, "color: inherit", level.toUpperCase());
        if (caller) {
            console.log("%cCaller:%c %s", this.styles.caller, "color: inherit", caller);
        }
        console.log("%cMessage:%c %s", style, "color: inherit", message);
        if (Object.keys(meta).length > 0) {
            console.group("%cMetadata:", this.styles.meta);
            console.log(this.options.prettyObjects ? meta : JSON.stringify(meta, null, 2));
            console.groupEnd();
        }
        console.log("%c" + "=".repeat(80), this.styles.gray);
        console.groupEnd();
        if (this.options.gap && this.options.gap > 0) {
            console.log("\n".repeat(this.options.gap));
        }
    }
}
exports.BrowserTransport = BrowserTransport;
