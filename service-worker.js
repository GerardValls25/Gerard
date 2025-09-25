// 🟢 service-worker.js
const CACHE_NAME = "calculadora-macros-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap",
  "https://cdn.jsdelivr.net/npm/chart.js"
];

// 🟢 Instalación y cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("✅ Archivos cacheados");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// 🟢 Activación: elimina cachés viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log("🗑️ Eliminando caché vieja:", key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// 🟢 Estrategia de fetch: Cache First con fallback a red
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // 📦 Devuelve desde cache
      }
      return fetch(event.request).then(networkResponse => {
        // Guarda en caché nuevos recursos obtenidos de la red
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Fallback en caso de estar offline y no tener cache
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
