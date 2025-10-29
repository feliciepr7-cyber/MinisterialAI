# Configuración Rápida - Ministerio AI Enhanced

## 🚀 Implementación Inmediata (5 minutos)

### **Paso 1: Reemplazar archivos**

```bash
# Copiar archivos enhanced a tu proyecto
cp script-enhanced.js tu-proyecto/
cp openai-config.js tu-proyecto/
cp index-enhanced.html tu-proyecto/
```

### **Paso 2: Obtener API Key de OpenAI**
1. Ve a: https://platform.openai.com/api-keys
2. Crea una cuenta o inicia sesión
3. Crea una nueva API key
4. Copia la key (empieza con "sk-")

### **Paso 3: Configurar en tu HTML**

```html
<!-- Reemplazar los scripts en tu index.html -->
<script src="openai-config.js"></script>
<script src="script-enhanced.js"></script>

<script>
// Configuración automática de API key
document.addEventListener('DOMContentLoaded', function() {
    const apiKeyManager = new APIKeyManager();
    
    // Mostrar modal para configurar API key
    setTimeout(() => {
        apiKeyManager.showAPIKeySetup((key) => {
            if (window.ministerialAI) {
                window.ministerialAI.setOpenAIKey(key);
                console.log('¡API Key configurada exitosamente!');
            }
        });
    }, 1000);
});
</script>
```

## 💡 **¿Qué hace cada archivo?**

### **script-enhanced.js** (33KB)
- ✅ Sistema ministerial completo + OpenAI integration
- ✅ Lógica híbrida inteligente
- ✅ Todas las funcionalidades existentes mejoradas
- ✅ Respuestas contextuales con IA

### **openai-config.js** (7KB)
- ✅ Gestión segura de API keys
- ✅ Modal de configuración de usuario
- ✅ Validación y testing de conexión
- ✅ Mejores prácticas de seguridad

### **index-enhanced.html** (8KB)
- ✅ Ejemplo completo de implementación
- ✅ Modal automático de configuración
- ✅ Interfaz optimizada
- ✅ CSS responsive incluido

## 🎯 **Ejemplos de Uso**

### **Consultas Ministeriales (Sistema Especializado)**
```
"Hola"
"¿Cuáles son los horarios?"
"Información del pastor Frankie"
"Juan 3:16"
"Prepara un bosquejo sobre la fe"
"Quiero donar"
```

### **Consultas Generales (OpenAI)**
```
"Explica qué es la fotosíntesis"
"¿Cómo hacer un plan de estudio?"
"Traduce 'hello world' al español"
"Crea una lista de compras"
"Ayuda con matemáticas"
```

## 🔧 **Configuración Avanzada**

### **Cambiar Modelo de IA**
```javascript
// En script-enhanced.js, línea ~15:
this.openaiModel = 'gpt-4'; // o mantener 'gpt-3.5-turbo'
```

### **Configurar Costos**
```javascript
// En callOpenAI(), línea ~380:
max_tokens: 200, // Más económico, respuestas más cortas
```

### **Personalizar Contexto Cristiano**
```javascript
// En callOpenAI(), línea ~350:
const systemPrompt = `Eres un asistente cristiano...` // Personalizar aquí
```

## 🛡️ **Seguridad**

### **API Key en Producción (Recomendado)**
```javascript
// NUNCA hardcodear en el frontend:
this.openaiApiKey = 'sk-...'; // ❌ NO

// SÍ usar backend seguro:
fetch('/api/chat', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer user-token' },
    body: JSON.stringify({ message })
});
```

### **Límites de Uso**
- gpt-3.5-turbo: ~$0.50-2.00/mes (uso típico ministerio)
- gpt-4: ~$5.00-20.00/mes (respuestas más precisas)
- Configurar límites en: https://platform.openai.com/limits

## 📱 **Compatibilidad**

### **Navegadores Soportados**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### **Dispositivos**
- ✅ Desktop (todas las resoluciones)
- ✅ Tablets (optimizado)
- ✅ Móviles (completo)
- ✅ PWA ready

## 🆘 **Solución Rápida de Problemas**

### **"API key no configurada"**
```javascript
// Configurar manualmente:
window.ministerialAI.setOpenAIKey('tu-api-key-aqui');
```

### **"OpenAI API error"**
1. Verificar API key en: https://platform.openai.com/api-keys
2. Comprobar límites de uso
3. Verificar saldo de facturación

### **"No responde a preguntas generales"**
1. Verificar que OpenAI API esté habilitada
2. Comprobar conexión a internet
3. Revisar consola del navegador para errores

## 📊 **Monitoreo**

### **OpenAI Dashboard**
- Uso: https://platform.openai.com/usage
- Facturación: https://platform.openai.com/billing
- Límites: https://platform.openai.com/limits

### **Métricas Locales**
```javascript
// Agregar tracking personalizado:
console.log(`Respuesta tipo: ${responseType}`);
console.log(`Tokens usados: ${tokenCount}`);
```

## 🎨 **Personalización Rápida**

### **Cambiar Colores del Tema**
```css
/* En styles.css, variables CSS: */
:root {
    --primary-500: #tu-color;     /* Color principal */
    --primary-700: #tu-color;     /* Color hover */
    /* Más variables disponibles */
}
```

### **Agregar Horarios de Servicio**
```javascript
// En script-enhanced.js, getMinistryEvents():
• Miércoles: Estudio bíblico 7:00 PM
• Viernes: Servicio Evangelístico 7:00 PM  // ← Agregar aquí
```

### **Modificar Mensajes de Bienvenida**
```javascript
// En translations.welcome:
es: "¡Hola! Soy tu asistente ministerial personalizado..."  // ← Personalizar aquí
```

## 📞 **Soporte**

### **Recursos**
- 📖 Documentación completa: `README-ENHANCED.md`
- 🔧 Ejemplos de código: `index-enhanced.html`
- 🛠️ Configuración: `openai-config.js`

### **OpenAI Support**
- Docs: https://platform.openai.com/docs
- Status: https://status.openai.com/
- Community: https://community.openai.com/

---

**🚀 ¡Tu Ministerio AI Enhanced está listo para funcionar! 🚀**