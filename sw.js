const CACHE='hayot-shel-ahava-v7';
const ASSETS=['./','./index.html','./script-data.json','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(new URL(e.request.url).pathname.endsWith('/index.html')||new URL(e.request.url).pathname.endsWith('/sw.js')){
  e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));
  return;
 }
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match('./index.html'))));
});