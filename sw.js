/* Offline-välimuisti kotivalikosta avattavalle versiolle.
   Tarvitaan vain jos sivu tarjoillaan https-osoitteesta (esim. GitHub Pages).
   Paikallisesti Files-sovelluksesta avattuna index.html toimii jo sellaisenaan. */
var CACHE = 'hinnasto-v3';
var FILES = ['./', './index.html', './versio-lentavat.html',
             './manifest.json', './icon.svg'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ return k===CACHE ? null : caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

/* Cache first — näyttö toimii täysin ilman verkkoa. */
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      return hit || fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return res;
      }).catch(function(){ return caches.match('./index.html'); });
    })
  );
});
