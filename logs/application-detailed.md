# Detailed Application Logs

### INFO: System Initialization

- **Timestamp:** 2025-02-10T03:17:57.793Z
- **Level:** INFO
- **Caller:** Anonymous
- **Message:** System Initialization

### Metadata

```json
{
  "version": "2.0.0",
  "environment": {
    "node": "v18.20.5",
    "platform": "linux",
    "memory": {
      "rss": 45350912,
      "heapTotal": 4825088,
      "heapUsed": 4274640,
      "external": 380203,
      "arrayBuffers": 38860
    }
  }
}
```


---


### ERROR: Critical System Error

- **Timestamp:** 2025-02-10T03:17:57.794Z
- **Level:** ERROR
- **Caller:** Anonymous
- **Message:** Critical System Error

### Metadata

```json
{
  "error": "Database Connection Failed",
  "stack": "Error: Database Connection Failed\n    at Object.<anonymous> (/home/christopher-wandel/Documents/Development/libs/FrogiLogs/examples/markdown-example.js:52:9)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)\n    at Module.load (node:internal/modules/cjs/loader:1203:32)\n    at Module._load (node:internal/modules/cjs/loader:1019:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)\n    at node:internal/main/run_main_module:28:49",
  "timestamp": "2025-02-10T03:17:57.794Z",
  "impact": "high",
  "affectedServices": [
    "api",
    "auth",
    "database"
  ]
}
```


---


### INFO: ConfigService Initialized

- **Timestamp:** 2025-02-10T03:17:57.795Z
- **Level:** INFO
- **Caller:** Constructor
- **Message:** ConfigService Initialized

### Metadata

```json
{
  "timestamp": "2025-02-10T03:17:57.795Z",
  "status": "active"
}
```


---


### WARN: Configuration Change Detected

- **Timestamp:** 2025-02-10T03:17:57.795Z
- **Level:** WARN
- **Caller:** ConfigService.updateConfig
- **Message:** Configuration Change Detected

### Metadata

```json
{
  "changes": {
    "api.timeout": "5000ms → 10000ms",
    "cache.ttl": "1h → 2h"
  },
  "initiator": "system-admin"
}
```


---


