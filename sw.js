// Service Worker for Satisfaction Meter (offline-first PWA)
const CACHE_NAME = 'sat-meter-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/manifest.json',
  '/sw.js',
  // icons (all provided icon files)
  '/icons/launchericon-72x72.png',
  '/icons/launchericon-96x96.png',
  '/icons/launchericon-144x144.png',
  '/icons/launchericon-192x192.png',
  '/icons/launchericon-512x512.png',
  '/icons/192.png'
];

// Install event: cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache addAll failed', err))
  );
  // Force waiting service worker to become active
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve from cache, fallback to network (but app is offline-first)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          networkResponse => {
            // Check if valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            // Clone response for caching
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        ).catch(() => {
          // Optional: fallback offline page (not required, but we can return a generic response)
          // For HTML requests, could return offline.html; but we assume everything needed is cached.
          // Since all critical assets are cached, this error should rarely happen.
          console.warn('Fetch failed for:', event.request.url);
        });
      })
  );
});
