// Network first: always the newest page when online; the last copy when offline. Data requests are never cached.
const C = "uc-savdo-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { const copy = res.clone(); caches.open(C).then(c => c.put(r, copy)); return res; }).catch(() => caches.match(r)));
});
