# Ministerial AI

Ministerial AI es un asistente bíblico y administrativo para el ministerio del Rev. Frankie Felicie. Esta aplicación web moderna proporciona respuestas inteligentes sobre la Biblia, doctrina cristiana, servicios del ministerio y más.

## ✨ Características

- **🤖 Asistente AI Inteligente**: Responde preguntas bíblicas y ministeriales
- **📖 Base de Datos Bíblica**: Integración con versículos RVR1960 con búsqueda por temas
- **🔍 Búsqueda Avanzada**: Detecta consultas específicas como "Juan 3:16" y temas como "esperanza"
- **💬 Respuestas Contextuales**: Proporciona versículos bíblicos según la consulta del usuario
- **🌐 Acceso Web en Tiempo Real**: Búsqueda de información actualizada
- **🌍 Soporte Bilingüe**: Español e inglés
- **📱 Diseño Responsivo**: Funciona perfectamente en móviles y desktop
- **⛪ Información del Ministerio**: Datos completos de contacto y servicios
- **💝 Integración de Donaciones**: Enlaces directos para apoyar el ministerio

## 📋 Actualización Reciente (v1.1)

**✅ Correcciones Implementadas:**
- **Búsqueda bíblica mejorada**: Ahora detecta correctamente consultas como "¿Qué dice Juan 3:16?"
- **Búsqueda por temas espirituales**: Responde a consultas como "una palabra de esperanza" con versículos relevantes
- **Algoritmo de intención expandido**: Mejor detección de consultas sobre fe, fortaleza, paz, amor, etc.
- **Base de datos ampliada**: Versículos adicionales categorizados por temas espirituales

## 🛠️ Tecnologías Utilizadas

- **Vanilla JavaScript/HTML/CSS**: Implementación sin dependencias
- **CSS Variables** para diseño consistente
- **Google Fonts** (Inter + Lora)
- **Python HTTP Server** para desarrollo local
- **GitHub Pages** para despliegue automático

## 🚀 Instalación y Ejecución

### Opción 1: Servidor Python (Recomendado)
```bash
# Ejecutar servidor de desarrollo
python3 server.py
# Abrir http://localhost:3000 en el navegador
```

### Opción 2: Launcher Automático
```bash
# Ejecutar con opciones avanzadas
python3 launcher.py --help
python3 launcher.py --port 8080
```

### Opción 3: Servidor Simple
```bash
# Servidor básico de Python
python -m http.server 8000
# Abrir http://localhost:8000 en el navegador
```

## 📁 Estructura del Proyecto

```
ministerial-ai/
├── index.html              # Aplicación principal
├── styles.css              # Estilos y diseño
├── script.js               # Lógica del agente AI
├── server.py               # Servidor de desarrollo
├── launcher.py             # Launcher con opciones avanzadas
├── deploy_github.py        # Script de despliegue automatizado
└── README.md               # Documentación
│   ├── types/              # Definiciones TypeScript
│   ├── styles/             # Estilos CSS globales
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Punto de entrada
├── public/                 # Archivos estáticos
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Funcionalidades del Agente AI

### Capacidades de Respuesta
- **Consultas Bíblicas**: Búsqueda de versículos y explicaciones
- **Información Ministerial**: Horarios, servicios, contacto
- **Asesoría Espiritual**: Consejos bíblicos y oración
- **Búsqueda Web**: Información actualizada del ministerio
- **Estudios Bíblicos**: Orientación para el crecimiento espiritual

### Análisis de Intención
El agente identifica automáticamente el tipo de consulta:
- Saludos y presentaciones
- Búsquedas bíblicas (por referencia o tema)
- Información ministerial
- Peticiones de oración
- Estudios bíblicos
- Eventos y actividades

### Soporte de Idiomas
- **Español**: Idioma principal con terminología cristiana tradicional
- **English**: Soporte completo para audiencia internacional

## 🎨 Diseño y UX

### Sistema de Colores
- **Azul Ministerial** (#2D5F9A): Color principal que transmite confianza
- **Grises Cálidos**: Paleta neutra para profesionalismo
- **Acentos**: Verde (éxito), Naranja (advertencia), Rojo (error)

### Tipografía
- **Lora**: Para títulos (serif clásica y reverente)
- **Inter**: Para contenido (sans-serif moderna y legible)

### Componentes Principales
- **Chat Interface**: Conversación fluida y natural
- **Sidebar**: Información rápida del ministerio
- **Responsive Design**: Adaptación perfecta a todos los dispositivos
- **Accesibilidad**: Cumple estándares WCAG

## 📞 Información del Ministerio

- **Ministerio**: Frankie Felicie Ministries
- **Iglesia**: Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc.
- **Dirección**: 2702 New Hampshire St, Lake Station, IN 46405
- **Teléfono**: (219) 246-5775
- **Email**: info@lakestationchurch.com
- **Web**: https://frankiefelicie.net
- **Pastores**: Rev. Frankie & Lydia Felicie

## 🔧 Configuración Personalizable

### Variables de Entorno
El agente puede configurarse para:
- Acceder a APIs de búsqueda web reales
- Integrar con sistemas de gestión ministerial
- Conectar con bases de datos de versículos más extensas
- Personalizar respuestas por ministerio

### Extensibilidad
La arquitectura modular permite:
- Agregar nuevos tipos de consultas
- Integrar con calendarios de eventos
- Conectar sistemas de donaciones
- Implementar análisis de conversaciones

## 🛡️ Seguridad y Privacidad

- **No Almacenamiento de Datos**: Las conversaciones no se guardan en servidores
- **HTTPS**: Comunicación segura
- **Sin Cookies de Seguimiento**: Respeto total a la privacidad del usuario
- **Filtros de Contenido**: Respuestas apropiadas para contexto cristiano

## 📈 Roadmap Futuro

- [ ] Integración con redes sociales del ministerio
- [ ] Calendario de eventos en tiempo real
- [ ] Sistema de oración comunitaria
- [ ] Biblioteca de recursos bíblicos
- [ ] Aplicación móvil nativa
- [ ] Integración con sistemas de gestión eclesiástica

## 🤝 Contribución

Este proyecto está diseñado específicamente para Frankie Felicie Ministries. Para modificaciones o mejoras, contactar al equipo de desarrollo.

## 📄 Licencia

Proyecto privado - Todos los derechos reservados a Frankie Felicie Ministries.

---

*Desarrollado con ❤️ para servir al reino de Dios y bendecir a las congregaciones.*