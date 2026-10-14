// Cache app shell for offline use; network first so GitHub Pages updates propagate.
const CACHE = 'eli-home-v11';
const ASSETS = [
  './', './index.html', './styles.css?v=0.8', './v04.css?v=0.8',
  './v07.css?v=0.7', './v08.css?v=0.8', './v09.css?v=0.11', './app.js?v=0.11',
  './manifest.webmanifest',
  './assets/rooms/sunlit-bedroom.webp', './assets/rooms/window-workspace.webp',
  './assets/illustrations/mood-sleepy.webp', './assets/illustrations/mood-happy.webp',
  './assets/illustrations/mood-calm.webp', './assets/illustrations/mood-cheer.webp',
  './assets/illustrations/outfit-charcoal.webp', './assets/illustrations/outfit-cream.webp',
  './assets/illustrations/outfit-mist.webp', './assets/illustrations/outfit-white.webp',
  './assets/illustrations/outfit-rose.webp', './assets/illustrations/outfit-sage.webp'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('eli-home-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok && (req.mode === 'navigate' || /\.(?:js|css|html|webmanifest)(?:\?|$)/.test(req.url))) await cache.put(req, res.clone());
      return res;
    } catch (err) {
      return (await cache.match(req)) || (req.mode === 'navigate' ? await cache.match('./index.html') : Response.error());
    }
  })());
});
