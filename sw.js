/* Offline-välimuisti kotivalikosta avattavalle versiolle.
   Tarvitaan vain jos sivu tarjoillaan https-osoitteesta (esim. GitHub Pages).
   Paikallisesti Tiedostot-sovelluksesta avattuna index.html toimii jo sellaisenaan.

   Strategia:
   - HTML haetaan VERKOSTA ENSIN (enintään 3 s), ja välimuistia käytetään vasta
     jos verkkoa ei ole. Näin päivitys näkyy heti, mutta festareilla ilman
     nettiä näyttö toimii yhä.
   - Muut tiedostot tarjoillaan välimuistista heti ja päivitetään taustalla.
   Aiempi versio haki kaiken välimuistista ensin, minkä takia vanha versio jäi
   pyörimään vaikka uusi oli jo palvelimella. */
var VERSION = 'hinnasto-v4';
var FILES = ['./', './index.html', './versio-lentavat.html',
             './manifest.json', './icon.svg'];
var TIMEOUT = 3000;

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then(function(c){
    /* cache:'reload' ohittaa selaimen oman HTTP-välimuistin, jotta
       asennus ei tallenna vahingossa vanhentunutta kopiota. */
    return Promise.all(FILES.map(function(f){
      return fetch(new Request(f, {cache:'reload'}))
        .then(function(r){ return r.ok ? c.put(f, r) : null; })
        .catch(function(){ return null; });
    }));
  }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){
      return k === VERSION ? null : caches.delete(k);
    }));
  }).then(function(){ return self.clients.claim(); }));
});

function save(req, res){
  var copy = res.clone();
  caches.open(VERSION).then(function(c){ c.put(req, copy); });
  return res;
}

self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;

  var wantsHtml = e.request.mode === 'navigate' ||
                  (e.request.headers.get('accept') || '').indexOf('text/html') !== -1;

  if(wantsHtml){
    e.respondWith(new Promise(function(resolve){
      var settled = false;
      function fromCache(){
        caches.match(e.request).then(function(hit){
          resolve(hit || caches.match('./index.html'));
        });
      }
      var timer = setTimeout(function(){
        if(settled) return;
        settled = true;
        fromCache();                       /* hidas verkko: näytä tallennettu */
      }, TIMEOUT);

      fetch(e.request).then(function(res){
        clearTimeout(timer);
        if(settled) { save(e.request, res); return; }   /* päivitä silti */
        settled = true;
        resolve(save(e.request, res));
      }).catch(function(){
        clearTimeout(timer);
        if(settled) return;
        settled = true;
        fromCache();                       /* ei verkkoa lainkaan */
      });
    }));
    return;
  }

  /* Muut tiedostot: välimuistista heti, päivitys taustalla. */
  e.respondWith(caches.match(e.request).then(function(hit){
    var net = fetch(e.request)
      .then(function(res){ return res.ok ? save(e.request, res) : res; })
      .catch(function(){ return hit; });
    return hit || net;
  }));
});
