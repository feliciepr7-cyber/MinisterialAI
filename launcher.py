#!/usr/bin/env python3
"""
Ministerial AI - Launcher Script
Script de lanzamiento simple para la aplicación Ministerial AI
"""

import os
import sys
import subprocess
import webbrowser
import time
from pathlib import Path

def check_requirements():
    """Verificar que los archivos necesarios estén presentes"""
    required_files = ['index.html', 'styles.css', 'script.js', 'server.py']
    missing_files = []
    
    for file in required_files:
        if not Path(file).exists():
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Archivos faltantes: {', '.join(missing_files)}")
        print("💡 Asegúrate de que todos los archivos de la aplicación estén presentes.")
        return False
    
    return True

def start_server():
    """Iniciar el servidor de desarrollo"""
    print("🕊️  Iniciando Ministerial AI...")
    print("📁 Verificando archivos...")
    
    if not check_requirements():
        sys.exit(1)
    
    print("✅ Archivos verificados correctamente")
    print("🚀 Iniciando servidor...")
    
    try:
        # Intentar abrir el navegador después de un breve delay
        def open_browser():
            time.sleep(2)
            webbrowser.open('http://localhost:3000')
        
        import threading
        browser_thread = threading.Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()
        
        # Iniciar el servidor
        result = subprocess.run([sys.executable, 'server.py'], check=True)
        
    except KeyboardInterrupt:
        print("\n🛑 Aplicación cerrada por el usuario")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al iniciar el servidor: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

def show_help():
    """Mostrar ayuda"""
    help_text = """
🕊️  Ministerial AI - Launcher

USO:
    python3 launcher.py [opciones]

OPCIONES:
    --help, -h     Mostrar esta ayuda
    --start, -s    Iniciar la aplicación (por defecto)
    --check        Verificar archivos solamente
    --info         Mostrar información del proyecto

EJEMPLOS:
    python3 launcher.py          # Iniciar aplicación
    python3 launcher.py --check  # Verificar archivos
    python3 launcher.py --info   # Mostrar información

DESARROLLO:
    • Abre http://localhost:3000 en tu navegador
    • La aplicación se actualiza automáticamente al guardar archivos
    • Presiona Ctrl+C para detener el servidor

SOPORTE:
    • Revisa README.md para documentación completa
    • Revisa DEPLOYMENT.md para opciones de despliegue
    • Usa las herramientas de desarrollador del navegador para depurar
    """
    print(help_text)

def show_info():
    """Mostrar información del proyecto"""
    info_text = """
🕊️  Ministerial AI - Información del Proyecto

DESCRIPCIÓN:
    Aplicación web de asistente AI para el ministerio del Rev. Frankie Felicie
    
CARACTERÍSTICAS:
    ✅ Asistente AI bíblico inteligente
    ✅ Base de datos de versículos RVR1960
    ✅ Información completa del ministerio
    ✅ Soporte bilingüe (Español/Inglés)
    ✅ Diseño responsivo y accesible
    ✅ Sin dependencias externas
    ✅ Implementación pura HTML/CSS/JS

TECNOLOGÍAS:
    • HTML5 con semántica moderna
    • CSS3 con variables personalizadas
    • JavaScript ES6+ vanilla
    • Python 3.6+ para servidor de desarrollo
    • Google Fonts para tipografía

ARCHIVOS PRINCIPALES:
    • index.html - Aplicación principal
    • styles.css - Estilos de la aplicación
    • script.js - Lógica del agente AI
    • server.py - Servidor de desarrollo
    • README.md - Documentación
    • DEPLOYMENT.md - Guía de despliegue

MINISTERIO:
    • Nombre: Frankie Felicie Ministries
    • Iglesia: Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc.
    • Ubicación: Lake Station, Indiana, USA
    • Web: https://frankiefelicie.net

DESARROLLO:
    • Puerto por defecto: 3000
    • Auto-recarga: Sí
    • Debugging: Browser DevTools
    • Testing: Multi-navegador recomendado

CONTRIBUCIÓN:
    Este proyecto está diseñado específicamente para Frankie Felicie Ministries.
    Para modificaciones, contactar al equipo de desarrollo del ministerio.
    """
    print(info_text)

def main():
    """Función principal"""
    if len(sys.argv) > 1:
        option = sys.argv[1].lower()
        
        if option in ['--help', '-h']:
            show_help()
            return
        elif option in ['--check']:
            if check_requirements():
                print("✅ Todos los archivos requeridos están presentes")
            else:
                print("❌ Faltan archivos requeridos")
            return
        elif option in ['--info']:
            show_info()
            return
        elif option in ['--start', '-s']:
            start_server()
            return
        else:
            print(f"❌ Opción desconocida: {option}")
            print("💡 Usa --help para ver las opciones disponibles")
            return
    
    # Por defecto, iniciar la aplicación
    start_server()

if __name__ == "__main__":
    main()