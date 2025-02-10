const { Logger, FileTransport } = require("../src/index");

// Create a logger with debug level to see all logs
const logger = new Logger({
  timestamp: true,
  traceCaller: true,
});

// Add three file transports with different styles
// 1. Detailed view with pretty-printed objects
logger.addTransport(
  new FileTransport({
    filepath: "logs/application-detailed.txt",
    type: "detailed",
    prettyObjects: true,
    gap: 1,
  })
);

logger.addTransport(
  new FileTransport({
    filepath: "logs/application-standard.txt",
    type: "standard",
    prettyObjects: true,
    gap: 1,
  })
);

// Demonstrate different log levels with metadata
logger.debug("Starting application initialization", {
  environment: "production",
  version: "1.0.0",
  config: {
    database: "mongodb",
    cache: "redis",
    workers: 4,
  },
});

logger.info("Database connection established", {
  host: "localhost",
  port: 27017,
  connectionTime: "50ms",
});

logger.warn("High memory usage detected", {
  currentUsage: "85%",
  threshold: "80%",
  availableMemory: "2GB",
});

logger.error("Failed to process transaction", {
  transactionId: "TXN-123",
  error: new Error("Insufficient funds"),
  account: {
    id: "ACC-456",
    type: "savings",
  },
});

// Demonstrate async operations
async function processUserData() {
  logger.info("Processing user data batch", { batchSize: 100 });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  logger.info("User data processing completed");
}

// Demonstrate class method logging
class DataService {
  constructor() {
    logger.info("DataService initialized");
  }

  async fetchData() {
    try {
      logger.debug("Fetching data from API");
      throw new Error("API timeout");
    } catch (error) {
      logger.error("Failed to fetch data", {
        error: error.message,
        timestamp: new Date(),
        retryCount: 3,
      });
    }
  }
}

// Run the demonstrations
async function runDemo() {
  await processUserData();
  const dataService = new DataService();
  await dataService.fetchData();
}

runDemo();
