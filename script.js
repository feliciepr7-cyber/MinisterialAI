// Ministerial AI - JavaScript Implementation
// Agente AI para el Ministerio del Rev. Frankie Felicie

class MinisterialAI {
  constructor() {
    this.currentLanguage = 'es';
    this.isLoading = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateWelcomeMessage();
    this.startTimeUpdater();
  }

  // Datos del Ministerio
  get ministryData() {
    return {
      name: "Frankie Felicie Ministries",
      church: "Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc.",
      address: "2702 New Hampshire St, Lake Station, IN 46405",
      phone: "(219) 246-5775",
      email: "info@lakestationchurch.com",
      website: "https://frankiefelicie.net",
      network: "https://ministerioai.com",
      donations: "https://frankiefelicie.net/donate.html",
      pastors: "Rev. Frankie & Lydia Felicie"
    };
  }

  // Base de Datos de Versículos Bíblicos (RVR1960)
  get scriptureDatabase() {
    return [
      {
        reference: "Juan 3:16",
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["amor", "salvacion", "vida eterna", "fe"]
      },
      {
        reference: "Salmo 23:1",
        text: "Jehová es mi pastor; nada me faltará.",
        version: "RVR1960",
        category: "old_testament",
        themes: ["paz", "confianza", "providencia", "cuidado"]
      },
      {
        reference: "Filipenses 4:13",
        text: "Todo lo puedo en Cristo que me fortalece.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["fortaleza", "poder", "fé", "perseverancia"]
      },
      {
        reference: "Romanos 8:28",
        text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["propósito", "amor", "voluntad de Dios", "esperanza"]
      },
      {
        reference: "Proverbios 3:5-6",
        text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
        version: "RVR1960",
        category: "old_testament",
        themes: ["confianza", "sabiduría", "guía", "humildad"]
      },
      {
        reference: "Mateo 28:20",
        text: "he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["presencia", "consuelo", "promesa", "poder"]
      },
      {
        reference: "1 Corintios 13:4",
        text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["amor", "carácter", "virtudes", "relaciones"]
      },
      {
        reference: "Isaías 41:10",
        text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
        version: "RVR1960",
        category: "old_testament",
        themes: ["valentía", "fortaleza", "ayuda", "justicia"]
      },
      {
        reference: "Salmo 91:2",
        text: "Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.",
        version: "RVR1960",
        category: "old_testament",
        themes: ["confianza", "esperanza", "protección", "refugio"]
      },
      {
        reference: "Jeremías 29:11",
        text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
        version: "RVR1960",
        category: "old_testament",
        themes: ["planes", "esperanza", "futuro", "propósito"]
      },
      {
        reference: "Hebreos 11:1",
        text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["fe", "esperanza", "certeza", "convicción"]
      },
      {
        reference: "2 Timoteo 1:7",
        text: "Porque Dios no nos ha dado espíritu de cobardía, sino de poder, amor y dominio propio.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["poder", "amor", "dominio", "valentía"]
      },
      {
        reference: "Santiago 1:5",
        text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.",
        version: "RVR1960",
        category: "new_testament",
        themes: ["sabiduría", "oración", "confianza", "abundancia"]
      }
    ];
  }

