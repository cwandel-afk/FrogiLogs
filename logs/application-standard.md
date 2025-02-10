# Standard Application Logs

**Time:** 2025-02-10T03:17:57.793Z | **Caller:** Anonymous | **Level:** INFO | **Message:** System Initialization

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


**Time:** 2025-02-10T03:17:57.794Z | **Caller:** Anonymous | **Level:** ERROR | **Message:** Critical System Error

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


**Time:** 2025-02-10T03:17:57.795Z | **Caller:** Constructor | **Level:** INFO | **Message:** ConfigService Initialized

```json
{
  "timestamp": "2025-02-10T03:17:57.795Z",
  "status": "active"
}
```


---


**Time:** 2025-02-10T03:17:57.795Z | **Caller:** ConfigService.updateConfig | **Level:** WARN | **Message:** Configuration Change Detected

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


