// Development-only offline shell. Versioned cache; never cache financial data or API responses.
const CACHE='groundwork-preview-shell-v10';
const SHELL=['./','./index.html','./manifest.webmanifest','./angus-brand.js','./ledger-lab.html','./notebook-categories.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('groundwork-preview-shell-')&&k!==CACHE).map(k=>caches.delete(k)))));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));});