  // Strings Localizados
  get translations() {
    return {
      welcome: {
        es: "¡Hola! Soy Ministerial AI, tu asistente del ministerio. ¿En qué puedo ayudarte hoy?",
        en: "Hello! I'm Ministerial AI, your ministry assistant. How can I help you today?"
      },
      ministryInfo: {
        es: "Aquí tienes la información del ministerio:",
        en: "Here's the ministry information:"
      },
      scriptureSearch: {
        es: "Encontré este pasaje bíblico para ti:",
        en: "I found this biblical passage for you:"
      },
      webSearch: {
        es: "Encontré información relevante para ti:",
        en: "I found relevant information for you:"
      },
      ministryServices: {
        es: "Servicios del ministerio:",
        en: "Ministry services:"
      },
      prayerSupport: {
        es: "Estoy aquí para orar contigo. ¿Hay algo específico por lo que te gustaría que oremos?",
        en: "I'm here to pray with you. Is there something specific you'd like us to pray about?"
      },
      biblicalStudy: {
        es: "Me encantaría estudiar la Biblia contigo. ¿Qué tema o pasaje te interesa explorar?",
        en: "I'd love to study the Bible with you. What topic or passage would you like to explore?"
      },
      ministryEvents: {
        es: "Aquí están nuestros eventos y actividades ministeriales:",
        en: "Here are our ministry events and activities:"
      },
      unknownQuery: {
        es: "No tengo información específica sobre eso actualmente, pero puedo orientarte en base a la Palabra de Dios y los principios del ministerio. ¿Te gustaría que busquemos en las Escrituras o que te conecte con información del ministerio?",
        en: "I don't have specific information about that right now, but I can guide you based on God's Word and ministry principles. Would you like me to search the Scriptures or connect you with ministry information?"
      },
      placeholder: {
        es: "Escribe tu pregunta aquí...",
        en: "Type your question here..."
      },
      languageButton: {
        es: "English",
        en: "Español"
      },
      ministryTitle: {
        es: "Información del Ministerio",
        en: "Ministry Information"
      }
    };
  }

