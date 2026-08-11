const CACHE = 'sod-shell-v3.1.2-floating-portal';
const SHELL = ['/', '/index.html', '/styles.css', '/manifest.webmanifest', '/offline.html', '/js/app.js', '/js/views.js', '/js/content.js', '/js/library-data.js', '/js/store.js', '/js/api.js', '/js/router.js', '/js/hub-scene.js', '/js/audio.js', '/js/visual-assets.js', '/js/conversation-controller.js', '/js/session-provider.js', '/assets/remote-visuals.json'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request).catch(() => new Response(JSON.stringify({offline:true}), {headers:{'content-type':'application/json'}})));
    return;
  }
  const networkFirst = event.request.mode === 'navigate' || ['script','style','worker'].includes(event.request.destination);
  if (networkFirst) {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match('/offline.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('/offline.html'))));
});
