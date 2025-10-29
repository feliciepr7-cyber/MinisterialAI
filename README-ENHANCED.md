# Ministerio AI Enhanced con OpenAI Integration

## 🚀 Descripción

Ministerio AI Enhanced es una versión avanzada del asistente ministerial que integra las capacidades de OpenAI GPT para proporcionar respuestas más completas y contextuales, mientras mantiene toda la funcionalidad ministerial especializada.

## ✨ Características Principales

### 🏛️ **Funcionalidades Ministeriales Preservadas**
- ✅ Información completa del ministerio y horarios
- ✅ Base de datos de versículos bíblicos (RVR1960)
- ✅ Generación de bosquejos para predicaciones
- ✅ Soporte multiidioma (Español/Inglés)
- ✅ Estudios bíblicos y oración
- ✅ Información de contacto y donaciones

### 🤖 **Nuevas Capacidades con OpenAI**
- ✅ Respuestas inteligentes a cualquier pregunta
- ✅ Contexto cristiano en todas las respuestas
- ✅ Lógica híbrida inteligente (ministerial + IA general)
- ✅ Traducción de textos
- ✅ Planificación y organización
- ✅ Ayuda con estudios generales

### 📱 **Diseño Responsivo Optimizado**
- ✅ Completamente optimizado para móviles
- ✅ Chat con prioridad máxima en pantallas pequeñas
- ✅ Input fijo en la parte inferior para mejor UX
- ✅ Tarjeta del ministerio inteligente (oculta en móviles)

## 🛠️ Instalación y Configuración

### **1. Obtener API Key de OpenAI**

```bash
# Ve a: https://platform.openai.com/api-keys
# 1. Inicia sesión o crea una cuenta
# 2. Ve a "API Keys" en el menú lateral  
# 3. Haz clic en "Create new secret key"
# 4. Copia la key (empieza con "sk-")
```

### **2. Configuración en el Código**

#### **Opción A: Configuración Manual (Desarrollo)**
```javascript
// En script-enhanced.js, línea ~15:
this.openaiApiKey = 'tu-api-key-de-openai-aqui'; // ⚠️ NO recomendado para producción
```

#### **Opción B: Modal de Configuración (Recomendado)**
```javascript
// El sistema incluye un modal automático para configurar la API key
// que se muestra la primera vez que usas el sistema
```

#### **Opción C: Variable de Entorno (Producción)**
```javascript
// En openai-config.js, modifica getAPIKey():
getAPIKey() {
    return process.env.OPENAI_API_KEY || '';
}
```

### **3. Archivos a Incluir en tu Proyecto**

```html
<!-- Reemplaza script.js con script-enhanced.js -->
<script src="openai-config.js"></script>
<script src="script-enhanced.js"></script>
```

### **4. Inicialización**

```javascript
// Reemplazar en tu HTML:
document.addEventListener('DOMDOMLoaded', () => {
    window.ministerialAI = new MinisterialAIEnhanced();
    
    // Configurar API Key si no usas el modal
    // window.ministerialAI.setOpenAIKey('tu-api-key-aqui');
});
```

## 🎯 Lógica de Respuestas Inteligente

### **🏛️ Consultas Ministeriales (Sistema Especializado)**
```
Palabras clave: ministerio, iglesia, pastor, servicio, horario, contacto,
culto, predicación, bosquejo, biblia, oración, donate, etc.

Respuestas: Sistema especializado con datos precisos del ministerio
```

### **📖 Consultas Bíblicas (Base de Datos Local)**
```
Palabras clave: Juan 3:16, versículo, bíblico, que dice, etc.

Respuestas: Versículos exactos de la base de datos local (RVR1960)
```

### **🤖 Consultas Generales (OpenAI API)**
```
Palabras clave: explica, cómo, qué, por qué, traduce, crea, planifica, etc.

Respuestas: OpenAI GPT con contexto cristiano personalizado
```

### **📝 Ejemplos de Uso**

#### **Consultas Ministeriales:**
```
"¿Cuáles son los horarios del ministerio?"
"Información del pastor Frankie"
"¿Cuándo es el estudio bíblico?"
"¿Dónde está ubicada la iglesia?"
```

#### **Consultas Bíblicas:**
```
"Juan 3:16"
"¿Qué dice la Biblia sobre la fe?"
"Búscame versículos sobre el amor"
```

#### **Consultas Generales con OpenAI:**
```
"Explica la teoría de la relatividad"
"¿Cómo hacer un plan de estudio?"
"Traduce 'hello world' al español"
"Crea una lista de compras para una cena"
"¿Qué es la fotosíntesis?"
```

## 🔧 Configuración Avanzada

