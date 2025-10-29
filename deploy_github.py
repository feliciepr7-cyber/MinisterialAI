#!/usr/bin/env python3
"""
Ministerial AI - GitHub Pages Deploy Script
Script automatizado para preparar y subir a GitHub Pages
"""

import os
import sys
import json
import webbrowser
import time
from pathlib import Path

class GitHubPagesDeployer:
    def __init__(self):
        self.repo_url = ""
        self.github_username = ""
        
    def check_files(self):
        """Verificar que todos los archivos necesarios están presentes"""
        required_files = {
            'index.html': 'Aplicación principal',
            'styles.css': 'Estilos de la aplicación', 
            'script.js': 'Lógica del agente AI',
            'README.md': 'Documentación'
        }
        
        print("🔍 Verificando archivos para GitHub Pages...")
        print("-" * 50)
        
        missing_files = []
        for file, description in required_files.items():
            if Path(file).exists():
                print(f"✅ {file:<15} - {description}")
            else:
                print(f"❌ {file:<15} - {description} (FALTA)")
                missing_files.append(file)
        
        if missing_files:
            print(f"\n❌ Faltan {len(missing_files)} archivos requeridos")
            print("💡 Asegúrate de que todos los archivos estén presentes")
            return False
        
        print(f"\n✅ Todos los archivos están presentes ({len(required_files)} archivos)")
        return True
    
    def fix_paths_for_github_pages(self):
        """Corregir rutas para GitHub Pages"""
        print("\n🔧 Verificando rutas para GitHub Pages...")
        
        try:
            # Leer index.html
            with open('index.html', 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Corregir rutas absolutas por relativas
            original_content = content
            
            # Corregir styles.css
            content = content.replace('href="./styles.css"', 'href="./styles.css"')
            content = content.replace('href="/styles.css"', 'href="./styles.css"')
            
            # Corregir script.js
            content = content.replace('src="./script.js"', 'src="./script.js"')
            content = content.replace('src="/script.js"', 'src="./script.js"')
            
            # Guardar si hay cambios
            if content != original_content:
                with open('index.html', 'w', encoding='utf-8') as f:
                    f.write(content)
                print("✅ Rutas corregidas para GitHub Pages")
            else:
                print("✅ Rutas ya están correctas")
            
            return True
            
        except Exception as e:
            print(f"❌ Error corrigiendo rutas: {e}")
            return False
    
    def show_deployment_steps(self):
        """Mostrar pasos de despliegue"""
        print("\n🚀 PASOS PARA DESPLEGAR EN GITHUB PAGES:")
        print("=" * 60)
        print("1️⃣  CREAR REPOSITORIO EN GITHUB:")
        print("   • Ve a https://github.com y haz login")
        print("   • Click 'New repository'")
        print("   • Nombre: ministerial-ai")
        print("   • Descripción: Asistente Bíblico del Ministerio")
        print("   • ✅ Public (debe ser público)")
        print("   • ✅ Add README file")
        print("   • Click 'Create repository'")
        
        print("\n2️⃣  SUBIR ARCHIVOS:")
        print("   • Click 'uploading an existing file'")
        print("   • Arrastra TODOS los archivos:")
        print("     ✅ index.html")
        print("     ✅ styles.css") 
        print("     ✅ script.js")
        print("     ✅ README.md")
        print("     ✅ DEPLOYMENT.md")
        print("     ✅ GITHUB_PAGES_GUIDE.md")
        print("   • Commit message: 'Deploy Ministerial AI'")
        print("   • Click 'Commit changes'")
        
        print("\n3️⃣  ACTIVAR GITHUB PAGES:")
        print("   • Ve a Settings del repositorio")
        print("   • Scroll hasta 'Pages' en el menú lateral")
        print("   • Source: 'Deploy from a branch'")
        print("   • Branch: 'main'")
        print("   • Folder: '/ (root)'")
        print("   • Click 'Save'")
        
        print("\n4️⃣  OBTENER URL:")
        print("   • Espera 5-10 minutos")
        print("   • Tu app estará en:")
        print("     https://tu_usuario.github.io/ministerial-ai")
        
        print("\n" + "=" * 60)
    
    def generate_upload_instructions(self):
        """Generar instrucciones de subida"""
        print("\n📁 ARCHIVOS PARA SUBIR:")
        print("-" * 30)
        
        files_to_upload = [
            'index.html',
            'styles.css', 
            'script.js',
            'README.md',
            'DEPLOYMENT.md',
            'GITHUB_PAGES_GUIDE.md'
        ]
        
        for file in files_to_upload:
            if Path(file).exists():
                size = Path(file).stat().st_size
                print(f"✅ {file:<25} ({size:,} bytes)")
            else:
                print(f"❌ {file:<25} (FALTA)")
    
    def open_github(self):
        """Abrir GitHub en el navegador"""
        try:
            print("\n🌐 Abriendo GitHub...")
            webbrowser.open('https://github.com/new')
            time.sleep(2)
            webbrowser.open('https://github.com/settings/pages')
            print("✅ GitHub abierto en el navegador")
        except Exception as e:
            print(f"❌ Error abriendo GitHub: {e}")
    
    def show_final_checklist(self):
        """Mostrar checklist final"""
        print("\n✅ CHECKLIST FINAL:")
        print("-" * 25)
        checklist = [
            "Crear repositorio 'ministerial-ai' en GitHub",
            "Subir todos los archivos de la aplicación",
            "Activar GitHub Pages en Settings",
            "Esperar 5-10 minutos para activación",
            "Probar la URL: https://usuario.github.io/ministerial-ai",
            "Verificar que el chat funciona correctamente",
            "Probar cambio de idioma (ES/EN)",
            "Verificar información del ministerio en sidebar",
            "Probar con algunas preguntas bíblicas",
            "Confirmar que los enlaces de donación funcionan"
        ]
        
        for i, item in enumerate(checklist, 1):
            print(f"{i:2}. ☐ {item}")
        
        print(f"\n📊 Total: {len(checklist)} pasos de verificación")
    
    def run(self):
        """Ejecutar el proceso completo"""
        print("🕊️  MINISTERIAL AI - GitHub Pages Deployer")
        print("=" * 50)
        
        # Verificar archivos
        if not self.check_files():
            print("\n❌ No se puede continuar sin los archivos necesarios")
            return False
        
        # Corregir rutas
        if not self.fix_paths_for_github_pages():
            print("\n⚠️  Advertencia: No se pudieron corregir todas las rutas")
        
        # Mostrar pasos
        self.show_deployment_steps()
        
        # Mostrar archivos
        self.generate_upload_instructions()
        
        # Preguntar si abrir GitHub
        print("\n🤔 ¿Quieres que abra GitHub en tu navegador?")
        print("   (s/n): ", end="")
        
        try:
            response = input().lower().strip()
            if response in ['s', 'sí', 'si', 'y', 'yes']:
                self.open_github()
        except (EOFError, KeyboardInterrupt):
            print("\n")
        
        # Mostrar checklist
        self.show_final_checklist()
        
        print("\n🎯 ¡Listo para desplegar!")
        print("📖 Lee GITHUB_PAGES_GUIDE.md para instrucciones detalladas")
        print("🚀 ¡Que Dios bendiga tu ministerio!")
        
        return True

def main():
    """Función principal"""
    deployer = GitHubPagesDeployer()
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == '--check':
            deployer.check_files()
        elif command == '--fix-paths':
            deployer.fix_paths_for_github_pages()
        elif command == '--github':
            deployer.open_github()
        elif command in ['--help', '-h']:
            print("""
🕊️  Ministerial AI - GitHub Pages Deployer

USO:
    python3 deploy_github.py [opciones]

OPCIONES:
    --check         Verificar archivos para despliegue
    --fix-paths     Corregir rutas para GitHub Pages
    --github        Abrir GitHub en el navegador
    --help, -h      Mostrar esta ayuda
    (sin argumentos) Ejecutar proceso completo

EJEMPLOS:
    python3 deploy_github.py              # Proceso completo
    python3 deploy_github.py --check      # Solo verificar archivos
    python3 deploy_github.py --github     # Abrir GitHub
            """)
            return
        else:
            print(f"❌ Opción desconocida: {command}")
            print("💡 Usa --help para ver las opciones disponibles")
            return
    
    # Ejecutar proceso completo
    deployer.run()

if __name__ == "__main__":
    main()