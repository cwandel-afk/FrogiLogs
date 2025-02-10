!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FrogiLogs",[],t):"object"==typeof exports?exports.FrogiLogs=t():e.FrogiLogs=t()}(this,(()=>{return e={828:(e,t,n)=>{const o=n(633);class s{constructor(e={}){this.levels={error:0,warn:1,info:2,debug:3},this.options={level:"info",timestamp:!0,traceCaller:!1,...e},this.transports=[]}addTransport(e){this.transports.push(e)}getCaller(){const e=((new Error).stack.split("\n").find(((e,t)=>t>1&&!e.includes("Logger.")&&!e.includes("/logger.js")))||"Unknown caller").trim().replace(/^at /,"").split(" ")[0];switch(e){case"Object.<anonymous>":return"Anonymous";case"new":return"Constructor";default:return e}}log(e,t,n={}){if(this.shouldLog(e)){const o=this.formatLogEntry(e,t,n);this.writeToTransports(o)}}shouldLog(e){return this.levels[e]<=this.levels[this.options.level]}formatLogEntry(e,t,n){return{timestamp:this.options.timestamp?(new Date).toISOString():null,level:e,caller:this.getCaller(),message:t,meta:n}}writeToTransports(e){0===this.transports.length?(new o).write(e):this.transports.forEach((t=>{t.write(e)}))}}["error","warn","info","debug"].forEach((e=>{s.prototype[e]=function(t,n,o=!1){o?(console.log("\n---------------- Important ----------------\n"),this.log(e,t,n),console.log("\n-----------------------------------------\n")):this.log(e,t,n)}})),e.exports=s},44:(e,t,n)=>{const o=n(828),s=n(633),r=n(592),a=n(61),i=n(313),l=n(902);e.exports={Logger:o,ConsoleTransport:s,FileTransport:r,HTMLTransport:a,MarkdownTransport:i,BrowserTransport:l}},902:e=>{e.exports=class{constructor(e={}){this.options={colorize:!0,gap:0,type:"standard",prettyObjects:!1,...e},this.styles={error:"color: #ff0000; font-weight: bold",warn:"color: #ffa500; font-weight: bold",info:"color: #00bcd4; font-weight: bold",debug:"color: #9e9e9e; font-weight: bold",timestamp:"color: #e3e3e3; font-weight: bold",caller:"color:rgb(224, 59, 222); font-weight: bold",meta:"color:rgb(169, 221, 240); font-weight: bold",black:"color: #000000",red:"color: #ff0000",green:"color: #4caf50",yellow:"color: #ffeb3b",blue:"color: #2196f3",magenta:"color: #e91e63",cyan:"color: #00bcd4",white:"color: #ffffff",gray:"color: #9e9e9e"}}write(e){switch(this.options.type){case"standard":default:this.log_standard(e);break;case"json":this.log_json(e);break;case"detailed":this.log_detailed(e)}}prettyPrintObject(e){return JSON.stringify(e,null,2)}log_standard(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;let a=[],i="";if(t&&(this.options.colorize?a.push(this.styles.timestamp):a.push("font-weight: bold"),i+=`%c [ ${t} ] `),o&&(this.options.colorize?a.push(this.styles.caller):a.push("font-weight: bold"),i+=`%c [ ${o} ] `),this.options.colorize?a.push(this.styles[n],""):a.push("font-weight: bold",""),i+=`%c ${n.toUpperCase()}%c: ${s}`,Object.keys(r).length>0&&(this.options.prettyObjects?i+=`\n\n${JSON.stringify(r,null,2)}`:i+=`\n${JSON.stringify(r)}`),this.options.colorize){const e=Object.keys(r);e.forEach((e=>{a.push(this.styles.meta,"")}));const t=this.options.prettyObjects?i.lastIndexOf("\n\n"):i.lastIndexOf("\n");if(-1!==t){const n=i.substring(0,t);let o=i.substring(t);e.forEach((e=>{o=this.options.prettyObjects?o.replace(new RegExp(`"(${e})"(?=\\s*:)`,"g"),'%c"$1"%c'):o.replace(`"${e}"`,`%c"${e}"%c`)})),i=n+o}}switch(n){case"error":console.error(i,...a);break;case"warn":console.warn(i,...a);break;case"debug":console.debug(i,...a);break;default:console.log(i,...a)}this.options.gap>0&&console.log("\n".repeat(this.options.gap))}log_json(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e,a={timestamp:t,level:n,caller:o,message:s,meta:r};let i="",l=[];switch(i=this.options.prettyObjects?this.prettyPrintObject(a):JSON.stringify(a),this.options.colorize&&(Object.keys(a).forEach((e=>{i=i.replace(new RegExp(`"${e}"`,"g"),`%c"${e}"%c`),l.push(this.styles.timestamp,"")})),Object.keys(a.meta).forEach((e=>{i=i.replace(new RegExp(`"${e}"`,"g"),`%c"${e}"%c`),l.push(this.styles.meta,"")}))),n){case"error":console.error(i,...l);break;case"warn":console.warn(i,...l);break;case"debug":console.debug(i,...l);break;default:console.log(i,...l)}this.options.gap>0&&console.log("\n".repeat(this.options.gap))}log_detailed(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;console.groupCollapsed(`%c${n.toUpperCase()}: ${s}`,this.styles[n]),t&&console.log("%cTimestamp:%c %s","font-weight: bold","",t),console.log("%cCaller:%c %s","font-weight: bold","",o),console.log("%cMessage:%c %s","font-weight: bold","",s),Object.keys(r).length>0&&(console.log("%cMeta:%c","font-weight: bold",""),this.options.prettyObjects?console.log(r):console.log(JSON.stringify(r,null,2))),console.groupEnd(),this.options.gap>0&&console.log("\n".repeat(this.options.gap))}}},633:e=>{e.exports=class{constructor(e={}){this.options={colorize:!0,gap:0,type:"standard",prettyObjects:!1,...e},this.colors={error:"[31m",warn:"[33m",info:"[36m",debug:"[90m",reset:"[0m"}}write(e){switch(this.options.type){case"standard":default:this.log_standard(e);break;case"json":this.log_json(e);break;case"detailed":this.log_detailed(e)}}prettyPrintObject(e){return JSON.stringify(e,null,2)}log_standard(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;let a="";t&&(a+=`[${t}] `),a+=`(${o}) `;const i=`${n.toUpperCase()}: ${s}`;if(this.options.colorize?a+=`${this.colors[n]}${i}${this.colors.reset}`:a+=i,this.options.prettyObjects){let e=this.prettyPrintObject(r);this.options.colorize?(e=e.replace(/"([^"]+)":/g,`${this.colors[n]}"$1"${this.colors.reset}:`),a+=` \n${e}`):a+=` ${e}`}else Object.keys(r).length>0&&(a+=` ${JSON.stringify(r)}`);switch(this.options.gap>0&&(a+="\n".repeat(this.options.gap)),n){case"error":console.error(a);break;case"warn":console.warn(a);break;case"debug":console.debug(a);break;default:console.log(a)}}log_json(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e,a={timestamp:t,level:n,caller:o,message:s,meta:r};let i=JSON.stringify(a);this.options.prettyObjects&&(i=this.prettyPrintObject(JSON.parse(i))),this.options.colorize&&(i=i.replace(/"([^"]+)":/g,`${this.colors[n]}"$1"${this.colors.reset}:`)),this.options.gap>0&&(i=i.replace(/\n/g,"\n".repeat(this.options.gap))),console.log(i)}log_detailed(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e,a={horizontal:"─",divider:"─"},i=()=>a.divider.repeat(80),l=(e,t)=>{const n=`${e}: `,o="object"==typeof t?this.options.prettyObjects?this.prettyPrintObject(t):JSON.stringify(t):String(t);return`${n.padEnd(12)}${o}`};let c=[];c.push(i()),t&&(c.push(l("Timestamp",t)),c.push(i()));const p=this.options.colorize?`${this.colors[n]}${n.toUpperCase()}${this.colors.reset}`:n.toUpperCase();c.push(l("Level",p)),c.push(i()),c.push(l("Caller",o)),c.push(i()),c.push(l("Message",s)),Object.keys(r).length>0&&(c.push(i()),c.push(l("Meta",r))),c.push(i());let g=c.join("\n");console.log(g)}}},592:(e,t,n)=>{const o=n(336),s=n(640);e.exports=class{constructor(e={}){this.options={filepath:"logs/output.txt",type:"standard",prettyObjects:!0,gap:1,timestamp:!0,...e};const t=s.dirname(this.options.filepath);o.existsSync(t)||o.mkdirSync(t,{recursive:!0}),o.writeFileSync(this.options.filepath,"")}write(e){switch(this.options.type){case"standard":default:this.log_standard(e);break;case"json":this.log_json(e);break;case"detailed":this.log_detailed(e)}}prettyPrintObject(e){return JSON.stringify(e,null,2)}appendToFile(e){o.appendFileSync(this.options.filepath,e+"\n")}log_standard(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;let a="";t&&(a+=`[${t}] `),a+=`[${n.toUpperCase()}] `,o&&(a+=`(${o}) `),a+=s,Object.keys(r).length>0&&(a+="\n",a+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r)),a+="\n"+"-".repeat(80),this.options.gap>0&&(a+="\n".repeat(this.options.gap)),this.appendToFile(a)}log_json(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e,a={timestamp:t,level:n,caller:o,message:s,meta:r};let i=this.options.prettyObjects?this.prettyPrintObject(a):JSON.stringify(a);i+="\n"+"-".repeat(80),this.options.gap>0&&(i+="\n".repeat(this.options.gap)),this.appendToFile(i)}log_detailed(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;let a="";a+="=".repeat(80)+"\n",a+=`Level: ${n.toUpperCase()}\n`,t&&(a+=`Time: ${t}\n`),o&&(a+=`Caller: ${o}\n`),a+=`Message: ${s}\n`,Object.keys(r).length>0&&(a+="\nMetadata:\n",a+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r)),a+="\n"+"=".repeat(80),this.options.gap>0&&(a+="\n".repeat(this.options.gap)),this.appendToFile(a)}}},61:(e,t,n)=>{const o=n(336),s=n(640);e.exports=class{constructor(e={}){this.options={filepath:"logs/output.html",logTitle:"Application Logs",...e};const t=s.dirname(this.options.filepath);o.existsSync(t)||o.mkdirSync(t,{recursive:!0});const n=`\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <title>${this.options.logTitle}</title>\n        <style>\n          :root {\n            --bg-color:#F2FFEC;\n            --text-color: #333333;\n            --border-color: #dddddd;\n            --meta-bg:#ECF2FF;\n            --search-bg:#ECF2FF;\n          }\n\n          [data-theme="dark"] {\n            --bg-color: #1a1a1a;\n            --text-color: #e0e0e0;\n            --border-color: #404040;\n            --meta-bg: #2d2d2d;\n            --search-bg: #2d2d2d;\n          }\n\n          body { \n            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n            margin: 20px;\n            background-color: var(--bg-color);\n            color: var(--text-color);\n            transition: background-color 0.3s, color 0.3s;\n            line-height: 1.5;\n          }\n\n          .log-entry { \n            border: 1px solid var(--border-color); \n            margin: 10px 0; \n            padding: 15px; \n            border-radius: 8px;\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n            display: flex;\n            flex-direction: column;\n            gap: 0.8rem;\n            transition: transform 0.2s ease;\n          }\n\n          .log-entry:hover {\n            transform: translateY(-2px);\n          }\n\n          .log-content {\n            display: flex;\n            flex-direction: column;\n            gap: 0.5rem;\n          }\n\n          .log-message {\n            font-size: 1.1rem;\n            font-weight: 500;\n            margin: 8px 0;\n          }\n\n          .log-details {\n            font-size: 0.9rem;\n            color: var(--text-color);\n            opacity: 0.8;\n          }\n\n          .meta-container {\n            display: flex;\n            justify-content: flex-end;\n            align-items: flex-start;\n            gap: 1rem;\n            margin-top: 0.5rem;\n          }\n\n          .metadata { \n            display: none; \n            background: var(--meta-bg); \n            padding: 1rem; \n            border-radius: 6px;\n            max-height: 300px;\n            overflow-y: auto;\n            word-wrap: break-word;\n            font-family: 'Monaco', 'Consolas', monospace;\n            font-size: 0.9rem;\n            flex: 1;\n            margin: 0;\n          }\n\n          .toggle-meta { \n            cursor: pointer; \n            font-size: 0.9rem;\n            font-weight: 500;\n            padding: 0.5rem 1rem;\n            border-radius: 6px;\n            background-color: var(--meta-bg);\n            color: var(--text-color);\n            border: 1px solid var(--border-color);\n            transition: all 0.2s ease;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n            white-space: nowrap;\n          }\n\n          .toggle-meta:hover {\n            background-color: var(--text-color);\n            color: var(--bg-color);\n          }\n\n          .ERROR { \n            background-color: rgba(255, 0, 0, 0.1);\n            border-left: 4px solid rgba(255, 0, 0, 0.7);\n          }\n          .WARN { \n            background-color: rgba(255, 165, 0, 0.1);\n            border-left: 4px solid rgba(255, 165, 0, 0.7);\n          }\n          .INFO { \n            background-color: rgba(0, 191, 255, 0.1);\n            border-left: 4px solid rgba(0, 191, 255, 0.7);\n          }\n          \n          .search-container { \n            position: sticky; \n            top: 0; \n            background: var(--search-bg);\n            padding: 15px 0; \n            border-bottom: 1px solid var(--border-color);\n            z-index: 100;\n            display: flex;\n            align-items: center;\n            gap: 15px;\n            backdrop-filter: blur(8px);\n          }\n\n          .search-input {\n            width: 300px;\n            padding: 10px 15px;\n            border: 1px solid var(--border-color);\n            border-radius: 6px;\n            background: var(--bg-color);\n            color: var(--text-color);\n            margin-left: 1rem;\n            transition: all 0.2s ease;\n          }\n\n          .search-input:focus {\n            outline: none;\n            border-color: var(--text-color);\n            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);\n          }\n\n          .theme-toggle {\n            padding: 10px 20px;\n            border-radius: 6px;\n            border: 1px solid var(--border-color);\n            background: var(--bg-color);\n            color: var(--text-color);\n            cursor: pointer;\n            transition: all 0.2s ease;\n            font-weight: 500;\n          }\n\n          .theme-toggle:hover {\n            background: var(--text-color);\n            color: var(--bg-color);\n          }\n\n          .hidden { display: none; }\n          .highlight { \n            background-color: rgba(255, 255, 0, 0.3);\n            padding: 2px 4px;\n            border-radius: 3px;\n          }\n        </style>\n        <script>\n          function toggleMetadata(id) {\n            const meta = document.getElementById('meta-' + id);\n            meta.style.display = meta.style.display === 'none' ? 'block' : 'none';\n          }\n\n          function searchLogs() {\n            const searchTerm = document.getElementById('searchInput').value.toLowerCase();\n            const logEntries = document.getElementsByClassName('log-entry');\n            const resultsCount = document.getElementById('resultsCount');\n            let matches = 0;\n\n            // Remove existing highlights\n            document.querySelectorAll('.highlight').forEach(el => {\n              el.outerHTML = el.innerHTML;\n            });\n\n            Array.from(logEntries).forEach(entry => {\n              const text = entry.innerText.toLowerCase();\n              const containsMatch = text.includes(searchTerm);\n              entry.classList.toggle('hidden', searchTerm && !containsMatch);\n              \n              if (containsMatch && searchTerm) {\n                matches++;\n                // Highlight matching text\n                highlightText(entry, searchTerm);\n              }\n            });\n\n            // Update results count\n            if (searchTerm) {\n              resultsCount.textContent = \`Found \${matches} matches\`;\n            } else {\n              resultsCount.textContent = '';\n            }\n          }\n\n          function highlightText(element, searchTerm) {\n            const walker = document.createTreeWalker(\n              element,\n              NodeFilter.SHOW_TEXT,\n              null,\n              false\n            );\n\n            let node;\n            while (node = walker.nextNode()) {\n              const text = node.textContent.toLowerCase();\n              const index = text.indexOf(searchTerm.toLowerCase());\n              \n              if (index >= 0 && node.parentElement.className !== 'highlight') {\n                const spanNode = document.createElement('span');\n                spanNode.className = 'highlight';\n                const before = node.textContent.substring(0, index);\n                const match = node.textContent.substring(index, index + searchTerm.length);\n                const after = node.textContent.substring(index + searchTerm.length);\n                \n                spanNode.textContent = match;\n                const fragment = document.createDocumentFragment();\n                if (before) fragment.appendChild(document.createTextNode(before));\n                fragment.appendChild(spanNode);\n                if (after) fragment.appendChild(document.createTextNode(after));\n                \n                node.parentNode.replaceChild(fragment, node);\n              }\n            }\n          }\n\n          // Add theme toggle function\n          function toggleTheme() {\n            const html = document.documentElement;\n            const currentTheme = html.getAttribute('data-theme');\n            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';\n            \n            html.setAttribute('data-theme', newTheme);\n            localStorage.setItem('theme', newTheme);\n            \n            const button = document.getElementById('themeToggle');\n            button.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';\n          }\n\n          // Initialize theme from localStorage\n          document.addEventListener('DOMContentLoaded', () => {\n            const savedTheme = localStorage.getItem('theme') || 'light';\n            document.documentElement.setAttribute('data-theme', savedTheme);\n            const button = document.getElementById('themeToggle');\n            button.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';\n          });\n        <\/script>\n      </head>\n      <body>\n        <h1>${this.options.logTitle}</h1>\n        <div class="search-container">\n          <input \n            type="text" \n            id="searchInput" \n            class="search-input" \n            placeholder="Search logs..." \n            oninput="searchLogs()"\n          >\n          <button id="themeToggle" class="theme-toggle" onclick="toggleTheme()">\n            🌙 Dark Mode\n          </button>\n          <span id="resultsCount"></span>\n        </div>\n        <div id="log-container">\n    `;o.writeFileSync(this.options.filepath,n),this.entryCount=0}write(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;this.entryCount++;let a=`\n      <div class="log-entry ${n.toUpperCase()}">\n        <div class="log-content">\n          <div class="log-details">\n            ${t?`<strong>Time:</strong> ${t} |`:""}\n            <strong>Level:</strong> ${n.toUpperCase()} |\n            <strong>Caller:</strong> ${o}\n          </div>\n          <div class="log-message">${s}</div>\n        </div>\n    `;Object.keys(r).length>0&&(a+=`\n        <div class="meta-container">\n          <div id="meta-${this.entryCount}" class="metadata">\n            ${this.prettifyMeta(r)}\n          </div>\n          <button class="toggle-meta" onclick="toggleMetadata(${this.entryCount})">\n            Toggle Details\n          </button>\n        </div>\n      `),a+="</div>",this.appendToFile(a)}prettifyMeta(e){if(!e||"object"!=typeof e)return"";let t="";for(const[n,o]of Object.entries(e))t+=`\n        <div>\n          <strong>${n}:</strong> ${JSON.stringify(o)}\n        </div>\n      `;return t}appendToFile(e){o.appendFileSync(this.options.filepath,e)}close(){o.appendFileSync(this.options.filepath,"\n        </div>\n      </body>\n      </html>\n    ")}}},313:(e,t,n)=>{const o=n(336),s=n(640);e.exports=class{constructor(e={}){this.options={colorize:!1,gap:0,type:"standard",prettyObjects:!0,filepath:"logs/output.md",logTitle:"Application Logs",...e};const t=s.dirname(this.options.filepath);o.existsSync(t)||o.mkdirSync(t,{recursive:!0}),o.writeFileSync(this.options.filepath,`# ${this.options.logTitle}\n\n`)}write(e){switch(this.options.type){case"standard":default:this.log_standard(e);break;case"json":this.log_json(e);break;case"detailed":this.log_detailed(e)}}prettyPrintObject(e){return JSON.stringify(e,null,2)}appendToFile(e){o.appendFileSync(this.options.filepath,e+"\n")}log_standard(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;let a="";a+=`${[t?`**Time:** ${t}`:null,o?`**Caller:** ${o}`:null,`**Level:** ${n.toUpperCase()}`,`**Message:** ${s}`].filter(Boolean).join(" | ")}\n`,Object.keys(r).length>0&&(a+="\n```json\n",a+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r),a+="\n```\n"),this.options.gap>0&&(a+="\n".repeat(this.options.gap)),a+="\n---\n\n",this.appendToFile(a)}log_json(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e,a={timestamp:t,level:n,caller:o,message:s,meta:r};let i="```json\n";i+=this.options.prettyObjects?this.prettyPrintObject(a):JSON.stringify(a),i+="\n```\n\n---\n\n",this.options.gap>0&&(i+="\n".repeat(this.options.gap)),this.appendToFile(i)}log_detailed(e){const{timestamp:t,level:n,caller:o,message:s,meta:r}=e;let a="";a+=`### ${n.toUpperCase()}: ${s}\n\n`,t&&(a+=`- **Timestamp:** ${t}\n`),a+=`- **Level:** ${n.toUpperCase()}\n`,a+=`- **Caller:** ${o}\n`,a+=`- **Message:** ${s}\n\n`,Object.keys(r).length>0&&(a+="### Metadata\n\n```json\n",a+=this.options.prettyObjects?this.prettyPrintObject(r):JSON.stringify(r),a+="\n```\n"),this.options.gap>0&&(a+="\n".repeat(this.options.gap)),a+="\n---\n\n",this.appendToFile(a)}}},336:()=>{},640:()=>{}},t={},function n(o){var s=t[o];if(void 0!==s)return s.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(44);var e,t}));