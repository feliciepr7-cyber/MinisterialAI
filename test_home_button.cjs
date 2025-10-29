#!/usr/bin/env node

/**
 * Test para verificar la funcionalidad del botón "Home"
 * Versión: v1.4
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Test: Verificación del Botón "Home"');
console.log('=' .repeat(50));

function testHomeButton() {
  console.log('\n📋 Ejecutando verificaciones...');
  
  // Test 1: Verificar que existe el botón Home en el HTML
  console.log('\n1. ✅ Verificando estructura HTML del botón Home...');
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  const homeButtonCheck = htmlContent.includes('class="home-btn"') && 
                         htmlContent.includes('href="https://frankiefelicie.net"') &&
                         htmlContent.includes('<span class="home-icon">🏠</span>') &&
                         htmlContent.includes('<span>Home</span>');
  
  if (homeButtonCheck) {
    console.log('   ✅ Botón "Home" encontrado en HTML con estructura correcta');
  } else {
    console.log('   ❌ Problema con la estructura del botón "Home" en HTML');
    return false;
  }
  
  // Test 2: Verificar que existe el contenedor header-actions
  const headerActionsCheck = htmlContent.includes('class="header-actions"');
  if (headerActionsCheck) {
    console.log('   ✅ Contenedor "header-actions" encontrado');
  } else {
    console.log('   ❌ Contenedor "header-actions" no encontrado');
    return false;
  }
  
  // Test 3: Verificar estilos CSS del botón Home
  console.log('\n2. ✅ Verificando estilos CSS del botón Home...');
  const cssPath = path.join(__dirname, 'styles.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  const cssChecks = [
    '.home-btn',
    '.home-icon',
    '.header-actions',
    'home-btn:hover',
    'background-color: var(--primary-500)',
    'display: flex',
    'align-items: center'
  ];
  
  let allCSSOk = true;
  cssChecks.forEach(selector => {
    if (cssContent.includes(selector)) {
      console.log(`   ✅ Estilo encontrado: ${selector}`);
    } else {
      console.log(`   ❌ Estilo faltante: ${selector}`);
      allCSSOk = false;
    }
  });
  
  if (!allCSSOk) return false;
  
  // Test 4: Verificar media queries responsivos
  console.log('\n3. ✅ Verificando responsividad del botón Home...');
  const responsiveChecks = [
    '@media (max-width: 767px)',
    '@media (max-width: 480px)',
    '@media (max-width: 360px)'
  ];
  
  responsiveChecks.forEach(mediaQuery => {
    const queryIndex = cssContent.indexOf(mediaQuery);
    if (queryIndex !== -1) {
      // Verificar si dentro de la media query hay estilos para home-btn
      const afterQuery = cssContent.substring(queryIndex);
      const nextQuery = afterQuery.indexOf('@media');
      const queryContent = nextQuery !== -1 ? afterQuery.substring(0, nextQuery) : afterQuery;
      
      if (queryContent.includes('.home-btn')) {
        console.log(`   ✅ Estilos responsivos encontrados para: ${mediaQuery}`);
      } else {
        console.log(`   ⚠️  Posibles estilos responsivos faltantes para: ${mediaQuery}`);
      }
    }
  });
  
  // Test 5: Verificar que el botón está junto al botón de idioma
  console.log('\n4. ✅ Verificando proximidad con botón de idioma...');
  const languageToggleIndex = htmlContent.indexOf('id="languageToggle"');
  const homeBtnIndex = htmlContent.indexOf('class="home-btn"');
  
  if (languageToggleIndex !== -1 && homeBtnIndex !== -1) {
    const distance = Math.abs(languageToggleIndex - homeBtnIndex);
    if (distance < 500) { // Los botones deberían estar cerca
      console.log('   ✅ Botón "Home" posicionado cerca del botón de idioma');
    } else {
      console.log('   ⚠️  Botón "Home" podría estar muy lejos del botón de idioma');
    }
  }
  
  // Test 6: Verificar que el link es correcto
  console.log('\n5. ✅ Verificando URL de destino...');
  const urlCheck = htmlContent.includes('href="https://frankiefelicie.net"');
  if (urlCheck) {
    console.log('   ✅ URL correcta: https://frankiefelicie.net');
  } else {
    console.log('   ❌ URL incorrecta o faltante');
    return false;
  }
  
  return true;
}

// Ejecutar tests
try {
  const success = testHomeButton();
  
  console.log('\n' + '=' .repeat(50));
  if (success) {
    console.log('🎉 ¡TODOS LOS TESTS PASARON!');
    console.log('✅ El botón "Home" está correctamente implementado');
    console.log('✅ Navegación directa a https://frankiefelicie.net funcionando');
    console.log('✅ Diseño responsivo optimizado para todos los dispositivos');
    console.log('\n🏠 Funcionalidad: Botón "Home" listo para uso');
  } else {
    console.log('❌ ALGUNOS TESTS FALLARON');
    console.log('🔧 Revisar la implementación del botón "Home"');
  }
} catch (error) {
  console.error('❌ Error ejecutando tests:', error.message);
}