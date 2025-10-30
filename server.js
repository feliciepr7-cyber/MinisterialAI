#!/usr/bin/env node

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// Configuración
const PORT = process.env.PORT || 9999;
const HOST = 'localhost';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API Route para el chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Mensaje requerido' });
        }

        console.log('📨 Mensaje recibido:', message);

        // Procesar mensaje usando el sistema de chat
        const response = await processChatMessage(message);
        
        res.json({ 
            response,
            timestamp: new Date().toLocaleTimeString()
        });

    } catch (error) {
        console.error('❌ Error procesando mensaje:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
});

// Función para procesar mensajes del chat
async function processChatMessage(message) {
    try {
        // Aquí está la lógica del Ministerio AI
        // Esta es una versión simplificada para demostración
        
        const response = await MinisterialAI(message);
        return response;
        
    } catch (error) {
        console.error('❌ Error en MinisterialAI:', error);
        return 'Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.';
    }
}

// Sistema Ministerial AI simplificado
async function MinisterialAI(message) {
    const messageLower = message.toLowerCase();
    
    // Detectar bosquejo de sermón
    if (detectSermonOutline(messageLower)) {
        return generateSermonOutline(message);
    }
    
    // Detectar consulta espiritual
    if (detectSpiritualQuery(messageLower)) {
        return generateSpiritualResponse(messageLower);
    }
    
    // Detectar información del ministerio
    if (detectMinistryInfo(messageLower)) {
        return generateMinistryInfo();
    }
    
    // Detectar saludos
    if (detectGreeting(messageLower)) {
        return getWelcomeMessage();
    }
    
    // Usar OpenAI para otras consultas
    if (await canUseOpenAI()) {
        return await callOpenAI(message);
    }
    
    // Respuesta por defecto
    return generateDefaultResponse();
}

// Funciones de detección
function detectSermonOutline(message) {
    const outlineKeywords = ['bosquejo', 'outline', 'predicar', 'sermón', 'sermon', 'predicación', 'preaching', 'mensaje', 'estudio', 'enseñanza', 'teaching', 'esquema', 'plan', 'structure'];
    return outlineKeywords.some(keyword => message.includes(keyword));
}

function detectSpiritualQuery(message) {
    const spiritualKeywords = ['orar', 'prayer', 'oraré', 'bendición', 'esperanza', 'fe', 'amor', 'grace', 'jesús', 'jesus', 'dios'];
    return spiritualKeywords.some(keyword => message.includes(keyword));
}

function detectMinistryInfo(message) {
    const infoKeywords = ['dirección', 'address', 'teléfono', 'phone', 'horario', 'schedule', 'servicio', 'service', 'donar', 'donate'];
    return infoKeywords.some(keyword => message.includes(keyword));
}

function detectGreeting(message) {
    const greetingKeywords = ['hola', 'hello', 'buenos', 'saludos', 'greetings', 'hey', 'buenas'];
    return greetingKeywords.some(keyword => message.includes(keyword));
}

// Generadores de respuestas
function generateSermonOutline(message) {
    const keywords = extractKeywords(message);
    const topic = keywords.find(word => word.length > 2) || 'la fe';
    
    return `📖 **Bosquejo de Sermon: ${topic.charAt(0).toUpperCase() + topic.slice(1)}**

**I. Introducción**
- Importancia del tema en la vida cristiana
- Contexto bíblico relevante

**II. Puntos Principales**

**A. Fundamentos Bíblicos**
- Versículos clave que sustentan el tema
- Exégesis y contexto histórico

**B. Aplicación Práctica**
- Cómo vivir estos principios diariamente
- Ejemplos de la vida cristiana

**C. Desafíos y Respuestas**
- Obstáculos comunes en la vida espiritual
- Soluciones basadas en la Palabra

**III. Conclusión**
- Resumen de puntos principales
- Llamado a la acción
- Oración de compromiso

**Versículos de Apoyo:**
- ${getRandomVerses().join('\n- ')}

¿Hay algún aspecto específico de este bosquejo que te gustaría explorar más a fondo?`;
}

