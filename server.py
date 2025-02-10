from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def run_server(port=8000):
    while True:
        try:
            server = HTTPServer(('localhost', port), CORSRequestHandler)
            print(f"Starting server at http://localhost:{port}")
            print("Press Ctrl+C to stop")
            server.serve_forever()
        except OSError:
            port += 1
        except KeyboardInterrupt:
            break

run_server() 