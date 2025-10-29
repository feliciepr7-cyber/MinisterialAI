// Test para la funcionalidad de bosquejos de sermones
// Test directo sin dependencias del DOM

console.log('🔍 PRUEBA DE FUNCIONALIDAD DE BOSQUEJOS DE SERMONES\n');

// Implementación simplificada para testing
class TestMinisterialAI {
  constructor() {
    this.currentLanguage = 'es';
  }

  isSermonOutlineQuery(message) {
    const outlineKeywords = ['bosquejo', 'outline', 'predicar', 'sermón', 'sermon', 'predicación', 'preaching', 'mensaje', 'estudio', 'enseñanza', 'teaching'];
    return outlineKeywords.some(keyword => message.includes(keyword));
  }

  extractKeywords(message) {
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del'];
    return message
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }

  generateSermonOutline(topic) {
    const keywords = this.extractKeywords(topic);
    
    // Mapear temas bíblicos a estructuras de bosquejo
    const outlineTemplates = {
      'fe': {
        title: this.currentLanguage === 'es' ? 'La Fe que Transforma Vidas' : 'Faith that Transforms Lives',
        theme: 'fe',
        mainPoints: this.currentLanguage === 'es' ? [
          'I. ¿Qué es la fe verdadera? (Hebreos 11:1)',
          'II. La fe en acción (Santiago 2:17)',
          'III. Los frutos de la fe (Romanos 1:17)'
        ] : [
          'I. What is true faith? (Hebrews 11:1)',
          'II. Faith in action (James 2:17)', 
          'III. The fruits of faith (Romans 1:17)'
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

    // Buscar tema principal en las palabras clave
    let selectedTemplate = null;
    for (const keyword of keywords) {
      if (outlineTemplates[keyword]) {
        selectedTemplate = outlineTemplates[keyword];
        break;
      }
    }

    // Si no encuentra tema, crear bosquejo genérico sobre el tema mencionado
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

    // Generar el bosquejo completo
    const outline = this.formatSermonOutline(selectedTemplate, []);
    return outline;
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

    outline += `${conclusionText}\n${conclusionContent}\n\n`;
    
    const footerText = this.currentLanguage === 'es' ? 
      '🙏 *Que Dios bendiga su ministerio de predicación y enseñanza.*' :
      '🙏 *May God bless your preaching and teaching ministry.*';
    
    outline += footerText;

    return outline;
  }
}

// Crear instancia de prueba
const ai = new TestMinisterialAI();

// Pruebas de detección de consultas de bosquejo
console.log('=== PRUEBAS DE DETECCIÓN DE CONSULTAS ===\n');

const outlineQueries = [
  "necesito un bosquejo sobre la fe",
  "prepara un sermón sobre el amor",
  "quiero un outline about hope",
  "bosquejo para predicar sobre fortaleza",
  "mensaje sobre la esperanza",
  "estudios bíblicos",
  "una consulta normal sin bosquejo"
];

outlineQueries.forEach(query => {
  const isOutlineQuery = ai.isSermonOutlineQuery(query.toLowerCase());
  console.log(`Consulta: "${query}"`);
  console.log(`¿Es consulta de bosquejo?: ${isOutlineQuery ? '✅ SÍ' : '❌ NO'}\n`);
});

// Pruebas de generación de bosquejos
console.log('=== PRUEBAS DE GENERACIÓN DE BOSQUEJOS ===\n');

const testTopics = [
  "fe",
  "amor de Dios", 
  "esperanza",
  "fortaleza en Cristo",
  "perdón y reconciliación"
];

testTopics.forEach(topic => {
  console.log(`\n--- BOSQUEJO SOBRE: "${topic}" ---`);
  try {
    const outline = ai.generateSermonOutline(topic);
    if (outline) {
      console.log('✅ Bosquejo generado exitosamente:');
      console.log(outline);
    } else {
      console.log('❌ No se pudo generar el bosquejo');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('\n' + '='.repeat(80));
});

console.log('\n✅ TODAS LAS PRUEBAS COMPLETADAS\n');