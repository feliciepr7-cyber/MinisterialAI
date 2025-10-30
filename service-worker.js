// Service Worker para Ministerio AI - PWA
const CACHE_NAME = 'ministerio-ai-v1';
const STATIC_CACHE = 'ministerio-ai-static-v1';
const DYNAMIC_CACHE = 'ministerio-ai-dynamic-v1';

// Archivos esenciales para cachear
const STATIC_FILES = [
  './',
  './index.html',
  './sermons.html',
  './devotionals.html',
  './bible-study.html',
  './prayers.html',
  './events.html',
  '/styles.css',
  '/script-enhanced.js',
  '/openai-config.js',
  '/supabase-client.js'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Cacheando archivos estáticos');
        return cache.addAll(STATIC_FILES.map(url => new Request(url, { cache: 'reload' })));
      })
      .catch((error) => {
        console.error('[Service Worker] Error al cachear archivos:', error);
      })
  );
  
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});

// Estrategia de caché: Network First con fallback a Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // No cachear llamadas a APIs externas (Supabase, OpenAI, etc)
  if (url.origin.includes('supabase.co') || 
      url.origin.includes('openai.com') ||
      url.origin.includes('bible-api.com') ||
      url.origin.includes('openweathermap.org')) {
    return; // Permitir que la petición continúe normalmente
  }

  // Estrategia Network First para recursos locales
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si la respuesta es válida, cachearla y devolverla
        if (response && response.status === 200) {
          const responseClone = response.clone();
          
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar obtener del cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Si tampoco está en cache, devolver página offline si es navegación
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          
          return new Response('Sin conexión', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Sincronización en segundo plano (para futuras mejoras)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Sincronización en segundo plano:', event.tag);
  
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Placeholder para sincronizar analytics cuando haya conexión
  console.log('[Service Worker] Sincronizando analytics...');
}

// Notificaciones push (para futuras mejoras)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recibido:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización del Ministerio',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Ministerio AI', options)
  );
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificación clickeada:', event);
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('./')
  );
});
