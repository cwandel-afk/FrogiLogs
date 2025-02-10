"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTransport = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class MarkdownTransport {
    constructor(options = {}) {
        this.options = {
            filepath: "logs/output.md",
            type: "standard",
            prettyObjects: true,
            gap: 1,
            logTitle: "Application Logs",
            ...options,
        };
        // Ensure the directory exists
        const dir = path.dirname(this.options.filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Create or clear the file and add title
        fs.writeFileSync(this.options.filepath, `# ${this.options.logTitle}\n\n`);
    }
    write(logEntry) {
        switch (this.options.type) {
            case "standard":
                this.log_standard(logEntry);
                break;
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
    appendToFile(content) {
        fs.appendFileSync(this.options.filepath, content + "\n");
    }
    log_standard(logEntry) {
        const { timestamp, level, caller, message, meta } = logEntry;
        let output = "## ";
        if (timestamp) {
            output += `[${timestamp}] `;
        }
        output += `${level.toUpperCase()}\n\n`;
        if (caller) {
            output += `**Caller:** ${caller}\n\n`;
        }
        output += `${message}\n`;
        if (Object.keys(meta).length > 0) {
            output += "\n### Metadata\n```json\n";
            output += this.options.prettyObjects
                ? this.prettyPrintObject(meta)
                : JSON.stringify(meta);
            output += "\n```\n";
        }
        output += "\n---\n";
        if (this.options.gap && this.options.gap > 0) {
            output += "\n".repeat(this.options.gap);
        }
        this.appendToFile(output);
    }
    log_json(logEntry) {
        let output = "## Log Entry\n\n```json\n";
        output += JSON.stringify(logEntry, null, 2);
        output += "\n```\n\n---\n";
        if (this.options.gap && this.options.gap > 0) {
            output += "\n".repeat(this.options.gap);
        }
        this.appendToFile(output);
    }
    log_detailed(logEntry) {
        const { timestamp, level, caller, message, meta } = logEntry;
        let output = "## Log Details\n\n";
        if (timestamp) {
            output += `**Timestamp:** ${timestamp}\n\n`;
        }
        output += `**Level:** ${level.toUpperCase()}\n\n`;
        if (caller) {
            output += `**Caller:** ${caller}\n\n`;
        }
        output += `**Message:** ${message}\n\n`;
        if (Object.keys(meta).length > 0) {
            output += "### Metadata\n```json\n";
            output += this.options.prettyObjects
                ? this.prettyPrintObject(meta)
                : JSON.stringify(meta);
            output += "\n```\n";
        }
        output += "\n---\n";
        if (this.options.gap && this.options.gap > 0) {
            output += "\n".repeat(this.options.gap);
        }
        this.appendToFile(output);
    }
}
exports.MarkdownTransport = MarkdownTransport;
