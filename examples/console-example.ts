import {
  Logger,
  ConsoleTransport,
  LoggerOptions,
  TransportOptions,
  LogMeta,
} from "../src/index";

// ====================================
// Basic Console Logger Configuration
// ====================================

// Create a logger with debug level to see all logs
const logger = new Logger({
  level: "debug", // Show all log levels
  timestamp: true, // Include timestamps in logs
  traceCaller: true, // Track where the log was called from
} as LoggerOptions);

// Add two console transports with different styles
// 1. Detailed view with colors and pretty-printed objects
logger.addTransport(
  new ConsoleTransport({
    colorize: true, // Enable ANSI colors
    type: "detailed", // Use detailed log format
    prettyObjects: true, // Pretty print objects
    gap: 1, // Add one line gap between logs
  } as TransportOptions)
);

// 2. Standard view with minimal formatting
logger.addTransport(
  new ConsoleTransport({
    colorize: true,
    type: "standard",
    prettyObjects: false,
    gap: 0,
  } as TransportOptions)
);

// ====================================
// Demonstrate Different Log Levels
// ====================================

console.log("\n=== Log Levels Demo ===\n");

// Debug level - lowest level, most verbose
logger.debug("Database query executed", {
  query: "SELECT * FROM users",
  duration: "120ms",
  rows: 10,
} as LogMeta);

// Info level - general information
logger.info("User logged in successfully", {
  userId: "123",
  loginTime: new Date().toISOString(),
} as LogMeta);

// Warning level - potential issues
logger.warn("High memory usage detected", {
  memoryUsage: process.memoryUsage(),
  threshold: "80%",
} as LogMeta);

// Error level - critical issues
logger.error("Payment processing failed", {
  orderId: "ORD-456",
  error: new Error("Invalid card"),
  customer: {
    id: "CUST-789",
    email: "test@example.com",
  },
} as LogMeta);

// ====================================
// Demonstrate Important Flag
// ====================================

console.log("\n=== Important Logs Demo ===\n");

// Use the important flag to highlight critical logs
logger.error(
  "Critical system failure",
  {
    component: "core-service",
    status: "offline",
  } as LogMeta,
  true
);

// ====================================
// Demonstrate Different Transport Types
// ====================================

console.log("\n=== Transport Types Demo ===\n");

// Create loggers for different transport types
const jsonLogger = new Logger({ level: "debug" } as LoggerOptions);
jsonLogger.addTransport(
  new ConsoleTransport({
    type: "json",
    prettyObjects: true,
    colorize: true,
  } as TransportOptions)
);

const standardLogger = new Logger({ level: "debug" } as LoggerOptions);
standardLogger.addTransport(
  new ConsoleTransport({
    type: "standard",
    prettyObjects: true,
    colorize: true,
  } as TransportOptions)
);

const detailedLogger = new Logger({ level: "debug" } as LoggerOptions);
detailedLogger.addTransport(
  new ConsoleTransport({
    type: "detailed",
    prettyObjects: true,
    colorize: true,
  } as TransportOptions)
);

// Log the same message in different formats
const testMessage = "User authentication attempt";
const testMeta: LogMeta = {
  userId: "123",
  ipAddress: "192.168.1.1",
  timestamp: new Date(),
  details: {
    browser: "Chrome",
    version: "91.0.4472.124",
    platform: "Windows",
  },
};

console.log("JSON Transport:");
jsonLogger.info(testMessage, testMeta);

console.log("\nStandard Transport:");
standardLogger.info(testMessage, testMeta);

console.log("\nDetailed Transport:");
detailedLogger.info(testMessage, testMeta);

// ====================================
// Demonstrate Caller Tracking
// ====================================

console.log("\n=== Caller Tracking Demo ===\n");

function authenticateUser(): void {
  logger.info("Starting user authentication");
}

class UserService {
  constructor() {
    logger.info("UserService initialized");
  }

  login(): void {
    logger.info("User login attempt");
  }
}

authenticateUser();
const userService = new UserService();
userService.login();
