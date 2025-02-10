const fs = require("fs");
const path = require("path");

class HTMLTransport {
  constructor(options = {}) {
    this.options = {
      filepath: "logs/output.html",
      logTitle: "Application Logs",
      ...options,
    };

    // Ensure the directory exists
    const dir = path.dirname(this.options.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create or clear the file with HTML boilerplate and basic styling
    const htmlHeader = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${this.options.logTitle}</title>
        <style>
          :root {
            --bg-color:#F2FFEC;
            --text-color: #333333;
            --border-color: #dddddd;
            --meta-bg:#ECF2FF;
            --search-bg:#ECF2FF;
          }

          [data-theme="dark"] {
            --bg-color: #1a1a1a;
            --text-color: #e0e0e0;
            --border-color: #404040;
            --meta-bg: #2d2d2d;
            --search-bg: #2d2d2d;
          }

          body { 
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 20px;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.3s, color 0.3s;
            line-height: 1.5;
          }

          .log-entry { 
            border: 1px solid var(--border-color); 
            margin: 10px 0; 
            padding: 15px; 
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            transition: transform 0.2s ease;
          }

          .log-entry:hover {
            transform: translateY(-2px);
          }

          .log-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .log-message {
            font-size: 1.1rem;
            font-weight: 500;
            margin: 8px 0;
          }

          .log-details {
            font-size: 0.9rem;
            color: var(--text-color);
            opacity: 0.8;
          }

          .meta-container {
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            gap: 1rem;
            margin-top: 0.5rem;
          }

          .metadata { 
            display: none; 
            background: var(--meta-bg); 
            padding: 1rem; 
            border-radius: 6px;
            max-height: 300px;
            overflow-y: auto;
            word-wrap: break-word;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
            flex: 1;
            margin: 0;
          }

          .toggle-meta { 
            cursor: pointer; 
            font-size: 0.9rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            background-color: var(--meta-bg);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            white-space: nowrap;
          }

          .toggle-meta:hover {
            background-color: var(--text-color);
            color: var(--bg-color);
          }

          .ERROR { 
            background-color: rgba(255, 0, 0, 0.1);
            border-left: 4px solid rgba(255, 0, 0, 0.7);
          }
          .WARN { 
            background-color: rgba(255, 165, 0, 0.1);
            border-left: 4px solid rgba(255, 165, 0, 0.7);
          }
          .INFO { 
            background-color: rgba(0, 191, 255, 0.1);
            border-left: 4px solid rgba(0, 191, 255, 0.7);
          }
          
          .search-container { 
            position: sticky; 
            top: 0; 
            background: var(--search-bg);
            padding: 15px 0; 
            border-bottom: 1px solid var(--border-color);
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 15px;
            backdrop-filter: blur(8px);
          }

          .search-input {
            width: 300px;
            padding: 10px 15px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-color);
            color: var(--text-color);
            margin-left: 1rem;
            transition: all 0.2s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: var(--text-color);
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
          }

          .theme-toggle {
            padding: 10px 20px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            color: var(--text-color);
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
          }

          .theme-toggle:hover {
            background: var(--text-color);
            color: var(--bg-color);
          }

          .hidden { display: none; }
          .highlight { 
            background-color: rgba(255, 255, 0, 0.3);
            padding: 2px 4px;
            border-radius: 3px;
          }
        </style>
        <script>
          function toggleMetadata(id) {
            const meta = document.getElementById('meta-' + id);
            meta.style.display = meta.style.display === 'none' ? 'block' : 'none';
          }

          function searchLogs() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const logEntries = document.getElementsByClassName('log-entry');
            const resultsCount = document.getElementById('resultsCount');
            let matches = 0;

            // Remove existing highlights
            document.querySelectorAll('.highlight').forEach(el => {
              el.outerHTML = el.innerHTML;
            });

            Array.from(logEntries).forEach(entry => {
              const text = entry.innerText.toLowerCase();
              const containsMatch = text.includes(searchTerm);
              entry.classList.toggle('hidden', searchTerm && !containsMatch);
              
              if (containsMatch && searchTerm) {
                matches++;
                // Highlight matching text
                highlightText(entry, searchTerm);
              }
            });

            // Update results count
            if (searchTerm) {
              resultsCount.textContent = \`Found \${matches} matches\`;
            } else {
              resultsCount.textContent = '';
            }
          }

          function highlightText(element, searchTerm) {
            const walker = document.createTreeWalker(
              element,
              NodeFilter.SHOW_TEXT,
              null,
              false
            );

            let node;
            while (node = walker.nextNode()) {
              const text = node.textContent.toLowerCase();
              const index = text.indexOf(searchTerm.toLowerCase());
              
              if (index >= 0 && node.parentElement.className !== 'highlight') {
                const spanNode = document.createElement('span');
                spanNode.className = 'highlight';
                const before = node.textContent.substring(0, index);
                const match = node.textContent.substring(index, index + searchTerm.length);
                const after = node.textContent.substring(index + searchTerm.length);
                
                spanNode.textContent = match;
                const fragment = document.createDocumentFragment();
                if (before) fragment.appendChild(document.createTextNode(before));
                fragment.appendChild(spanNode);
                if (after) fragment.appendChild(document.createTextNode(after));
                
                node.parentNode.replaceChild(fragment, node);
              }
            }
          }

          // Add theme toggle function
          function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const button = document.getElementById('themeToggle');
            button.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
          }

          // Initialize theme from localStorage
          document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            const button = document.getElementById('themeToggle');
            button.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
          });
        </script>
      </head>
      <body>
        <h1>${this.options.logTitle}</h1>
        <div class="search-container">
          <input 
            type="text" 
            id="searchInput" 
            class="search-input" 
            placeholder="Search logs..." 
            oninput="searchLogs()"
          >
          <button id="themeToggle" class="theme-toggle" onclick="toggleTheme()">
            🌙 Dark Mode
          </button>
          <span id="resultsCount"></span>
        </div>
        <div id="log-container">
    `;

    fs.writeFileSync(this.options.filepath, htmlHeader);
    this.entryCount = 0;
  }

  write(logEntry) {
    const { timestamp, level, caller, message, meta } = logEntry;
    this.entryCount++;

    let output = `
      <div class="log-entry ${level.toUpperCase()}">
        <div class="log-content">
          <div class="log-details">
            ${timestamp ? `<strong>Time:</strong> ${timestamp} |` : ""}
            <strong>Level:</strong> ${level.toUpperCase()} |
            <strong>Caller:</strong> ${caller}
          </div>
          <div class="log-message">${message}</div>
        </div>
    `;

    if (Object.keys(meta).length > 0) {
      output += `
        <div class="meta-container">
          <div id="meta-${this.entryCount}" class="metadata">
            ${this.prettifyMeta(meta)}
          </div>
          <button class="toggle-meta" onclick="toggleMetadata(${
            this.entryCount
          })">
            Toggle Details
          </button>
        </div>
      `;
    }

    output += `</div>`;
    this.appendToFile(output);
  }

  prettifyMeta(meta) {
    if (!meta || typeof meta !== "object") {
      return "";
    }

    let html = "";
    for (const [key, value] of Object.entries(meta)) {
      html += `
        <div>
          <strong>${key}:</strong> ${JSON.stringify(value)}
        </div>
      `;
    }
    return html;
  }

  appendToFile(content) {
    fs.appendFileSync(this.options.filepath, content);
  }

  close() {
    // Add closing HTML tags when done
    fs.appendFileSync(
      this.options.filepath,
      `
        </div>
      </body>
      </html>
    `
    );
  }
}

module.exports = HTMLTransport;
