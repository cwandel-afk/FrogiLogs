import {
  Logger,
  MarkdownTransport,
  LoggerOptions,
  TransportOptions,
  LogMeta,
} from "../src/index";

interface SystemMeta extends LogMeta {
  version: string;
  environment: {
    node: string;
    platform: string;
    memory: NodeJS.MemoryUsage;
  };
}

interface ConfigMeta extends LogMeta {
  settings: {
    database: string;
    cache: string;
    apiVersion: string;
    features: string[];
  };
}

interface ErrorMeta extends LogMeta {
  error: string;
  stack?: string;
  timestamp: Date;
  impact: "low" | "medium" | "high";
  affectedServices: string[];
}

// Create a logger with debug level
const logger = new Logger({
  timestamp: true,
  traceCaller: true,
} as LoggerOptions);

// Add markdown transport with different styles
logger.addTransport(
  new MarkdownTransport({
    filepath: "logs/application-detailed-ts.md",
    type: "detailed",
    prettyObjects: true,
    gap: 1,
    logTitle: "Detailed Application Logs",
  } as TransportOptions)
);

logger.addTransport(
  new MarkdownTransport({
    filepath: "logs/application-standard-ts.md",
    type: "standard",
    prettyObjects: true,
    gap: 1,
    logTitle: "Standard Application Logs",
  } as TransportOptions)
);

// Log system startup information with typed metadata
logger.info("System Initialization", {
  version: "2.0.0",
  environment: {
    node: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
  },
} as SystemMeta);

// Log configuration details with typed metadata
logger.debug("Configuration Loaded", {
  settings: {
    database: "mongodb://localhost:27017",
    cache: "redis://localhost:6379",
    apiVersion: "v2",
    features: ["auth", "logging", "metrics"],
  },
} as ConfigMeta);

// Demonstrate error handling with stack traces
try {
  throw new Error("Database Connection Failed");
} catch (error) {
  logger.error("Critical System Error", {
    error: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date(),
    impact: "high",
    affectedServices: ["api", "auth", "database"],
  } as ErrorMeta);
}

// Class-based logging example with typed methods
class ConfigService {
  constructor() {
    logger.info("ConfigService Initialized", {
      timestamp: new Date(),
      status: "active",
    } as LogMeta);
  }

  updateConfig(): void {
    logger.warn("Configuration Change Detected", {
      changes: {
        "api.timeout": "5000ms → 10000ms",
        "cache.ttl": "1h → 2h",
      },
      initiator: "system-admin",
    } as LogMeta);
  }
}

// Run the configuration service example
const configService = new ConfigService();
configService.updateConfig();
