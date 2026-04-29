const CACHE_NAME = 'gloapp-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/app-icon-512.png',
  '/favicon.svg',
  '/hero.png',
  '/cloud-illustration.png',
  '/vision-1.png',
  '/vision-2.png',
  '/vision-3.png',
  '/vision-4.png',
  '/vision-5.png',
  '/vision-6.png',
  '/vision-7.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
