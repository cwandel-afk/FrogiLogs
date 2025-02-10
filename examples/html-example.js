const { Logger, HTMLTransport } = require("../src/index");

// Create a logger with debug level
const logger = new Logger({
  timestamp: true,
  traceCaller: true,
});

// Add HTML transport with styling
logger.addTransport(
  new HTMLTransport({
    filepath: "logs/application.html",
    prettyObjects: true,
    gap: 1,
    styles: `
            body { font-family: Arial, sans-serif; padding: 20px; }
            .log-entry { margin-bottom: 20px; padding: 10px; border-radius: 4px; }
            .ERROR { background-color: #ffebee; }
            .WARN { background-color: #fff3e0; }
            .INFO { background-color: #e3f2fd; }
            .DEBUG { background-color: #f5f5f5; }
            .metadata { display: none; background: #fafafa; padding: 10px; }
            .toggle-meta { 
                cursor: pointer; 
                color: blue; 
                text-decoration: underline; 
            }
        `,
  })
);

// Log different levels with metadata
logger.debug("Application startup", {
  version: "1.0.0",
  environment: "development",
  config: {
    port: 3000,
    database: "mongodb://localhost:27017",
  },
});

logger.info("User authentication", {
  userId: "user123",
  loginTime: new Date().toISOString(),
  browser: "Chrome",
});

logger.warn("High CPU Usage", {
  usage: "85%",
  process: "node",
  pid: 1234,
  timestamp: new Date(),
});

logger.error("Database Connection Failed", {
  error: new Error("Connection timeout"),
  attempts: 3,
  lastAttempt: new Date(),
  config: {
    host: "localhost",
    port: 5432,
    database: "users",
  },
});

// Class example with multiple logs
class UserService {
  constructor() {
    logger.info("UserService initialized", {
      time: new Date(),
      cache: "enabled",
    });
  }

  async login() {
    logger.debug("Login attempt", { timestamp: new Date() });
    throw new Error("Invalid credentials");
  }
}

// Run async example
async function runExample() {
  const service = new UserService();
  try {
    await service.login();
  } catch (error) {
    logger.error("Login failed", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });
  }
}

runExample();
