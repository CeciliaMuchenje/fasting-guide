var C='prayer-guide-v2',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put('./index.html',cp)});return n}).catch(function(){return caches.match('./index.html')}));return}
e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put(r,cp)});return n})}))});
