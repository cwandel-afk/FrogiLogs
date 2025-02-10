!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("FrogiLogs",[],e):"object"==typeof exports?exports.FrogiLogs=e():t.FrogiLogs=e()}(this,(()=>{return t={928:(t,e,o)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Logger=void 0;const n=o(885);e.Logger=class{constructor(t={}){this.levels={error:0,warn:1,info:2,debug:3},this.options={level:"info",timestamp:!0,traceCaller:!1,...t},this.transports=[]}addTransport(t){this.transports.push(t)}getCaller(){if("undefined"==typeof window)return(t=>{const e=t.indexOf("(");-1!==e&&(t=t.substring(0,e).trim());const o=(t=t.replace(/^at /,"").split(" ")[0]).split(".");return o[o.length-1]||"Anonymous"})((new Error).stack.split("\n").find(((t,e)=>{const o=!t.includes("Logger")&&!t.includes("/logger")&&!t.includes("frogilogs");return e>1&&o}))||"Unknown caller");try{return(()=>{const t=((new Error).stack.split("\n").find((t=>t.includes("browser-example.html")&&!t.includes("getCaller")&&!t.includes("formatLogEntry")&&!t.includes("log@")&&!t.includes("debug@")&&!t.includes("info@")&&!t.includes("warn@")&&!t.includes("error@")))||"").split("@")[0].split("/"),e=t[t.length-1];if(e){const t=e.split(".").pop()||"";switch(t){case"":case"Anonymous":case"anonymous":return"Anonymous";case"new":return"Constructor";default:return t}}return"Anonymous"})()}catch(t){return"Anonymous"}}log(t,e,o={}){if(this.shouldLog(t)){const n=this.formatLogEntry(t,e,o);this.writeToTransports(n)}}shouldLog(t){return this.levels[t]<=this.levels[this.options.level||"info"]}formatLogEntry(t,e,o){return{timestamp:this.options.timestamp?(new Date).toISOString():null,level:t,caller:this.options.traceCaller?this.getCaller():"",message:e,meta:o}}writeToTransports(t){0===this.transports.length?(new n.ConsoleTransport).write(t):this.transports.forEach((e=>{e.write(t)}))}error(t,e={},o=!1){o?(console.log("\n---------------- Important ----------------\n"),this.log("error",t,e),console.log("\n-----------------------------------------\n")):this.log("error",t,e)}warn(t,e={},o=!1){o?(console.log("\n---------------- Important ----------------\n"),this.log("warn",t,e),console.log("\n-----------------------------------------\n")):this.log("warn",t,e)}info(t,e={},o=!1){o?(console.log("\n---------------- Important ----------------\n"),this.log("info",t,e),console.log("\n-----------------------------------------\n")):this.log("info",t,e)}debug(t,e={},o=!1){o?(console.log("\n---------------- Important ----------------\n"),this.log("debug",t,e),console.log("\n-----------------------------------------\n")):this.log("debug",t,e)}}},156:function(t,e,o){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var s=Object.getOwnPropertyDescriptor(e,o);s&&!("get"in s?!e.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,s)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),s=this&&this.__exportStar||function(t,e){for(var o in t)"default"===o||Object.prototype.hasOwnProperty.call(e,o)||n(e,t,o)};Object.defineProperty(e,"__esModule",{value:!0}),e.BrowserTransport=e.MarkdownTransport=e.HTMLTransport=e.FileTransport=e.ConsoleTransport=e.Logger=void 0;var r=o(928);Object.defineProperty(e,"Logger",{enumerable:!0,get:function(){return r.Logger}});var i=o(885);Object.defineProperty(e,"ConsoleTransport",{enumerable:!0,get:function(){return i.ConsoleTransport}});var l=o(612);Object.defineProperty(e,"FileTransport",{enumerable:!0,get:function(){return l.FileTransport}});var a=o(865);Object.defineProperty(e,"HTMLTransport",{enumerable:!0,get:function(){return a.HTMLTransport}});var p=o(9);Object.defineProperty(e,"MarkdownTransport",{enumerable:!0,get:function(){return p.MarkdownTransport}});var c=o(350);Object.defineProperty(e,"BrowserTransport",{enumerable:!0,get:function(){return c.BrowserTransport}}),s(o(574),e)},350:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BrowserTransport=void 0,e.BrowserTransport=class{constructor(t={}){this.options={colorize:!0,gap:0,type:"standard",prettyObjects:!0,...t},this.styles={error:"color: #D32F2F; font-weight: bold",warn:"color: #F57C00; font-weight: bold",info:"color: #1976D2; font-weight: bold",debug:"color: #616161; font-weight: bold",timestamp:"color: #616161",caller:"color: #388E3C",meta:"color: #616161",black:"color: black",red:"color: #D32F2F",green:"color: #388E3C",yellow:"color: #F57C00",blue:"color: #1976D2",magenta:"color: #C2185B",cyan:"color: #0097A7",white:"color: #FAFAFA",gray:"color: #616161"}}write(t){switch(this.options.type){case"json":this.log_json(t);break;case"detailed":this.log_detailed(t);break;default:this.log_standard(t)}}prettyPrintObject(t){return JSON.stringify(t,null,2)}log_standard(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t,i=this.styles[o.toLowerCase()];this.options.colorize?console.group("%c"+o.toUpperCase(),i):console.group(o.toUpperCase()),e&&console.log("%cTimestamp:%c %s",this.styles.timestamp,"color: inherit",e),n&&console.log("%cCaller:%c %s",this.styles.caller,"color: inherit",n),console.log(s),Object.keys(r).length>0&&console.log("%cMetadata:",this.styles.meta,this.options.prettyObjects?r:JSON.stringify(r)),console.groupEnd(),this.options.gap&&this.options.gap>0&&console.log("\n".repeat(this.options.gap))}log_json(t){console.log(JSON.stringify(t,null,2)),this.options.gap&&this.options.gap>0&&console.log("\n".repeat(this.options.gap))}log_detailed(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t,i=this.styles[o.toLowerCase()];console.group("%c"+"=".repeat(80),this.styles.gray),e&&console.log("%cTimestamp:%c %s",this.styles.timestamp,"color: inherit",e),console.log("%cLevel:%c %s",i,"color: inherit",o.toUpperCase()),n&&console.log("%cCaller:%c %s",this.styles.caller,"color: inherit",n),console.log("%cMessage:%c %s",i,"color: inherit",s),Object.keys(r).length>0&&(console.group("%cMetadata:",this.styles.meta),console.log(this.options.prettyObjects?r:JSON.stringify(r,null,2)),console.groupEnd()),console.log("%c"+"=".repeat(80),this.styles.gray),console.groupEnd(),this.options.gap&&this.options.gap>0&&console.log("\n".repeat(this.options.gap))}}},885:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ConsoleTransport=void 0,e.ConsoleTransport=class{constructor(t={}){this.options={colorize:!0,gap:0,type:"standard",prettyObjects:!1,...t},this.colors={error:"[31m",warn:"[33m",info:"[36m",debug:"[90m",reset:"[0m"}}write(t){switch(this.options.type){case"json":this.log_json(t);break;case"detailed":this.log_detailed(t);break;default:this.log_standard(t)}}prettyPrintObject(t){return JSON.stringify(t,null,2)}log_standard(t){const{timestamp:e,level:o,message:n,meta:s}=t;let r="";e&&(r+=`[${e}] `),this.options.colorize?r+=`${this.colors[o]}${o.toUpperCase()}${this.colors.reset}: ${n}`:r+=`${o.toUpperCase()}: ${n}`,Object.keys(s).length>0&&(r+="\nMetadata: ",r+=this.options.prettyObjects?this.prettyPrintObject(s):JSON.stringify(s)),this.options.gap&&this.options.gap>0&&(r+="\n".repeat(this.options.gap)),console.log(r)}log_json(t){console.log(JSON.stringify(t,null,2))}log_detailed(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t;console.log("=".repeat(80)),e&&console.log(`Timestamp: ${e}`),console.log(`Level: ${o.toUpperCase()}`),n&&console.log(`Caller: ${n}`),console.log(`Message: ${s}`),Object.keys(r).length>0&&(console.log("Metadata:"),console.log(this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r))),console.log("=".repeat(80)),this.options.gap&&this.options.gap>0&&console.log("\n".repeat(this.options.gap))}}},612:function(t,e,o){"use strict";var n,s=this&&this.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var s=Object.getOwnPropertyDescriptor(e,o);s&&!("get"in s?!e.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,s)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||(n=function(t){return n=Object.getOwnPropertyNames||function(t){var e=[];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[e.length]=o);return e},n(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o=n(t),i=0;i<o.length;i++)"default"!==o[i]&&s(e,t,o[i]);return r(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.FileTransport=void 0;const l=i(o(336)),a=i(o(640));e.FileTransport=class{constructor(t={}){this.options={filepath:"logs/output.txt",type:"standard",prettyObjects:!0,gap:1,...t};const e=a.dirname(this.options.filepath);l.existsSync(e)||l.mkdirSync(e,{recursive:!0}),l.writeFileSync(this.options.filepath,"")}write(t){switch(this.options.type){case"standard":default:this.log_standard(t);break;case"json":this.log_json(t);break;case"detailed":this.log_detailed(t)}}prettyPrintObject(t){return JSON.stringify(t,null,2)}appendToFile(t){l.appendFileSync(this.options.filepath,t+"\n")}log_standard(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t;let i="";e&&(i+=`[${e}] `),i+=`[${o.toUpperCase()}] `,n&&(i+=`(${n}) `),i+=s,Object.keys(r).length>0&&(i+="\n",i+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r)),i+="\n"+"-".repeat(80),this.options.gap&&this.options.gap>0&&(i+="\n".repeat(this.options.gap)),this.appendToFile(i)}log_json(t){this.appendToFile(JSON.stringify(t,null,2))}log_detailed(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t;let i="=".repeat(80)+"\n";e&&(i+=`Timestamp: ${e}\n`),i+=`Level: ${o.toUpperCase()}\n`,n&&(i+=`Caller: ${n}\n`),i+=`Message: ${s}\n`,Object.keys(r).length>0&&(i+="Metadata:\n",i+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r),i+="\n"),i+="=".repeat(80),this.options.gap&&this.options.gap>0&&(i+="\n".repeat(this.options.gap)),this.appendToFile(i)}}},865:function(t,e,o){"use strict";var n,s=this&&this.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var s=Object.getOwnPropertyDescriptor(e,o);s&&!("get"in s?!e.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,s)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||(n=function(t){return n=Object.getOwnPropertyNames||function(t){var e=[];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[e.length]=o);return e},n(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o=n(t),i=0;i<o.length;i++)"default"!==o[i]&&s(e,t,o[i]);return r(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.HTMLTransport=void 0;const l=i(o(336)),a=i(o(640));e.HTMLTransport=class{constructor(t={}){var e;this.entryCount=0,this.options={filepath:"logs/output.html",type:"standard",prettyObjects:!0,gap:1,logTitle:"Application Logs",styles:"\n        body { font-family: Arial, sans-serif; padding: 20px; }\n        .log-entry { margin-bottom: 20px; padding: 10px; border-radius: 4px; }\n        .ERROR { background-color: #ffebee; }\n        .WARN { background-color: #fff3e0; }\n        .INFO { background-color: #e3f2fd; }\n        .DEBUG { background-color: #f5f5f5; }\n        .metadata { background: #fafafa; padding: 10px; margin-top: 10px; }\n      ",...t};const o=a.dirname((null===(e=this.options)||void 0===e?void 0:e.filepath)||"logs/output.html");l.existsSync(o)||l.mkdirSync(o,{recursive:!0});const n=`\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>${this.options.logTitle}</title>\n          <style>${this.options.styles}</style>\n        </head>\n        <body>\n          <h1>${this.options.logTitle}</h1>\n    `;l.writeFileSync(this.options.filepath||"logs/output.html",n)}write(t){this.entryCount++;const{timestamp:e,level:o,caller:n,message:s,meta:r}=t;let i=`<div class="log-entry ${o.toUpperCase()}">`;e&&(i+=`<strong>Time:</strong> ${e} | `),i+=`<strong>Level:</strong> ${o.toUpperCase()}`,n&&(i+=` | <strong>Caller:</strong> ${n}`),i+=`<br/><strong>Message:</strong> ${s}`,Object.keys(r).length>0&&(i+='<div class="metadata">',i+=`<pre>${this.prettifyMeta(r)}</pre>`,i+="</div>"),i+="</div>",this.options.gap&&this.options.gap>0&&(i+="<br>".repeat(this.options.gap)),this.appendToFile(i)}prettifyMeta(t){return this.options.prettyObjects?JSON.stringify(t,null,2):JSON.stringify(t)}appendToFile(t){l.appendFileSync(this.options.filepath||"logs/output.html",t)}close(){l.appendFileSync(this.options.filepath||"logs/output.html","\n</body></html>")}}},9:function(t,e,o){"use strict";var n,s=this&&this.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var s=Object.getOwnPropertyDescriptor(e,o);s&&!("get"in s?!e.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,s)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||(n=function(t){return n=Object.getOwnPropertyNames||function(t){var e=[];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[e.length]=o);return e},n(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o=n(t),i=0;i<o.length;i++)"default"!==o[i]&&s(e,t,o[i]);return r(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.MarkdownTransport=void 0;const l=i(o(336)),a=i(o(640));e.MarkdownTransport=class{constructor(t={}){this.options={filepath:"logs/output.md",type:"standard",prettyObjects:!0,gap:1,logTitle:"Application Logs",...t};const e=a.dirname(this.options.filepath);l.existsSync(e)||l.mkdirSync(e,{recursive:!0}),l.writeFileSync(this.options.filepath,`# ${this.options.logTitle}\n\n`)}write(t){switch(this.options.type){case"standard":default:this.log_standard(t);break;case"json":this.log_json(t);break;case"detailed":this.log_detailed(t)}}prettyPrintObject(t){return JSON.stringify(t,null,2)}appendToFile(t){l.appendFileSync(this.options.filepath,t+"\n")}log_standard(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t;let i="## ";e&&(i+=`[${e}] `),i+=`${o.toUpperCase()}\n\n`,n&&(i+=`**Caller:** ${n}\n\n`),i+=`${s}\n`,Object.keys(r).length>0&&(i+="\n### Metadata\n```json\n",i+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r),i+="\n```\n"),i+="\n---\n",this.options.gap&&this.options.gap>0&&(i+="\n".repeat(this.options.gap)),this.appendToFile(i)}log_json(t){let e="## Log Entry\n\n```json\n";e+=JSON.stringify(t,null,2),e+="\n```\n\n---\n",this.options.gap&&this.options.gap>0&&(e+="\n".repeat(this.options.gap)),this.appendToFile(e)}log_detailed(t){const{timestamp:e,level:o,caller:n,message:s,meta:r}=t;let i="## Log Details\n\n";e&&(i+=`**Timestamp:** ${e}\n\n`),i+=`**Level:** ${o.toUpperCase()}\n\n`,n&&(i+=`**Caller:** ${n}\n\n`),i+=`**Message:** ${s}\n\n`,Object.keys(r).length>0&&(i+="### Metadata\n```json\n",i+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r),i+="\n```\n"),i+="\n---\n",this.options.gap&&this.options.gap>0&&(i+="\n".repeat(this.options.gap)),this.appendToFile(i)}}},574:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0})},336:()=>{},640:()=>{}},e={},function o(n){var s=e[n];if(void 0!==s)return s.exports;var r=e[n]={exports:{}};return t[n].call(r.exports,r,r.exports,o),r.exports}(156);var t,e}));