  bindEvents() {
    const languageToggle = document.getElementById('languageToggle');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    languageToggle.addEventListener('click', () => this.toggleLanguage());
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    sendButton.addEventListener('click', () => this.sendMessage());
    
    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
      messageInput.style.height = 'auto';
      messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
    });
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    const languageText = document.getElementById('languageText');
    const messageInput = document.getElementById('messageInput');
    
    languageText.textContent = this.translations.languageButton[this.currentLanguage];
    messageInput.placeholder = this.translations.placeholder[this.currentLanguage];
    
    // Actualizar el sidebar de información del ministerio
    this.updateMinistryInfo();
    
    // Mostrar mensaje de cambio de idioma
    const welcomeMessage = document.querySelector('.ai-message .message-content p');
    if (welcomeMessage) {
      welcomeMessage.textContent = this.translations.welcome[this.currentLanguage];
    }
  }

  updateMinistryInfo() {
    const ministryTitle = document.querySelector('.ministry-title');
    if (ministryTitle) {
      ministryTitle.textContent = this.translations.ministryTitle[this.currentLanguage];
    }
  }

  updateWelcomeMessage() {
    const welcomeMessage = document.querySelector('.ai-message .message-content p');
    if (welcomeMessage) {
      welcomeMessage.textContent = this.translations.welcome[this.currentLanguage];
    }
  }

  startTimeUpdater() {
    setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 5);
      document.querySelectorAll('.message-time').forEach(element => {
        if (element.textContent === '00:00') {
          element.textContent = timeString;
        }
      });
    }, 1000);
  }

  async sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    
    if (!content || this.isLoading) return;

    this.addMessage(content, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    this.setLoading(true);

    try {
      const response = await this.generateResponse(content);
      this.addMessage(response, 'ai');
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = this.currentLanguage === 'es' 
        ? 'Disculpa, hubo un error al procesar tu mensaje. Por favor intenta nuevamente.'
        : 'Sorry, there was an error processing your message. Please try again.';
      this.addMessage(errorMessage, 'ai');
    } finally {
      this.setLoading(false);
    }
  }

  addMessage(content, sender) {
    const messagesArea = document.getElementById('messagesArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message fade-in`;
    
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-text">${this.formatMessage(content)}</div>
        <div class="message-time">${timeString}</div>
      </div>
    `;
    
    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  formatMessage(content) {
    // Convertir markdown básico a HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/•\s/g, '&bull; ');
  }

  setLoading(loading) {
    this.isLoading = loading;
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    
    if (loading) {
      sendButton.disabled = true;
      messageInput.disabled = true;
      this.addMessage(
        this.currentLanguage === 'es' ? 'Pensando...' : 'Thinking...', 
        'ai'
      );
    } else {
      sendButton.disabled = false;
      messageInput.disabled = false;
      messageInput.focus();
    }
  }

  async generateResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Análisis de intención de la consulta
    if (this.isGreeting(message)) {
      return this.translations.welcome[this.currentLanguage];
    }
    
    if (this.isScriptureQuery(message)) {
      const scripture = this.searchScripture(message);
      if (scripture) {
        return `${this.translations.scriptureSearch[this.currentLanguage]}\n\n**${scripture.reference}**\n\n${scripture.text}\n\nQue este pasaje te sea de bendición y ánimo. 🙏`;
      }
    }
    
    if (this.isMinistryInfoQuery(message)) {
      return this.generateMinistryResponse(message);
    }
    
    if (this.isPrayerRequest(message)) {
      return this.translations.prayerSupport[this.currentLanguage];
    }
    
    if (this.isBiblicalStudyQuery(message)) {
      return this.translations.biblicalStudy[this.currentLanguage];
    }
    
    if (this.isEventsQuery(message)) {
      return this.getMinistryEvents();
    }
    
    if (this.isSpiritualEncouragementQuery(message)) {
      const encouragement = this.getScriptureByTheme(message);
      if (encouragement) {
        const encouragementText = this.currentLanguage === 'es' 
          ? 'Aquí tienes una palabra de esperanza para ti:'
          : 'Here is a word of hope for you:';
        return `${encouragementText}\n\n**${encouragement.reference}**\n\n${encouragement.text}\n\nQue Dios te bendiga y te fortalezca. 🙏`;
      }
    }
    
    // Búsqueda web para consultas más específicas
    const webResults = await this.searchWeb(message);
    if (webResults && webResults.length > 0) {
      return `${this.translations.webSearch[this.currentLanguage]}\n\n${webResults.join('\n\n')}`;
    }
    
    return this.translations.unknownQuery[this.currentLanguage];
  }

  searchScripture(query) {
    const cleanQuery = query.toLowerCase().trim();
    
    // Patrón para extraer referencia bíblica completa (ej: "Juan 3:16", "John 3:16")
    const scripturePattern = /\b([1-3]?\s*[A-Za-záéíóúñ]+\s+\d+(?::\d+)?)\b/;
    const match = cleanQuery.match(scripturePattern);
    
    if (match) {
      const reference = match[1].trim();
      // Normalizar la referencia (quitar espacios extra)
      const normalizedRef = reference.replace(/\s+/g, ' ');
      
      // Buscar en la base de datos
      for (const scripture of this.scriptureDatabase) {
        const dbRef = scripture.reference.toLowerCase();
        if (dbRef === normalizedRef.toLowerCase() || 
            dbRef.includes(normalizedRef.toLowerCase()) ||
            normalizedRef.toLowerCase().includes(dbRef)) {
          return scripture;
        }
      }
    }
    
    // Si no encuentra referencia exacta, buscar por palabras clave
    const keywords = this.extractKeywords(query);
    
    // Buscar por contenido
    for (const scripture of this.scriptureDatabase) {
      if (scripture.text.toLowerCase().includes(keywords.join(' '))) {
        return scripture;
      }
      
      // Buscar por temas
      if (scripture.themes.some(theme => 
        keywords.some(keyword => keyword.includes(theme))
      )) {
        return scripture;
      }
    }
    
    return null;
  }

  async searchWeb(query) {
    try {
      // Simulación de búsqueda web real
      const searchTerms = query.split(' ').slice(0, 3).join(' ');
      
      // Respuestas contextuales basadas en términos de búsqueda
      if (searchTerms.includes('servicio') || searchTerms.includes('culto')) {
        return [
          `**Servicios del Ministerio:**\n` +
          `• Horarios de culto: Domingos 10:00 AM y 6:00 PM\n` +
          `• Estudios bíblicos: Miércoles 7:00 PM\n` +
          `• Oración: Sábados 9:00 AM\n\n` +
          `📞 Contacto: ${this.ministryData.phone}\n` +
          `📧 Email: ${this.ministryData.email}`
        ];
      }
      
      if (searchTerms.includes('donaci') || searchTerms.includes('ofrenda')) {
        return [
          `**Donaciones al Ministerio:**\n` +
          `Puedes apoyar el ministerio a través de:\n\n` +
          `🌐 Sitio web: ${this.ministryData.donations}\n` +
          `🏢 En persona durante los servicios\n` +
          `📧 Contacto: ${this.ministryData.email}`
        ];
      }
      
      if (searchTerms.includes('pastor') || searchTerms.includes('ministerio')) {
        return [
          `**Ministerio del Rev. Frankie Felicie:**\n\n` +
          `👥 Pastores: ${this.ministryData.pastors}\n` +
          `⛪ ${this.ministryData.church}\n` +
          `📍 ${this.ministryData.address}\n` +
          `🌐 Web oficial: ${this.ministryData.website}\n` +
          `🤝 Red ministerial: ${this.ministryData.network}`
        ];
      }
      
      return [];
    } catch (error) {
      console.error('Error searching web:', error);
      return [];
    }
  }

  generateMinistryResponse(message) {
    const ministry = this.ministryData;
    return `**${ministry.name}**

⛪ ${ministry.church}

📍 ${ministry.address}
📞 ${ministry.phone}
📧 ${ministry.email}
🌐 Web oficial: ${ministry.website}

👥 Pastores: ${ministry.pastors}

${this.translations.ministryServices[this.currentLanguage]}
• Servicios dominicales: 10:00 AM y 6:00 PM
• Estudios bíblicos: Miércoles 7:00 PM
• Oración: Sábados 9:00 AM

💝 **Donaciones:** ${ministry.donations}`;
  }

  getMinistryEvents() {
    const events = this.currentLanguage === 'es' ? 
      [
        "**Eventos y Actividades del Ministerio:**\n\n" +
        "📅 **Servicios Regulares:**\n" +
        "• Domingos: Servicio matutino 10:00 AM, Servicio vespertino 6:00 PM\n" +
        "• Miércoles: Estudio bíblico 7:00 PM\n" +
        "• Sábados: Oración 9:00 AM\n\n" +
        "🎯 **Programas Especiales:**\n" +
        "• Estudios bíblicos temáticos\n" +
        "• Conferencias y retiros\n" +
        "• Actividades evangelísticas\n" +
        "• Programa de jóvenes\n\n" +
        `📞 Más información: ${this.ministryData.phone}\n` +
        `📧 Email: ${this.ministryData.email}`
      ] :
      [
        "**Ministry Events and Activities:**\n\n" +
        "📅 **Regular Services:**\n" +
        "• Sundays: Morning service 10:00 AM, Evening service 6:00 PM\n" +
        "• Wednesday: Bible study 7:00 PM\n" +
        "• Saturday: Prayer 9:00 AM\n\n" +
        "🎯 **Special Programs:**\n" +
        "• Thematic Bible studies\n" +
        "• Conferences and retreats\n" +
        "• Evangelistic activities\n" +
        "• Youth program\n\n" +
        `📞 More information: ${this.ministryData.phone}\n` +
        `📧 Email: ${this.ministryData.email}`
      ];
    
    return events[0];
  }

  // Métodos auxiliares para análisis de intención
  isGreeting(message) {
    const greetings = ['hola', 'hello', 'buenos', 'saludos', 'hey', 'buenas'];
    return greetings.some(greeting => message.includes(greeting));
  }

  isScriptureQuery(message) {
    const scriptureKeywords = ['biblia', 'escritura', 'versículo', 'biblical', 'scripture', 'passage', 'dice', 'dice que', 'que dice', 'versículo'];
    // Detectar patrones de referencia bíblica como "Juan 3:16", "John 3:16", "Romanos 8:28", etc.
    const scripturePattern = /\b([1-3]?\s*[A-Za-záéíóúñ]+\s+\d+(?::\d+)?)\b/;
    return scriptureKeywords.some(keyword => message.includes(keyword)) ||
           scripturePattern.test(message) ||
           // También detectar si el mensaje es solo una referencia bíblica
           (/^[1-3]?\s*[A-Za-záéíóúñ]+\s+\d+(?::\d+)?$/.test(message.trim()));
  }

  isMinistryInfoQuery(message) {
    const infoKeywords = ['ministerio', 'iglesia', 'pastor', 'servicio', 'contacto', 'horario', 'dirección'];
    return infoKeywords.some(keyword => message.includes(keyword));
  }

  isPrayerRequest(message) {
    const prayerKeywords = ['orar', 'oración', 'oraré', 'rogar', 'pray', 'prayer'];
    return prayerKeywords.some(keyword => message.includes(keyword));
  }

  isBiblicalStudyQuery(message) {
    const studyKeywords = ['estudiar', 'estudio', 'enseñanza', 'aprender', 'bíblico', 'biblical', 'study'];
    return studyKeywords.some(keyword => message.includes(keyword));
  }

  isEventsQuery(message) {
    const eventKeywords = ['evento', 'actividad', 'programa', 'calendario', 'event', 'activities'];
    return eventKeywords.some(keyword => message.includes(keyword));
  }

  extractKeywords(message) {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del'];
    return message
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }

  isSpiritualEncouragementQuery(message) {
    const encouragementKeywords = [
      'esperanza', 'hope', 'fe', 'faith', 'ánimo', 'encouragement', 'consuelo', 'comfort',
      'paz', 'peace', 'fortaleza', 'strength', 'valentía', 'courage', 'amor', 'love',
      'bendición', 'blessing', 'beneficio', 'benefit', 'ayuda', 'help', 'protección', 'protection',
      'palabra', 'word', 'mensaje', 'message', 'inspiración', 'inspiration', 'motivación', 'motivation'
    ];
    return encouragementKeywords.some(keyword => message.includes(keyword));
  }

  getScriptureByTheme(message) {
    const keywords = this.extractKeywords(message);
    
    // Mapear palabras clave a temas bíblicos
    const themeMap = {
      'esperanza': ['esperanza', 'hope'],
      'fe': ['fe', 'faith', 'creer', 'believe'],
      'ánimo': ['ánimo', 'consuelo', 'encouragement', 'comfort', 'console'],
      'paz': ['paz', 'peace', 'tranquilidad', 'quiet'],
      'fortaleza': ['fortaleza', 'strength', 'valentía', 'courage'],
      'amor': ['amor', 'love'],
      'bendición': ['bendición', 'blessing', 'bendiciones', 'blessings'],
      'protección': ['protección', 'protection', 'guarda', 'guard'],
      'sabiduría': ['sabiduría', 'wisdom'],
      'dirección': ['dirección', 'guidance', 'guía', 'guide']
    };

    // Buscar en los temas de la base de datos
    for (const scripture of this.scriptureDatabase) {
      for (const theme of scripture.themes) {
        for (const keyword of keywords) {
          if (themeMap[theme]) {
            for (const mappedWord of themeMap[theme]) {
              if (keyword.includes(mappedWord) || mappedWord.includes(keyword)) {
                return scripture;
              }
            }
          }
          // También verificar coincidencia directa con palabras clave
          if (theme.includes(keyword) || keyword.includes(theme)) {
            return scripture;
          }
        }
      }
    }
    
    // Si no encuentra por tema específico, devolver un versículo de esperanza por defecto
    const hopeScriptures = this.scriptureDatabase.filter(s => 
      s.themes.includes('esperanza') || s.themes.includes('hope')
    );
    
    if (hopeScriptures.length > 0) {
      return hopeScriptures[0]; // Devolver el primer versículo de esperanza
    }
    
    return null;
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new MinisterialAI();
});