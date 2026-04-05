// Service Worker for Satisfaction Meter (offline-first PWA)
const CACHE_NAME = 'sat-meter-v2';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './manifest.json',
  './sw.js'
];

// Install event: cache essential files (only those that exist)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        console.log('Opened cache', CACHE_NAME);
        // Cache each file individually to avoid failing on missing files
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
          } catch (err) {
            console.warn(`Failed to cache ${url}:`, err);
          }
        }
      })
      .catch(err => console.error('Cache addAll failed', err))
  );
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

// Fetch event: serve from cache, fallback to network, but avoid chrome-extension schemes
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;
  // Skip non-http/https requests (like chrome-extension://) to avoid errors
  if (!requestUrl.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => console.warn('Cache put failed:', err));
            return networkResponse;
          }
        ).catch(() => {
          console.warn('Fetch failed for:', requestUrl);
        });
      })
  );
});
