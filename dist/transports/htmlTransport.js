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
exports.HTMLTransport = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class HTMLTransport {
    constructor(options = {}) {
        var _a;
        this.entryCount = 0;
        this.options = {
            filepath: "logs/output.html",
            type: "standard",
            prettyObjects: true,
            gap: 1,
            logTitle: "Application Logs",
            styles: `
        body { font-family: Arial, sans-serif; padding: 20px; }
        .log-entry { margin-bottom: 20px; padding: 10px; border-radius: 4px; }
        .ERROR { background-color: #ffebee; }
        .WARN { background-color: #fff3e0; }
        .INFO { background-color: #e3f2fd; }
        .DEBUG { background-color: #f5f5f5; }
        .metadata { background: #fafafa; padding: 10px; margin-top: 10px; }
      `,
            ...options,
        };
        const dir = path.dirname(((_a = this.options) === null || _a === void 0 ? void 0 : _a.filepath) || "logs/output.html");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const htmlHeader = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${this.options.logTitle}</title>
          <style>${this.options.styles}</style>
        </head>
        <body>
          <h1>${this.options.logTitle}</h1>
    `;
        fs.writeFileSync(this.options.filepath || "logs/output.html", htmlHeader);
    }
    write(logEntry) {
        this.entryCount++;
        const { timestamp, level, caller, message, meta } = logEntry;
        let output = `<div class="log-entry ${level.toUpperCase()}">`;
        if (timestamp) {
            output += `<strong>Time:</strong> ${timestamp} | `;
        }
        output += `<strong>Level:</strong> ${level.toUpperCase()}`;
        if (caller) {
            output += ` | <strong>Caller:</strong> ${caller}`;
        }
        output += `<br/><strong>Message:</strong> ${message}`;
        if (Object.keys(meta).length > 0) {
            output += `<div class="metadata">`;
            output += `<pre>${this.prettifyMeta(meta)}</pre>`;
            output += `</div>`;
        }
        output += "</div>";
        if (this.options.gap && this.options.gap > 0) {
            output += "<br>".repeat(this.options.gap);
        }
        this.appendToFile(output);
    }
    prettifyMeta(meta) {
        return this.options.prettyObjects
            ? JSON.stringify(meta, null, 2)
            : JSON.stringify(meta);
    }
    appendToFile(content) {
        fs.appendFileSync(this.options.filepath || "logs/output.html", content);
    }
    close() {
        fs.appendFileSync(this.options.filepath || "logs/output.html", "\n</body></html>");
    }
}
exports.HTMLTransport = HTMLTransport;
