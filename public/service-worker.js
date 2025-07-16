// Basic service worker for PWA (extend for offline support)
self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  // Optionally: implement cache strategies for offline support
});