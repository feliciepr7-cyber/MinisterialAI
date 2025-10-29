import { AIMinistryAgent, ScriptureReference, MinistryInfo, LocalizedStrings, Language } from '../types';

// Datos del ministerio
const ministryData: MinistryInfo = {
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

// Base de datos de versículos bíblicos (RVR1960)
const scriptureDatabase: ScriptureReference[] = [
  {
    reference: "Juan 3:16",
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    version: "RVR1960",
    category: "new_testament"
  },
  {
    reference: "Salmo 23:1",
    text: "Jehová es mi pastor; nada me faltará.",
    version: "RVR1960",
    category: "old_testament"
  },
  {
    reference: "Filipenses 4:13",
    text: "Todo lo puedo en Cristo que me fortalece.",
    version: "RVR1960",
    category: "new_testament"
  },
  {
    reference: "Romanos 8:28",
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
    version: "RVR1960",
    category: "new_testament"
  },
  {
    reference: "Proverbios 3:5-6",
    text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
    version: "RVR1960",
    category: "old_testament"
  },
  {
    reference: "Mateo 28:20",
    text: "he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.",
    version: "RVR1960",
    category: "new_testament"
  },
  {
    reference: "1 Corintios 13:4",
    text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.",
    version: "RVR1960",
    category: "new_testament"
  },
  {
    reference: "Isaías 41:10",
    text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
    version: "RVR1960",
    category: "old_testament"
  }
];

// Strings localizados
const localizedStrings: LocalizedStrings = {
  welcome: {
    es: "¡Hola! Soy Ministerial AI, tu asistente bíblico y administrativo del ministerio del Rev. Frankie Felicie. Estoy aquí para ayudarte con preguntas sobre la Biblia, doctrina cristiana, servicios del ministerio y mucho más. ¿En qué puedo asistirte hoy?",
    en: "Hello! I'm Ministerial AI, your biblical and administrative assistant for Rev. Frankie Felicie's ministry. I'm here to help you with questions about the Bible, Christian doctrine, ministry services, and much more. How can I assist you today?"
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
  }
};

export class MinisterialAIAgent implements AIMinistryAgent {
  ministryInfo = ministryData;
  scriptureDatabase = scriptureDatabase;

  async generateResponse(userMessage: string, language: Language): Promise<string> {
    const message = userMessage.toLowerCase().trim();
    
    // Análisis de intención de la consulta
    if (this.isGreeting(message)) {
      return localizedStrings.welcome[language];
    }
    
    if (this.isScriptureQuery(message)) {
      const scripture = this.searchScripture(message, language);
      if (scripture) {
        return `${localizedStrings.scriptureSearch[language]}\n\n**${scripture.reference}**\n\n${scripture.text}\n\nQue este pasaje te sea de bendición y ánimo. 🙏`;
      }
    }
    
    if (this.isMinistryInfoQuery(message)) {
      return this.generateMinistryResponse(message, language);
    }
    
    if (this.isPrayerRequest(message)) {
      return localizedStrings.prayerSupport[language];
    }
    
    if (this.isBiblicalStudyQuery(message)) {
      return localizedStrings.biblicalStudy[language];
    }
    
    if (this.isEventsQuery(message)) {
      return this.getMinistryEvents(language);
    }
    
    // Búsqueda web para consultas más específicas
    const webResults = await this.searchWeb(message);
    if (webResults && webResults.length > 0) {
      return `${localizedStrings.webSearch[language]}\n\n${webResults.join('\n\n')}`;
    }
    
    return localizedStrings.unknownQuery[language];
  }

  searchScripture(query: string, language: Language): ScriptureReference | null {
    const keywords = this.extractKeywords(query);
    
    // Buscar por referencia directa
    for (const scripture of this.scriptureDatabase) {
      if (scripture.reference.toLowerCase().includes(keywords.join(' '))) {
        return scripture;
      }
      
      // Buscar por contenido
      if (scripture.text.toLowerCase().includes(keywords.join(' '))) {
        return scripture;
      }
    }
    
    // Búsqueda semántica simplificada
    const themeMappings: { [key: string]: string[] } = {
      'amor': ['Juan 3:16', '1 Corintios 13:4'],
      'fe': ['Filipenses 4:13', 'Romanos 8:28'],
      'paz': ['Salmo 23:1', 'Filipenses 4:13'],
      'esperanza': ['Romanos 8:28', 'Isaías 41:10'],
      'oración': ['Filipenses 4:13', 'Isaías 41:10'],
      'fortaleza': ['Filipenses 4:13', 'Isaías 41:10'],
      'confianza': ['Proverbios 3:5-6', 'Isaías 41:10']
    };
    
    for (const [theme, references] of Object.entries(themeMappings)) {
      if (keywords.some(keyword => keyword.includes(theme))) {
        const reference = references[0];
        return this.scriptureDatabase.find(s => s.reference === reference) || null;
      }
    }
    
    return null;
  }

  async searchWeb(query: string): Promise<string[]> {
    try {
      // Simulación de búsqueda web real
      // En una implementación real, aquí se haría una llamada a API de búsqueda
      const searchTerms = query.split(' ').slice(0, 3).join(' ');
      
      // Respuestas contextuales basadas en términos de búsqueda
      if (searchTerms.includes('servicio') || searchTerms.includes('culto')) {
        return [
          "**Servicios del Ministerio:**\n" +
          `• Horarios de culto: Domingos 10:00 AM y 6:00 PM\n` +
          `• Estudios bíblicos: Miércoles 7:00 PM\n` +
          `• Oración: Sábados 9:00 AM\n\n` +
          `📞 Contacto: ${this.ministryInfo.phone}\n` +
          `📧 Email: ${this.ministryInfo.email}`
        ];
      }
      
      if (searchTerms.includes('donaci') || searchTerms.includes('ofrenda')) {
        return [
          "**Donaciones al Ministerio:**\n" +
          `Puedes apoyar el ministerio a través de:\n\n` +
          `🌐 Sitio web: ${this.ministryInfo.donations}\n` +
          `🏢 En persona durante los servicios\n` +
          `📧 Contacto: ${this.ministryInfo.email}`
        ];
      }
      
      if (searchTerms.includes('pastor') || searchTerms.includes('ministerio')) {
        return [
          "**Ministerio del Rev. Frankie Felicie:**\n\n" +
          `👥 Pastores: ${this.ministryInfo.pastors}\n` +
          `⛪ ${this.ministryInfo.church}\n` +
          `📍 ${this.ministryInfo.address}\n` +
          `🌐 Web oficial: ${this.ministryInfo.website}\n` +
          `🤝 Red ministerial: ${this.ministryInfo.network}`
        ];
      }
      
      return [];
    } catch (error) {
      console.error('Error searching web:', error);
      return [];
    }
  }

  generateMinistryResponse(message: string, language: Language): string {
    const messages = {
      es: [
        `**${this.ministryInfo.name}**\n\n` +
        `⛪ ${this.ministryInfo.church}\n\n` +
        `📍 ${this.ministryInfo.address}\n` +
        `📞 ${this.ministryInfo.phone}\n` +
        `📧 ${this.ministryInfo.email}\n` +
        `🌐 Web oficial: ${this.ministryInfo.website}\n\n` +
        `👥 Pastores: ${this.ministryInfo.pastors}\n\n` +
        `${localizedStrings.ministryServices[language]}\n` +
        `• Servicios dominicales: 10:00 AM y 6:00 PM\n` +
        `• Estudios bíblicos: Miércoles 7:00 PM\n` +
        `• Oración: Sábados 9:00 AM\n\n` +
        `💝 **Donaciones:** ${this.ministryInfo.donations}`
      ],
      en: [
        `**${this.ministryInfo.name}**\n\n` +
        `⛪ ${this.ministryInfo.church}\n\n` +
        `📍 ${this.ministryInfo.address}\n` +
        `📞 ${this.ministryInfo.phone}\n` +
        `📧 ${this.ministryInfo.email}\n` +
        `🌐 Official website: ${this.ministryInfo.website}\n\n` +
        `👥 Pastors: ${this.ministryInfo.pastors}\n\n` +
        `${localizedStrings.ministryServices[language]}\n` +
        `• Sunday services: 10:00 AM and 6:00 PM\n` +
        `• Bible studies: Wednesday 7:00 PM\n` +
        `• Prayer: Saturday 9:00 AM\n\n` +
        `💝 **Donations:** ${this.ministryInfo.donations}`
      ]
    };
    
    return messages[language][0];
  }

  // Métodos auxiliares para análisis de intención
  private isGreeting(message: string): boolean {
    const greetings = ['hola', 'hello', 'buenos', 'saludos', 'hey', 'buenas'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isScriptureQuery(message: string): boolean {
    const scriptureKeywords = ['biblia', 'escritura', 'versículo', 'biblical', 'scripture', 'passage'];
    return scriptureKeywords.some(keyword => message.includes(keyword)) ||
           /(\d+\s*[a-z]+\s*\d+)/.test(message); // Formato: Juan 3:16
  }

  private isMinistryInfoQuery(message: string): boolean {
    const infoKeywords = ['ministerio', 'iglesia', 'pastor', 'servicio', 'contacto', 'horario', 'dirección'];
    return infoKeywords.some(keyword => message.includes(keyword));
  }

  private isPrayerRequest(message: string): boolean {
    const prayerKeywords = ['orar', 'oración', 'oraré', 'rogar', 'pray', 'prayer'];
    return prayerKeywords.some(keyword => message.includes(keyword));
  }

  private isBiblicalStudyQuery(message: string): boolean {
    const studyKeywords = ['estudiar', 'estudio', 'enseñanza', 'aprender', 'bíblico', 'biblical', 'study'];
    return studyKeywords.some(keyword => message.includes(keyword));
  }

  private isEventsQuery(message: string): boolean {
    const eventKeywords = ['evento', 'actividad', 'programa', 'calendario', 'event', 'activities'];
    return eventKeywords.some(keyword => message.includes(keyword));
  }

  private extractKeywords(message: string): string[] {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del'];
    return message
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }

  private getMinistryEvents(language: Language): string {
    const events = {
      es: [
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
        `📞 Más información: ${this.ministryInfo.phone}\n` +
        `📧 Email: ${this.ministryInfo.email}`
      ],
      en: [
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
        `📞 More information: ${this.ministryInfo.phone}\n` +
        `📧 Email: ${this.ministryInfo.email}`
      ]
    };
    
    return events[language][0];
  }
}