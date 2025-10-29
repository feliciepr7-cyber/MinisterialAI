#!/usr/bin/env python3
"""
Ministerial AI - Servidor Simple
Servidor HTTP para la aplicación Ministerial AI
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuración del servidor
PORT = 3000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    print(f"🕊️  Iniciando servidor de Ministerial AI...")
    print(f"📁 Directorio: {DIRECTORY}")
    print(f"🌐 Puerto: {PORT}")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://localhost:{PORT}"
            print(f"✅ Servidor funcionando en: {server_url}")
            print(f"📖 Abriendo navegador automáticamente...")
            
            # Abrir navegador automáticamente
            webbrowser.open(server_url)
            
            print(f"\n🚀 Aplicación Ministerial AI lista para usar!")
            print(f"💡 Para detener el servidor, presiona Ctrl+C")
            print(f"🔗 URL manual: {server_url}")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Servidor detenido por el usuario")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Error: El puerto {PORT} ya está en uso")
            print(f"💡 Intenta con otro puerto o detén el proceso que usa el puerto {PORT}")
        else:
            print(f"❌ Error del servidor: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    main()