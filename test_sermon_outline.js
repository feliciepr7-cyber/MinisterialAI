// Test para la funcionalidad de bosquejos de sermones
// Node.js test file

// Simulación de DOM y datos necesarios
global.document = {
  getElementById: () => null,
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};

// Importar la clase MinisterialAI desde script.js
eval(require('fs').readFileSync('/workspace/ministerial-ai/script.js', 'utf8'));

console.log('🔍 PRUEBA DE FUNCIONALIDAD DE BOSQUEJOS DE SERMONES\n');

// Crear instancia de MinisterialAI
const ai = new MinisterialAI();

// Pruebas de detección de consultas de bosquejo
console.log('=== PRUEBAS DE DETECCIÓN DE CONSULTAS ===\n');

const outlineQueries = [
  "necesito un bosquejo sobre la fe",
  "prepara un sermón sobre el amor",
  "quiero un outline about hope",
  "bosquejo para predicar sobre fortaleza",
  "mensaje sobre la esperanza"
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
  "fortaleza en Cristo"
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
  console.log('\n' + '='.repeat(60));
});

console.log('\n🎯 PRUEBA COMPLETA - SIMULACIÓN DE RESPUESTA\n');

// Simular consulta completa
const testQuery = "necesito un bosquejo sobre la fe";
console.log(`Consulta del usuario: "${testQuery}"`);

ai.generateResponse(testQuery)
  .then(response => {
    console.log('\n📖 Respuesta generada:');
    console.log('--- INICIO DE RESPUESTA ---');
    console.log(response);
    console.log('--- FIN DE RESPUESTA ---');
  })
  .catch(error => {
    console.log('❌ Error en la respuesta:', error);
  });