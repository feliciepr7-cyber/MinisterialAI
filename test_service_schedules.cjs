#!/usr/bin/env node

/**
 * Test para verificar los horarios de servicios actualizados
 * Versión: v1.4.1
 */

const fs = require('fs');
const path = require('path');

console.log('🕐 Test: Verificación de Horarios de Servicios');
console.log('=' .repeat(55));

function testServiceSchedules() {
  console.log('\n📋 Ejecutando verificaciones de horarios...');
  
  // Test 1: Verificar que los horarios actualizados están en el HTML
  console.log('\n1. ✅ Verificando horarios de servicios en HTML...');
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  const expectedSchedules = [
    '• Domingos: 11:00 AM',
    '• Miércoles: Estudio bíblico 7:00 PM',
    '• Viernes: Servicio Evangélico 7:00 PM'
  ];
  
  let allSchedulesOk = true;
  expectedSchedules.forEach(schedule => {
    if (htmlContent.includes(schedule)) {
      console.log(`   ✅ Horario encontrado: ${schedule}`);
    } else {
      console.log(`   ❌ Horario faltante: ${schedule}`);
      allSchedulesOk = false;
    }
  });
  
  if (!allSchedulesOk) return false;
  
  // Test 2: Verificar que NO están los horarios antiguos
  console.log('\n2. ✅ Verificando que se eliminaron horarios antiguos...');
  const oldSchedules = [
    '• Domingos: 10:00 AM y 6:00 PM',
    '• Sábados: Oración 9:00 AM'
  ];
  
  let noOldSchedules = true;
  oldSchedules.forEach(oldSchedule => {
    if (htmlContent.includes(oldSchedule)) {
      console.log(`   ❌ Horario antiguo aún presente: ${oldSchedule}`);
      noOldSchedules = false;
    } else {
      console.log(`   ✅ Horario antiguo correctamente eliminado: ${oldSchedule}`);
    }
  });
  
  if (!noOldSchedules) return false;
  
  // Test 3: Verificar la estructura de la sección de servicios
  console.log('\n3. ✅ Verificando estructura de la sección de servicios...');
  const servicesSectionCheck = htmlContent.includes('<div class="services-section">') &&
                               htmlContent.includes('<h4>Servicios</h4>') &&
                               htmlContent.includes('<div class="service-list">');
  
  if (servicesSectionCheck) {
    console.log('   ✅ Estructura de servicios correcta');
  } else {
    console.log('   ❌ Problema con la estructura de servicios');
    return false;
  }
  
  // Test 4: Verificar que la sección está en el lugar correcto
  console.log('\n4. ✅ Verificando ubicación de la sección de servicios...');
  const pastorsSection = htmlContent.indexOf('<h4>Pastores</h4>');
  const servicesSection = htmlContent.indexOf('<h4>Servicios</h4>');
  const donateButton = htmlContent.indexOf('class="donate-btn"');
  
  if (pastorsSection < servicesSection && servicesSection < donateButton) {
    console.log('   ✅ Sección de servicios ubicada correctamente');
  } else {
    console.log('   ❌ Sección de servicios no está en la posición correcta');
    return false;
  }
  
  // Test 5: Verificar formato consistente
  console.log('\n5. ✅ Verificando formato consistente...');
  const serviceItems = htmlContent.split('<div class="service-list">')[1]?.split('</div>')[0] || '';
  const formatChecks = [
    serviceItems.includes('• Domingos:'),
    serviceItems.includes('• Miércoles:'),
    serviceItems.includes('• Viernes:')
  ];
  
  if (formatChecks.every(check => check)) {
    console.log('   ✅ Formato consistente de los servicios');
  } else {
    console.log('   ❌ Problema con el formato de los servicios');
    return false;
  }
  
  // Test 6: Verificar que los nuevos servicios son correctos
  console.log('\n6. ✅ Verificando contenido específico de cada servicio...');
  const serviceTests = [
    {
      name: 'Domingos',
      expected: '11:00 AM',
      check: htmlContent.includes('Domingos: 11:00 AM')
    },
    {
      name: 'Miércoles',
      expected: 'Estudio bíblico 7:00 PM',
      check: htmlContent.includes('Miércoles: Estudio bíblico 7:00 PM')
    },
    {
      name: 'Viernes',
      expected: 'Servicio Evangélico 7:00 PM',
      check: htmlContent.includes('Viernes: Servicio Evangélico 7:00 PM')
    }
  ];
  
  serviceTests.forEach(test => {
    if (test.check) {
      console.log(`   ✅ ${test.name}: ${test.expected}`);
    } else {
      console.log(`   ❌ ${test.name}: Esperado "${test.expected}"`);
      return false;
    }
  });
  
  return true;
}

// Ejecutar tests
try {
  const success = testServiceSchedules();
  
  console.log('\n' + '=' .repeat(55));
  if (success) {
    console.log('🎉 ¡TODOS LOS TESTS PASARON!');
    console.log('✅ Horarios de servicios actualizados correctamente');
    console.log('✅ Domingos: 11:00 AM (actualizado)');
    console.log('✅ Miércoles: Estudio bíblico 7:00 PM (mantenido)');
    console.log('✅ Viernes: Servicio Evangélico 7:00 PM (nuevo)');
    console.log('\n🕐 Información: Horarios de servicios actualizados');
  } else {
    console.log('❌ ALGUNOS TESTS FALLARON');
    console.log('🔧 Revisar la actualización de horarios de servicios');
  }
} catch (error) {
  console.error('❌ Error ejecutando tests:', error.message);
}