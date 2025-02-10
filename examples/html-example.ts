import {
  Logger,
  HTMLTransport,
  LoggerOptions,
  TransportOptions,
  LogMeta,
} from "../src/index";

interface AppConfig extends LogMeta {
  version: string;
  environment: string;
  config: {
    port: number;
    database: string;
  };
}

interface UserAuthMeta extends LogMeta {
  userId: string;
  loginTime: string;
  browser: string;
}

// Create a logger with debug level
const logger = new Logger({
  timestamp: true,
  traceCaller: true,
} as LoggerOptions);

// Add HTML transport with styling
logger.addTransport(
  new HTMLTransport({
    filepath: "logs/application-ts.html",
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
  } as TransportOptions)
);

// Log different levels with typed metadata
logger.debug("Application startup", {
  version: "1.0.0",
  environment: "development",
  config: {
    port: 3000,
    database: "mongodb://localhost:27017",
  },
} as AppConfig);

logger.info("User authentication", {
  userId: "user123",
  loginTime: new Date().toISOString(),
  browser: "Chrome",
} as UserAuthMeta);

// Class example with typed methods
class UserService {
  constructor() {
    logger.info("UserService initialized", {
      time: new Date(),
      cache: "enabled",
    } as LogMeta);
  }

  async login(): Promise<void> {
    logger.debug("Login attempt", {
      timestamp: new Date(),
    } as LogMeta);
    throw new Error("Invalid credentials");
  }
}

// Run async example with error handling
async function runExample(): Promise<void> {
  const service = new UserService();
  try {
    await service.login();
  } catch (error) {
    logger.error("Login failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date(),
    } as LogMeta);
  }
}

runExample().catch((error) => {
  logger.error("Example failed", {
    error: error instanceof Error ? error.message : "Unknown error",
  } as LogMeta);
});
