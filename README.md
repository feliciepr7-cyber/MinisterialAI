# Ministerial AI

Ministerial AI es un asistente bíblico y administrativo para el ministerio del Rev. Frankie Felicie. Esta aplicación web moderna proporciona respuestas inteligentes sobre la Biblia, doctrina cristiana, servicios del ministerio y más.

## ✨ Características

- **🤖 Asistente AI Inteligente**: Responde preguntas bíblicas y ministeriales
- **📖 Base de Datos Bíblica**: Integración con versículos RVR1960 con búsqueda por temas
- **🔍 Búsqueda Avanzada**: Detecta consultas específicas como "Juan 3:16" y temas como "esperanza"
- **💬 Respuestas Contextuales**: Proporciona versículos bíblicos según la consulta del usuario
- **📝 Generación de Bosquejos**: Crea bosquejos estructurados para sermones y estudios bíblicos
- **🌐 Acceso Web en Tiempo Real**: Búsqueda de información actualizada
- **🌍 Soporte Bilingüe**: Español e inglés
- **📱 Diseño Responsivo Optimizado**: Experiencia perfecta en móviles, tablets y desktop con breakpoints específicos
- **⛪ Información del Ministerio**: Datos completos de contacto y servicios
- **💝 Integración de Donaciones**: Enlaces directos para apoyar el ministerio

## 📋 Actualización Reciente (v1.4)

**✅ Nueva Funcionalidad - Botón de Navegación "Home":**
- **Botón "Home"**: Nuevo botón al lado del selector de idioma "English"
- **Navegación directa**: Acceso rápido al sitio web principal del ministerio
- **Link externo**: Dirige hacia https://frankiefelicie.net en nueva pestaña
- **Diseño consistente**: Estilos integrados con el tema de la aplicación
- **Responsive optimizado**: Adaptación perfecta en todos los dispositivos
- **Icono intuitivo**: Icono de casa 🏠 para fácil identificación

**✅ Actualización Previa (v1.2.1) - Generación de Bosquejos:**
- **Detección de consultas de bosquejo**: Reconoce solicitudes como "necesito un bosquejo sobre la fe"
- **Generación estructurada**: Crea bosquejos completos con introducción, puntos principales y conclusión
- **Plantillas temáticas**: Incluye plantillas predefinidas para temas como fe, amor, esperanza, fortaleza
- **Soporte bilingüe**: Genera bosquejos tanto en español como en inglés
- **Integración bíblica**: Incluye referencias bíblicas relevantes en cada bosquejo

**✅ Optimización Completa para Móviles:**
- **Layout responsive mejorado**: Grid adaptable para todas las pantallas (Desktop, Tablets, Móviles)
- **Chat optimizado**: Altura dinámica que se ajusta automáticamente al viewport
- **Touch-friendly**: Botones y elementos interactivos con tamaño mínimo de 44px
- **Header responsivo**: Título y controles que se adaptan inteligentemente al espacio
- **Sidebar inteligente**: Se reposiciona arriba del chat en móviles para mejor accesibilidad
- **Prevención de zoom**: Font-size 16px para evitar zoom accidental en iOS Safari
- **Orientación landscape**: Modo especial que oculta sidebar para maximizar área de chat
- **Performance móvil**: Optimizaciones de renderizado y eliminación de highlight táctil
- **Breakpoints específicos**: 767px (tablets), 480px (móviles medianos), 360px (móviles pequeños)

**✅ Correcciones Previas (v1.1):**
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
- **Generación de Bosquejos**: Creación de bosquejos estructurados para sermones
- **Búsqueda Web**: Información actualizada del ministerio
- **Estudios Bíblicos**: Orientación para el crecimiento espiritual

### Análisis de Intención
El agente identifica automáticamente el tipo de consulta:
- Saludos y presentaciones
- Búsquedas bíblicas (por referencia o tema)
- Información ministerial
- Peticiones de oración
- Estudios bíblicos
- **Solicitudes de bosquejos** (nuevo en v1.2)
- Eventos y actividades

### Generación de Bosquejos (Nueva Funcionalidad)
El sistema reconoce consultas como:
- "Necesito un bosquejo sobre la fe"
- "Prepara un sermón sobre el amor de Dios"
- "Bosquejo para predicar sobre la esperanza"
- "Outline about forgiveness"

**Estructura del Bosquejo:**
- **Título**: Basado en el tema solicitado
- **Introducción**: Orientación para presentar el tema
- **Puntos Principales**: Estructura de 3 puntos con referencias bíblicas
- **Versículos de Apoyo**: Referencias bíblicas relevantes
- **Conclusión**: Aplicación práctica y llamado al compromiso

**Temas Predefinidos:**
- Fe y vida cristiana
- Amor de Dios
- Esperanza y futuro
- Fortaleza en Cristo
- Temas personalizados (sistema de fallback)

### Soporte de Idiomas
- **Español**: Idioma principal con terminología cristiana tradicional
- **English**: Soporte completo para audiencia internacional

## 📱 Optimización Móvil

### Breakpoints Implementados
- **Desktop**: > 768px (Layout completo con sidebar)
- **Tablets**: ≤ 767px (Grid adaptativo, sidebar arriba)
- **Móviles Medianos**: ≤ 480px (UI compactada, elementos touch-friendly)
- **Móviles Pequeños**: ≤ 360px (Máxima optimización de espacio)
- **Landscape**: ≤ 500px altura (Sidebar oculta, chat maximizado)

### Características Móviles
- **Chat Container Dinámico**: Altura automática basada en viewport
- **Header Responsivo**: Título y controles que se adaptan al espacio disponible
- **Touch-Friendly**: Botones y campos con tamaño mínimo de 44px
- **Prevención de Zoom**: Font-size 16px para evitar zoom accidental en iOS
- **Scroll Optimizado**: Scrollbars sutiles y gestos táctiles suaves
- **Sidebar Inteligente**: Reposicionamiento automático según tamaño de pantalla
- **Performance Móvil**: Optimizaciones de renderizado y gestos táctiles
- **Orientación Landscape**: Adaptación especial para maximizar área de chat

### Compatibilidad de Dispositivos
- **iOS Safari**: Optimizado para prevención de zoom y gestos táctiles
- **Android Chrome**: Adaptado para diferentes densidades de píxeles
- **Windows Mobile**: Compatible con Internet Explorer Mobile
- **iPad**: Layout adaptativo para tablets en vertical y horizontal

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

**✅ Completado en v1.4:**
- [x] Botón de navegación "Home" para acceso directo al sitio web principal
- [x] Integración responsiva del botón "Home" con diseño consistente

**✅ Completado en v1.2.1:**
- [x] Generación de bosquejos para sermones y estudios
- [x] Optimización completa para dispositivos móviles

**🔄 En Desarrollo:**
- [ ] Ampliación de plantillas de bosquejos (30+ temas)
- [ ] Generación de estudios bíblicos completos
- [ ] Bosquejos personalizados por ocasiones especiales

**📋 Planificado:**
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