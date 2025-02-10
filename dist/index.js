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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserTransport = exports.MarkdownTransport = exports.HTMLTransport = exports.FileTransport = exports.ConsoleTransport = exports.Logger = void 0;
// Core exports
var logger_1 = require("./core/logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
// Transport exports
var consoleTransport_1 = require("./transports/consoleTransport");
Object.defineProperty(exports, "ConsoleTransport", { enumerable: true, get: function () { return consoleTransport_1.ConsoleTransport; } });
var fileTransport_1 = require("./transports/fileTransport");
Object.defineProperty(exports, "FileTransport", { enumerable: true, get: function () { return fileTransport_1.FileTransport; } });
var htmlTransport_1 = require("./transports/htmlTransport");
Object.defineProperty(exports, "HTMLTransport", { enumerable: true, get: function () { return htmlTransport_1.HTMLTransport; } });
var markdownTransport_1 = require("./transports/markdownTransport");
Object.defineProperty(exports, "MarkdownTransport", { enumerable: true, get: function () { return markdownTransport_1.MarkdownTransport; } });
var browserTransport_1 = require("./transports/browserTransport");
Object.defineProperty(exports, "BrowserTransport", { enumerable: true, get: function () { return browserTransport_1.BrowserTransport; } });
// Re-export all types
__exportStar(require("./types"), exports);
