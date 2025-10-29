# 🚀 DESPLEGAR MINISTERIAL AI EN GITHUB PAGES

## ⚡ Despliegue Rápido (5 minutos)

### 1️⃣ Crear Repositorio
```bash
# Ve a https://github.com/new
# Repository name: ministerial-ai
# ✅ Public
# ✅ Add README file
# Click "Create repository"
```

### 2️⃣ Subir Archivos
```bash
# En tu repositorio, click "uploading an existing file"
# Arrastra estos archivos:
# ✅ index.html
# ✅ styles.css
# ✅ script.js
# ✅ README.md
# ✅ DEPLOYMENT.md
# ✅ GITHUB_PAGES_GUIDE.md
```

### 3️⃣ Activar GitHub Pages
```bash
# Settings → Pages
# Source: Deploy from a branch
# Branch: main
# Folder: / (root)
# Click "Save"
```

### 4️⃣ URL Final
```
https://tu_usuario.github.io/ministerial-ai
```

## 🎯 Script Automático

### Ejecutar Preparación Automática:
```bash
python3 deploy_github.py
```

### Verificar Archivos:
```bash
python3 deploy_github.py --check
```

### Abrir GitHub:
```bash
python3 deploy_github.py --github
```

## ✅ Verificación Final

**Tu aplicación estará lista cuando veas:**
- ✅ Header "Ministerial AI" visible
- ✅ Chat funcionando
- ✅ Sidebar con info del ministerio
- ✅ Botón de idioma operativo
- ✅ Respuestas del agente AI

## 🔧 Troubleshooting

**❌ "Página no carga"**
- Verificar que `index.html` esté en la raíz
- Esperar 5-10 minutos para activación

**❌ "CSS/JS no funciona"**
- Confirmar rutas relativas (`./styles.css`)
- No usar rutas absolutas (`/styles.css`)

**❌ "Error 404"**
- GitHub Pages aún se está configurando
- Revisar Settings → Pages

## 🎉 ¡Listo!

**Tu agente Ministerial AI estará disponible públicamente para bendecir a tu ministerio.**

---

**🌟 "¿Puedo hacer algo más para ayudar con el despliegue?"**
¡Pregúntame si necesitas ayuda con cualquier paso!