function generateSpiritualResponse(message) {
    const encouragementResponses = [
        '🌟 **Palabra de Esperanza**: "Todo lo puedo en Cristo que me fortalece" - Filipenses 4:13',
        '🙏 **Oración**: Señor, sabemos que Tú eres nuestro fortaleza en momentos difíciles. Ayúdanos a mantener la fe y la esperanza.',
        '💝 **Recordatorio**: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito" - Juan 3:16',
        '✨ **Esperanza**: "El que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo" - Filipenses 1:6'
    ];
    
    return encouragementResponses[Math.floor(Math.random() * encouragementResponses.length)];
}

function generateMinistryInfo() {
    return `🏛️ **Información del Ministerio Frankie Felicie**

📍 **Dirección**: 2702 New Hampshire St, Lake Station, IN 46405
📞 **Teléfono**: (219) 246-5775
📧 **Email**: info@frankiefelicie.net

⛪ **Servicios**:
- Domingos: 11:00 AM
- Miércoles: Estudio bíblico 7:00 PM  
- Viernes: Servicio Evangélico 7:00 PM

👥 **Pastores**: Rev. Frankie & Lydia Felicie

🌐 **Sitio web**: https://frankiefelicie.net

💝 **¿Deseas donar?** Visita https://frankiefelicie.net/donate.html`;
}

function getWelcomeMessage() {
    return `¡Hola! 🕊️ Soy Ministerio AI, tu asistente del ministerio del Rev. Frankie Felicie.

Puedo ayudarte con:
📖 Bosquejos de sermones
🙏 Oraciones y palabras de esperanza
ℹ️ Información del ministerio
🕐 Horarios de servicios
💝 Información sobre donaciones

¿En qué puedo asistirte hoy?`;
}

function generateDefaultResponse() {
    return `🤔 **Lo siento, no entiendo completamente tu consulta.**

Puedo ayudarte con:
📖 Bosquejos de sermones sobre temas específicos
🙏 Oraciones y palabras de esperanza
ℹ️ Información del ministerio
🕐 Horarios de servicios
💝 Información sobre donaciones

¿Podrías reformular tu pregunta o elegir uno de estos temas?`;
}

// Funciones auxiliares
function extractKeywords(message) {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del', 'sobre', 'acerca', 'prepara', 'dame', 'un', 'una', 'mi', 'tu', 'su'];
    return message.toLowerCase().split(' ')
        .filter(word => word.length > 1 && !stopWords.includes(word));
}

function getRandomVerses() {
    const verses = [
        '"Todo lo puedo en Cristo que me fortalece" - Filipenses 4:13',
        '"Jehová es mi pastor, nada me faltará" - Salmo 23:1',
        '"El que comenzó en vosotros la buena obra, la perfeccionará" - Filipenses 1:6',
        '"Fe es la certeza de lo que se espera, la convicción de lo que no se ve" - Hebreos 11:1'
    ];
    return verses.slice(0, 2);
}

async function canUseOpenAI() {
    // Verificar si hay API key en localStorage del cliente
    return true; // Por ahora, simular que siempre está disponible
}

async function callOpenAI(message) {
    try {
        // Esta función se ejecutaría en el cliente con la API key
        // Por ahora, retornamos una respuesta simulada
        return `💭 **Respuesta de IA**: Tu consulta sobre "${message}" es interesante. Como Ministerio AI, estoy aquí para ayudarte con temas relacionados con la fe y el ministerio. ¿Hay algo específico sobre tu pregunta que te gustaría explorar desde una perspectiva cristiana?`;
    } catch (error) {
        console.error('Error llamando OpenAI:', error);
        return 'No pude procesar tu pregunta en este momento. ¿Podrías intentar de nuevo?';
    }
}

// Configurar socket.io para chat en tiempo real (opcional)
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);
    
    socket.on('chat message', async (msg) => {
        console.log('Mensaje socket recibido:', msg);
        const response = await processChatMessage(msg);
        socket.emit('chat response', {
            message: response,
            timestamp: new Date().toLocaleTimeString()
        });
    });
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Servir archivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/config-api.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'config-api.html'));
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
    console.log('🕊️  Servidor Ministerial AI iniciado');
    console.log(`🌐 URL: http://${HOST}:${PORT}`);
    console.log(`📁 Directorio: ${__dirname}`);
    console.log('🚀 Listo para recibir consultas!');
    console.log('-' * 50);
});

export default app;