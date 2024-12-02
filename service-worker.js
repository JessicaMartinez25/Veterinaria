var CACHE_NAME = 'my-app-cache-v1'; 
var urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/icon.png',
    '/iconoV.png',
    '/offline.html'  // Asegúrate de que tienes este archivo para el modo offline
];

// Instalar el Service Worker
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("Archivos en caché");
            return cache.addAll(urlsToCache);
        })
        .catch(function(error) {
            console.error("Fallo al guardar archivos en caché:", error);
        })
    );
});
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Elimina caches antiguos
                    }
                })
            );
        })
    );
});







// Interceptar solicitudes y servir desde caché si no hay red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                // Si la solicitud está en caché, se sirve desde allí
                return cachedResponse;
            }
            // Si no está en caché, se hace la solicitud a la red
            return fetch(event.request).then(response => {
                // Cachear la respuesta para futuras solicitudes
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            }).catch(() => {
                // Si la red no está disponible, se sirve la página offline
                return caches.match('offline.html');
            });
        })
    );
});
