// Ministerial AI Enhanced - JavaScript Implementation with OpenAI Integration
// Agente AI para el Ministerio del Rev. Frankie Felicie con capacidades avanzadas

class MinisterialAIEnhanced {
  constructor() {
    this.currentLanguage = 'es';
    this.isLoading = false;
    this.openaiApiKey = ''; // Configurar tu API key de OpenAI aquí
    this.openaiModel = 'gpt-3.5-turbo'; // o 'gpt-4' si tienes acceso
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateWelcomeMessage();
    this.startTimeUpdater();
  }

  // Configuración de la API Key de OpenAI
  setOpenAIKey(apiKey) {
    this.openaiApiKey = apiKey;
  }

  // Datos del Ministerio
  get ministryData() {
    return {
      name: "Frankie Felicie Ministries",
      church: "Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc.",
      address: "2702 New Hampshire St, Lake Station, IN 46405",
      phone: "(219) 246-5775",
      email: "info@frankiefelicie.net",
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
        es: "¡Hola! Soy Ministerio AI, tu asistente del ministerio. ¿En qué puedo ayudarte hoy?",
        en: "Hello! I'm Ministerio AI, your ministry assistant. How can I help you today?"
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
      },
      openaiProcessing: {
        es: "Procesando con IA avanzada...",
        en: "Processing with advanced AI..."
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

  // MÉTODO PRINCIPAL MEJORADO - LÓGICA HÍBRIDA
  async generateResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // 1. PRIMERO: Verificar consultas ministeriales específicas
    if (this.isMinistrySpecificQuery(message)) {
      return await this.handleMinistrySpecificQuery(message);
    }
    
    // 2. SEGUNDO: Verificar consultas bíblicas
    if (this.isScriptureQuery(message)) {
      const scripture = this.searchScripture(message);
      if (scripture) {
        return `${this.translations.scriptureSearch[this.currentLanguage]}\n\n**${scripture.reference}**\n\n${scripture.text}\n\nQue este pasaje te sea de bendición y ánimo. 🙏`;
      }
    }
    
    // 3. TERCERO: Usar OpenAI para consultas generales
    if (this.openaiApiKey && this.shouldUseOpenAI(message)) {
      return await this.callOpenAI(userMessage);
    }
    
    // 4. CUARTO: Respuesta de fallback con IA
    return this.getFallbackResponse();
  }

  // Determinar si debe usar OpenAI
  shouldUseOpenAI(message) {
    // Palabras que indican consulta general
    const generalQueryKeywords = [
      'explica', 'explicar', 'cómo', 'qué', 'por qué', 'cuándo', 'dónde', 'quién',
      'explain', 'how', 'what', 'why', 'when', 'where', 'who', 'which',
      'que es', 'como funciona', 'que significa', 'ayuda con', 'help with',
      'traduce', 'translate', 'resume', 'resume', 'crear', 'create',
      'planifica', 'plan', 'organiza', 'organize', 'sugiere', 'suggest'
    ];
    
    // Palabras que indican consultas ministeriales (NO usar OpenAI)
    const ministryKeywords = [
      'ministerio', 'iglesia', 'pastor', 'servicio', 'horario', 'contacto',
      'culto', 'predicación', 'sermón', 'bosquejo', 'biblia', 'oración',
      'escuela dominical', 'ministery', 'church', 'pastor', 'service',
      'biblical', 'prayer', 'sermon', 'outline', 'worship'
    ];
    
    // Si contiene palabras ministeriales específicas, NO usar OpenAI
    if (ministryKeywords.some(keyword => message.includes(keyword))) {
      return false;
    }
    
    // Si contiene palabras de consulta general, SÍ usar OpenAI
    return generalQueryKeywords.some(keyword => message.includes(keyword));
  }

  // Consultas ministeriales específicas
  isMinistrySpecificQuery(message) {
    const ministrySpecificKeywords = [
      'ministerio', 'iglesia', 'pastor', 'servicio', 'horario', 'contacto',
      'dirección', 'teléfono', 'email', 'donación', 'pastor', 'frankie',
      'lydia', 'culto', 'dominicales', 'estudio bíblico', 'evangelístico',
      'ministery', 'church', 'pastor', 'service', 'schedule', 'contact',
      'worship', 'biblical study', 'evangelistic'
    ];
    
    return ministrySpecificKeywords.some(keyword => message.includes(keyword));
  }

  async handleMinistrySpecificQuery(message) {
    if (this.isMinistryInfoQuery(message)) {
      return this.generateMinistryResponse(message);
    }
    
    if (this.isEventsQuery(message)) {
      return this.getMinistryEvents();
    }
    
    if (this.isScriptureQuery(message)) {
      const scripture = this.searchScripture(message);
      if (scripture) {
        return `${this.translations.scriptureSearch[this.currentLanguage]}\n\n**${scripture.reference}**\n\n${scripture.text}\n\nQue este pasaje te sea de bendición y ánimo. 🙏`;
      }
    }
    
    if (this.isSermonOutlineQuery(message)) {
      const outline = this.generateSermonOutline(message);
      if (outline) {
        return outline;
      }
    }
    
    if (this.isPrayerRequest(message)) {
      return this.translations.prayerSupport[this.currentLanguage];
    }
    
    return this.generateMinistryResponse(message);
  }

  // NUEVA FUNCIÓN: Llamada a OpenAI API
  async callOpenAI(userMessage) {
    try {
      // Actualizar mensaje de carga
      const loadingMessage = document.querySelector('.message.ai-message:last-child .message-text');
      if (loadingMessage) {
        loadingMessage.textContent = this.translations.openaiProcessing[this.currentLanguage];
      }

      const systemPrompt = this.currentLanguage === 'es' 
        ? `Eres un asistente cristiano llamado Ministerio AI del ministerio del Rev. Frankie Felicie. Tu tono debe ser amable, sabio y acorde con valores cristianos. Siempre mantén un enfoque espiritual y positivo. Si te preguntan sobre el ministerio específico, responde con información sobre la Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc., pero para consultas generales, responde de manera útil y cristiana.`
        : `You are a Christian assistant called Ministry AI from Rev. Frankie Felicie's ministry. Your tone should be kind, wise, and aligned with Christian values. Always maintain a spiritual and positive approach. If asked about the specific ministry, respond with information about Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc., but for general queries, respond in a helpful and Christian way.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`
        },
        body: JSON.stringify({
          model: this.openaiModel,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
      
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return this.getFallbackResponse();
    }
  }

  // Respuesta de fallback cuando OpenAI no está disponible
  getFallbackResponse() {
    const responses = this.currentLanguage === 'es' ? [
      "Entiendo tu consulta. Para ayudarte mejor, ¿podrías ser más específico? Puedo asistirte con información del ministerio, versículos bíblicos, estudios, o servicios.",
      "Gracias por tu pregunta. Si necesitas información específica sobre nuestro ministerio, horarios de servicio, o estudios bíblicos, estaré encantado de ayudarte.",
      "Es un gusto poder asistirte. ¿Hay algún tema específico del ministerio, la Biblia, o nuestros servicios sobre los que te gustaría conocer más?"
    ] : [
      "I understand your question. To help you better, could you be more specific? I can assist you with ministry information, biblical verses, studies, or services.",
      "Thank you for your question. If you need specific information about our ministry, service schedules, or biblical studies, I'll be happy to help.",
      "It's a pleasure to assist you. Is there a specific topic about the ministry, the Bible, or our services you'd like to learn more about?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Todos los métodos existentes mantienen la misma funcionalidad...
  searchScripture(query) {
    const cleanQuery = query.toLowerCase().trim();
    
    // Patrón para extraer referencia bíblica completa
    const scripturePattern = /\b([1-3]?\s*[A-Za-záéíóúñ]+\s+\d+(?::\d+)?)\b/;
    const match = cleanQuery.match(scripturePattern);
    
    if (match) {
      const reference = match[1].trim();
      const normalizedRef = reference.replace(/\s+/g, ' ');
      
      for (const scripture of this.scriptureDatabase) {
        const dbRef = scripture.reference.toLowerCase();
        if (dbRef === normalizedRef.toLowerCase() || 
            dbRef.includes(normalizedRef.toLowerCase()) ||
            normalizedRef.toLowerCase().includes(dbRef)) {
          return scripture;
        }
      }
    }
    
    const keywords = this.extractKeywords(query);
    
    for (const scripture of this.scriptureDatabase) {
      if (scripture.text.toLowerCase().includes(keywords.join(' '))) {
        return scripture;
      }
      
      if (scripture.themes.some(theme => 
        keywords.some(keyword => keyword.includes(theme))
      )) {
        return scripture;
      }
    }
    
    return null;
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

  generateSermonOutline(topic) {
    const keywords = this.extractKeywords(topic);
    
    const outlineTemplates = {
      'fe': {
        title: this.currentLanguage === 'es' ? 'La Fe que Transforma Vidas' : 'Faith that Transforms Lives',
        theme: 'fe',
        mainPoints: this.currentLanguage === 'es' ? [
          'I. ¿Qué es la fe verdadera? (Hebreos 11:1)',
          '   • Definición bíblica de la fe',
          '   • Elementos esenciales: esperanza y convicción',
          'II. La fe en acción (Santiago 2:17)',
          '   • La fe sin obras está muerta',
          '   • Ejemplos de fe en acción',
          'III. Los frutos de la fe (Romanos 1:17)',
          '   • Transformación personal',
          '   • Crecimiento en la vida cristiana'
        ] : [
          'I. What is true faith? (Hebrews 11:1)',
          '   • Biblical definition of faith',
          '   • Essential elements: hope and conviction',
          'II. Faith in action (James 2:17)',
          '   • Faith without works is dead',
          '   • Examples of faith in action',
          'III. The fruits of faith (Romans 1:17)',
          '   • Personal transformation',
          '   • Growth in Christian life'
        ]
      },
      'amor': {
        title: this.currentLanguage === 'es' ? 'El Amor de Dios en Nuestras Vidas' : 'God\'s Love in Our Lives',
        theme: 'amor',
        mainPoints: this.currentLanguage === 'es' ? [
          'I. La naturaleza del amor divino (1 Juan 4:8)',
          'II. Manifestaciones del amor de Dios (Juan 3:16)',
          'III. Viviendo en el amor de Cristo (1 Corintios 13:4-7)'
        ] : [
          'I. The nature of divine love (1 John 4:8)',
          'II. Manifestations of God\'s love (John 3:16)',
          'III. Living in Christ\'s love (1 Corinthians 13:4-7)'
        ]
      },
      'esperanza': {
        title: this.currentLanguage === 'es' ? 'La Esperanza que No Defrauda' : 'Hope that Does Not Disappoint',
        theme: 'esperanza',
        mainPoints: this.currentLanguage === 'es' ? [
          'I. El fundamento de nuestra esperanza (Romanos 8:28)',
          'II. Esperanza en medio de la adversidad (Salmo 91:2)',
          'III. La esperanza eterna (Jeremías 29:11)'
        ] : [
          'I. The foundation of our hope (Romans 8:28)',
          'II. Hope in the midst of adversity (Psalm 91:2)',
          'III. Eternal hope (Jeremiah 29:11)'
        ]
      },
      'fortaleza': {
        title: this.currentLanguage === 'es' ? 'Fortaleza en Cristo' : 'Strength in Christ',
        theme: 'fortaleza',
        mainPoints: this.currentLanguage === 'es' ? [
          'I. Nuestra debilidad, Su fuerza (2 Corintios 12:9)',
          'II. Todo lo puedo en Cristo (Filipenses 4:13)',
          'III. Fortalecidos en el Señor (Isaías 41:10)'
        ] : [
          'I. Our weakness, His strength (2 Corinthians 12:9)',
          'II. I can do all things through Christ (Philippians 4:13)',
          'III. Strengthened in the Lord (Isaiah 41:10)'
        ]
      }
    };

    let selectedTemplate = null;
    for (const keyword of keywords) {
      if (outlineTemplates[keyword]) {
        selectedTemplate = outlineTemplates[keyword];
        break;
      }
    }

    if (!selectedTemplate) {
      const relatedScriptures = this.scriptureDatabase.filter(scripture => 
        scripture.themes.some(theme => keywords.includes(theme)) ||
        keywords.some(keyword => scripture.text.toLowerCase().includes(keyword))
      );

      if (relatedScriptures.length > 0) {
        const mainScripture = relatedScriptures[0];
        selectedTemplate = {
          title: this.currentLanguage === 'es' ? 
            `Reflexiones sobre ${mainScripture.reference}` : 
            `Reflections on ${mainScripture.reference}`,
          theme: mainScripture.themes[0],
          mainPoints: this.currentLanguage === 'es' ? [
            `I. El contexto bíblico (${mainScripture.reference})`,
            'II. Aplicación personal',
            'III. Viviendo la verdad bíblica'
          ] : [
            `I. Biblical context (${mainScripture.reference})`,
            'II. Personal application',
            'III. Living biblical truth'
          ],
          scripture: mainScripture
        };
      }
    }

    if (!selectedTemplate) {
      const topicTitle = keywords.length > 0 ? keywords[0] : 'vida cristiana';
      selectedTemplate = {
        title: this.currentLanguage === 'es' ? 
          `Enseñanzas Bíblicas sobre ${topicTitle.charAt(0).toUpperCase() + topicTitle.slice(1)}` :
          `Biblical Teachings on ${topicTitle.charAt(0).toUpperCase() + topicTitle.slice(1)}`,
        theme: topicTitle,
        mainPoints: this.currentLanguage === 'es' ? [
          'I. Fundamento bíblico',
          'II. Aplicación práctica',
          'III. Transformación personal'
        ] : [
          'I. Biblical foundation',
          'II. Practical application', 
          'III. Personal transformation'
        ]
      };
    }

    const supportingScriptures = this.scriptureDatabase.filter(scripture => 
      scripture.themes.includes(selectedTemplate.theme) ||
      (selectedTemplate.scripture && scripture.reference === selectedTemplate.scripture.reference)
    );

    return this.formatSermonOutline(selectedTemplate, supportingScriptures);
  }

  formatSermonOutline(template, scriptures) {
    const headerText = this.currentLanguage === 'es' ? 
      '📖 **BOSQUEJO PARA PREDICACIÓN**' : 
      '📖 **SERMON OUTLINE**';
    
    const introText = this.currentLanguage === 'es' ? 
      '**Introducción:**' : 
      '**Introduction:**';
    
    const pointsText = this.currentLanguage === 'es' ? 
      '**Puntos Principales:**' : 
      '**Main Points:**';
    
    const scripturesText = this.currentLanguage === 'es' ? 
      '**Versículos de Apoyo:**' : 
      '**Supporting Scriptures:**';
    
    const conclusionText = this.currentLanguage === 'es' ? 
      '**Conclusión:**' : 
      '**Conclusion:**';

    const introContent = this.currentLanguage === 'es' ? 
      'Presentar el tema con una ilustración o testimonio relevante. Establecer la importancia del tema en la vida cristiana.' :
      'Present the topic with a relevant illustration or testimony. Establish the importance of the topic in Christian life.';

    const conclusionContent = this.currentLanguage === 'es' ? 
      'Resumir los puntos principales y hacer un llamado a la aplicación práctica. Ofrecer una oración de compromiso.' :
      'Summarize the main points and make a call for practical application. Offer a prayer of commitment.';

    let outline = `${headerText}\n\n`;
    outline += `**Título:** ${template.title}\n\n`;
    
    outline += `${introText}\n${introContent}\n\n`;
    
    outline += `${pointsText}\n`;
    template.mainPoints.forEach(point => {
      outline += `${point}\n`;
    });
    outline += '\n';

    if (scriptures.length > 0) {
      outline += `${scripturesText}\n`;
      scriptures.slice(0, 3).forEach(scripture => {
        outline += `• **${scripture.reference}:** "${scripture.text}"\n`;
      });
      outline += '\n';
    }

    outline += `${conclusionText}\n${conclusionContent}\n\n`;
    
    const footerText = this.currentLanguage === 'es' ? 
      '🙏 *Que Dios bendiga su ministerio de predicación y enseñanza.*' :
      '🙏 *May God bless your preaching and teaching ministry.*';
    
    outline += footerText;

    return outline;
  }

  // Métodos auxiliares para análisis de intención (mantienen la misma lógica)
  isGreeting(message) {
    const greetings = ['hola', 'hello', 'buenos', 'saludos', 'hey', 'buenas'];
    return greetings.some(greeting => message.includes(greeting));
  }

  isScriptureQuery(message) {
    const scriptureKeywords = ['biblia', 'escritura', 'versículo', 'biblical', 'scripture', 'passage', 'dice', 'dice que', 'que dice', 'versículo'];
    const scripturePattern = /\b([1-3]?\s*[A-Za-záéíóúñ]+\s+\d+(?::\d+)?)\b/;
    return scriptureKeywords.some(keyword => message.includes(keyword)) ||
           scripturePattern.test(message) ||
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

  isSermonOutlineQuery(message) {
    const outlineKeywords = ['bosquejo', 'outline', 'predicar', 'sermón', 'sermon', 'predicación', 'preaching', 'mensaje', 'estudio', 'enseñanza', 'teaching', 'esquema', 'plan', 'structure'];
    return outlineKeywords.some(keyword => message.includes(keyword));
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

  extractKeywords(message) {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del', 'sobre', 'acerca', 'prepara', 'dame', 'un', 'una', 'mi', 'tu', 'su'];
    return message
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 1 && !stopWords.includes(word));
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMDOMLoaded', () => {
  // Reemplazar MinisterialAI con MinisterialAIEnhanced
  window.ministerialAI = new MinisterialAIEnhanced();
  
  // Configurar API Key (en producción, esto debería ser seguro)
  // window.ministerialAI.setOpenAIKey('tu-api-key-de-openai-aqui');
});