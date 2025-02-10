const { Logger, MarkdownTransport } = require("../src/index");

// Create a logger with debug level
const logger = new Logger({
  timestamp: true,
  traceCaller: true,
});

// Add markdown transport with different styles
logger.addTransport(
  new MarkdownTransport({
    filepath: "logs/application-detailed.md",
    type: "detailed",
    prettyObjects: true,
    gap: 1,
    logTitle: "Detailed Application Logs",
  })
);

logger.addTransport(
  new MarkdownTransport({
    filepath: "logs/application-standard.md",
    type: "standard",
    prettyObjects: true,
    gap: 1,
    logTitle: "Standard Application Logs",
  })
);

// Log system startup information
logger.info("System Initialization", {
  version: "2.0.0",
  environment: {
    node: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
  },
});

// Log configuration details
logger.debug("Configuration Loaded", {
  settings: {
    database: "mongodb://localhost:27017",
    cache: "redis://localhost:6379",
    apiVersion: "v2",
    features: ["auth", "logging", "metrics"],
  },
});

// Demonstrate error handling with stack traces
try {
  throw new Error("Database Connection Failed");
} catch (error) {
  logger.error("Critical System Error", {
    error: error.message,
    stack: error.stack,
    timestamp: new Date(),
    impact: "high",
    affectedServices: ["api", "auth", "database"],
  });
}

// Class-based logging example
class ConfigService {
  constructor() {
    logger.info("ConfigService Initialized", {
      timestamp: new Date(),
      status: "active",
    });
  }

  updateConfig() {
    logger.warn("Configuration Change Detected", {
      changes: {
        "api.timeout": "5000ms → 10000ms",
        "cache.ttl": "1h → 2h",
      },
      initiator: "system-admin",
    });
  }
}

// Run the configuration service example
const configService = new ConfigService();
configService.updateConfig();
