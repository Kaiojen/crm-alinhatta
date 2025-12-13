#!/usr/bin/env python3
"""
Servidor HTTP simples para executar o CRM localmente
Execute: python server.py
Depois acesse: http://localhost:8000
"""

import http.server
import socketserver
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers CORS para permitir carregamento de recursos
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Log formatado
        print(f"[{self.address_string()}] {format % args}")

if __name__ == "__main__":
    # Mudar para o diretório do script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("🚀 Servidor CRM Alinhatta iniciado!")
        print("=" * 60)
        print(f"📂 Diretório: {os.getcwd()}")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"🌐 URL: http://127.0.0.1:{PORT}")
        print("=" * 60)
        print("Pressione Ctrl+C para parar o servidor")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Servidor parado.")

