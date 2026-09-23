const CACHE_NAME = 'iching-pwa-v1.0.6';
const urlsToCache = [
  './index.html',
  './style.css',
  './app.js',
  './iching_3.json',
  './favicon.ico',
  './achillea-bg.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
