# 🚀 Guía de Despliegue en GitHub Pages - Ministerial AI

## 📋 Preparativos Necesarios

### ✅ Requisitos:
- Cuenta de GitHub (gratuita)
- Los archivos de la aplicación Ministerial AI
- Git instalado en tu computadora (opcional pero recomendado)

## 🔧 Paso 1: Crear Repositorio en GitHub

### Opción A: Con Interfaz Web (Más Fácil)

1. **Ir a GitHub.com** y hacer login
2. **Click en "New repository"** (botón verde)
3. **Configurar el repositorio:**
   ```
   Repository name: ministerial-ai
   Description: Asistente Bíblico del Ministerio del Rev. Frankie Felicie
   ✅ Public (debe ser público para GitHub Pages gratuito)
   ✅ Add README file
   ✅ Add .gitignore (None está bien)
   Click "Create repository"
   ```

### Opción B: Con Git (Si tienes Git instalado)

```bash
# Crear repositorio local
mkdir ministerial-ai
cd ministerial-ai

# Inicializar git
git init
git add .
git commit -m "Initial commit"

# Conectar con GitHub (cambiar tu_usuario por tu nombre de usuario)
git remote add origin https://github.com/tu_usuario/ministerial-ai.git

# Subir a GitHub
git push -u origin main
```

## 📁 Paso 2: Subir Archivos de la Aplicación

### Subir Archivos via Web Interface:

1. **Ir a tu repositorio recién creado**
2. **Click en "uploading an existing file"** (enlace azul)
3. **Arrastrar todos los archivos de la aplicación:**
   ```
   ✅ index.html
   ✅ styles.css
   ✅ script.js
   ✅ server.py
   ✅ launcher.py
   ✅ README.md
   ✅ DEPLOYMENT.md
   ```
4. **Commit message:** "Add Ministerial AI application files"
5. **Click "Commit changes"**

### Estructura Final del Repositorio:
```
ministerial-ai/
├── index.html          ← Archivo principal
├── styles.css          ← Estilos
├── script.js           ← JavaScript
├── README.md           ← Documentación
├── DEPLOYMENT.md       ← Guía de despliegue
├── server.py           ← Servidor desarrollo
└── launcher.py         ← Launcher script
```

## ⚙️ Paso 3: Configurar GitHub Pages

### Activar GitHub Pages:

1. **Ir al repositorio en GitHub**
2. **Click en "Settings"** (tab superior)
3. **Scroll down hasta "Pages"** (en el menú lateral izquierdo)
4. **En "Source":**
   - **Seleccionar "Deploy from a branch"**
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. **Click "Save"**

### Obtener la URL:
- **GitHub Pages creará automáticamente la URL:**
  ```
  https://tu_usuario.github.io/ministerial-ai
  ```
- **La URL aparecerá en verde después de unos minutos**

## 🔧 Paso 4: Ajustes Necesarios para GitHub Pages

### A. Verificar que index.html está en la raíz
- ✅ **index.html debe estar en la raíz** del repositorio
- ✅ **No en una carpeta** dentro del repositorio

### B. Actualizar enlaces relativos (si es necesario)
**En index.html, asegurar que los enlaces sean relativos:**
```html
<!-- ✅ CORRECTO para GitHub Pages -->
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>

<!-- ❌ INCORRECTO -->
<link rel="stylesheet" href="/styles.css">
<script src="/script.js"></script>
```

### C. Verificar configuración de rutas
**En script.js, el agente AI debería funcionar sin problemas en GitHub Pages**

## 🕐 Paso 5: Verificar Despliegue

### Tiempo de activación:
- **Primera vez:** 5-10 minutos
- **Actualizaciones:** 1-3 minutos

### Verificar funcionamiento:
1. **Ir a:** `https://tu_usuario.github.io/ministerial-ai`
2. **Verificar que carga correctamente:**
   - ✅ Se muestra el header "Ministerial AI"
   - ✅ El chat funciona
   - ✅ El sidebar con info del ministerio aparece
   - ✅ El botón de idioma funciona
   - ✅ El agente responde preguntas

### Si no funciona:
1. **Revisar consola del navegador** (F12 → Console)
2. **Verificar que todos los archivos están subidos**
3. **Comprobar la URL en GitHub Pages settings**

## 🔄 Paso 6: Actualizaciones Futuras

### Para actualizar la aplicación:

1. **Hacer cambios en los archivos** localmente
2. **Subir a GitHub:**
   - **Opción A:** Drag & drop en GitHub.com
   - **Opción B:** Con Git:
   ```bash
   git add .
   git commit -m "Update application"
   git push origin main
   ```
3. **GitHub Pages se actualizará automáticamente** (1-3 minutos)

## 🎯 Paso 7: Personalización Adicional

### A. Agregar Dominio Personalizado (Opcional)
**En GitHub Pages Settings → Custom domain:**
```
ministerialai.frankiefelicie.net
```
*(Solo si tienes un dominio propio)*

### B. Habilitar HTTPS
**Por defecto GitHub Pages usa HTTPS automáticamente** ✅

### C. Agregar Favicon
**Crear favicon.ico y subirlo al repositorio**

## 🛠️ Comandos Git Útiles (Si usas Git)

```bash
# Clonar repositorio
git clone https://github.com/tu_usuario/ministerial-ai.git
cd ministerial-ai

# Hacer cambios
# Editar archivos...

# Subir cambios
git add .
git commit -m "Describe tus cambios"
git push origin main

# Ver estado
git status

# Ver historial
git log --oneline
```

## 🔍 Troubleshooting Común

### "La página no carga"
**Causa:** Archivos no subidos correctamente
**Solución:** Verificar que index.html esté en la raíz

### "CSS/JS no se cargan"
**Causa:** Rutas absolutas en lugar de relativas
**Solución:** Cambiar enlaces a `./styles.css` y `./script.js`

### "Error 404"
**Causa:** GitHub Pages aún no se ha activado
**Solución:** Esperar 10-15 minutos y refrescar

### "La aplicación no responde"
**Causa:** JavaScript tiene errores
**Solución:** Abrir Developer Console (F12) y revisar errores

## 📊 Ventajas de GitHub Pages

✅ **GRATIS** - Sin costo alguno
✅ **HTTPS** - Seguridad incluida
✅ **CDN Global** - Carga rápida mundialmente
✅ **Fácil de actualizar** - Un solo push
✅ **Control de versiones** - Historial completo
✅ **Backup automático** - GitHub mantiene respaldos
✅ **SSL automático** - Certificado HTTPS incluido

## 🎯 URL Final

**Tu aplicación estará disponible en:**
```
https://tu_usuario.github.io/ministerial-ai
```

**Ejemplo real:**
```
https://frankiefelicie.github.io/ministerial-ai
```

## 🎉 ¡Listo!

**Tu aplicación Ministerial AI estará disponible públicamente en GitHub Pages, lista para ayudar a los visitantes del ministerio del Rev. Frankie Felicie.**

---

**¿Necesitas ayuda con algún paso? ¡Pregúntame!** 🚀