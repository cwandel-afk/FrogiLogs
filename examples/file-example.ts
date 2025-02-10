import {
  Logger,
  FileTransport,
  LoggerOptions,
  TransportOptions,
  LogMeta,
} from "../src/index";

// Create a logger with debug level to see all logs
const logger = new Logger({
  timestamp: true,
  traceCaller: true,
} as LoggerOptions);

// Add file transport with detailed formatting
logger.addTransport(
  new FileTransport({
    filepath: "logs/application-detailed-ts.txt",
    type: "detailed",
    prettyObjects: true,
    gap: 1,
  } as TransportOptions)
);

logger.addTransport(
  new FileTransport({
    filepath: "logs/application-standard-ts.txt",
    type: "standard",
    prettyObjects: true,
    gap: 1,
  } as TransportOptions)
);
interface ConfigMeta extends LogMeta {
  environment: string;
  version: string;
  config: {
    database: string;
    cache: string;
    workers: number;
  };
}

interface DatabaseMeta extends LogMeta {
  host: string;
  port: number;
  connectionTime: string;
}

// Demonstrate different log levels with strongly typed metadata
logger.debug("Starting application initialization", {
  environment: "production",
  version: "1.0.0",
  config: {
    database: "mongodb",
    cache: "redis",
    workers: 4,
  },
} as ConfigMeta);

logger.info("Database connection established", {
  host: "localhost",
  port: 27017,
  connectionTime: "50ms",
} as DatabaseMeta);

// Demonstrate async operations with type safety
async function processUserData(batchSize: number): Promise<void> {
  logger.info("Processing user data batch", { batchSize });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  logger.info("User data processing completed");
}

// Demonstrate class method logging with TypeScript features
class DataService {
  constructor() {
    logger.info("DataService initialized");
  }

  async fetchData(): Promise<void> {
    try {
      logger.debug("Fetching data from API");
      throw new Error("API timeout");
    } catch (error) {
      logger.error("Failed to fetch data", {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date(),
        retryCount: 3,
      } as LogMeta);
    }
  }
}

// Run the demonstrations
async function runDemo(): Promise<void> {
  await processUserData(100);
  const dataService = new DataService();
  await dataService.fetchData();
}

runDemo().catch((error) => {
  logger.error("Demo failed", { error: error.message } as LogMeta);
});