### **Cambiar Modelo de OpenAI**
```javascript
// En script-enhanced.js:
this.openaiModel = 'gpt-4'; // Usar GPT-4 si tienes acceso
// O mantener 'gpt-3.5-turbo' para más económicas
```

### **Personalizar el Contexto Cristiano**
```javascript
// En callOpenAI(), línea ~350:
const systemPrompt = this.currentLanguage === 'es' 
  ? `Eres un asistente cristiano...` // Personalizar aquí
  : `You are a Christian assistant...`;
```

### **Configurar Límites de Tokens**
```javascript
// En callOpenAI(), línea ~380:
max_tokens: 1000, // Aumentar para respuestas más largas
```

## 🔒 Seguridad y Mejores Prácticas

### **⚠️ IMPORTANTE: API Keys**

```javascript
// ❌ NUNCA hagas esto:
this.openaiApiKey = 'sk-proj-abc123...'; // En código público

// ✅ SÍ haz esto:
1. Usa variables de entorno en servidor
2. Implementa autenticación de usuario
3. Limita el uso por usuario
4. Monitorea el uso en OpenAI Dashboard
```

### **Implementación Segura Recomendada**

```javascript
// 1. Backend con autenticación
fetch('/api/chat', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: userMessage })
});

// 2. Backend procesa con OpenAI
const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
    ]
});
```

## 📊 Monitoreo y Uso

### **OpenAI Dashboard**
- Ve a: https://platform.openai.com/usage
- Monitorea tu uso y facturación
- Configura límites de uso

### **Límites de Uso Recomendados**
```javascript
// En callOpenAI():
const maxRequestsPerHour = 50; // Configurar según tu plan
const maxTokensPerRequest = 500; // Controlar costos
```

### **Manejo de Errores**
```javascript
// El sistema incluye manejo automático de errores:
- Conexión fallida → Respuesta de fallback
- API key inválida → Solicita nueva configuración
- Límites excedidos → Mensaje informativo
```

## 🎨 Personalización

### **Cambiar Estilos del Modal de API**
```css
/* En openai-config.js, busca '.api-setup-modal' */
.api-setup-modal {
    /* Personalizar estilos aquí */
}
```

### **Agregar Nuevas Consultas Ministeriales**
```javascript
// En isMinistrySpecificQuery():
const ministrySpecificKeywords = [
    // Agregar nuevas palabras clave aquí
    'nuevoServicio', 'nuevoEvento', 'nuevaConsulta'
];
```

### **Expandir Base de Datos Bíblica**
```javascript
// En scriptureDatabase, agregar nuevos versículos:
{
    reference: "Tu Versículo",
    text: "Texto del versículo...",
    version: "RVR1960",
    category: "new_testament", // o "old_testament"
    themes: ["tema1", "tema2"]
}
```

## 📈 Costos Estimados

### **Uso Típico del Ministerio (50 consultas/día)**
```
gpt-3.5-turbo: ~$0.50-2.00 USD/mes
gpt-4: ~$5.00-20.00 USD/mes
```

### **Configuración de Límites en OpenAI**
```
1. Ve a: https://platform.openai.com/limits
2. Configura límites de uso mensual
3. Establece alertas de facturación
```

## 🆘 Solución de Problemas

### **"API key no configurada"**
```javascript
// Verificar configuración:
console.log(apiKeyManager.hasSavedKey());
// O mostrar modal nuevamente:
apiKeyManager.showAPIKeySetup();
```

### **"Error de conexión con OpenAI"**
```javascript
// Verificar API key:
await apiKeyManager.testConnection();
// Verificar límites en: https://platform.openai.com/usage
```

### **"Respuestas muy largas"**
```javascript
// Reducir max_tokens en callOpenAI():
max_tokens: 200, // Más corto, más económico
```

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación:

1. **Documentación OpenAI:** https://platform.openai.com/docs
2. **Límites y Precios:** https://openai.com/pricing
3. **Estado del Sistema:** https://status.openai.com/

## 📝 Changelog

### **v2.0.0 (Enhanced)**
- ✅ Integración completa con OpenAI API
- ✅ Lógica híbrida inteligente
- ✅ Modal de configuración de API key
- ✅ Manejo robusto de errores
- ✅ Optimización móvil completa
- ✅ Sistema de respaldo cuando OpenAI no está disponible

### **v1.0.0 (Original)**
- ✅ Funcionalidades ministeriales básicas
- ✅ Base de datos bíblica local
- ✅ Diseño responsivo
- ✅ Multiidioma

## 📄 Licencia

Este proyecto está diseñado para el Ministerio del Rev. Frankie Felicie. 
Para uso externo, contacta al ministerio.

---

**✨ ¡Ministerio AI Enhanced está listo para transformar tu ministerio! ✨**