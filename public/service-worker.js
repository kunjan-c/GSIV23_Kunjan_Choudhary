/* eslint-disable no-restricted-globals */
// public/service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('myapp-cache').then(cache => {
      return cache.addAll(['/']); // Cache the main page
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});