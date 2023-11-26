const cachesName = "vishalWeb";

const cacheUrls = [
    "/", // home page(working on ofline)
    "/about", // we can also add onther page(working on ofline)
    "/favicon.ico",
    "/logo192.png",
    "/manifest.json",
    "/static/js/bundle.js",
]

// install service worker
this.addEventListener('install', (enent) => {
    enent.waitUntil(
        caches.open(cachesName)
            .then(cache => {
                return cache.addAll(cacheUrls);
            }).catch((err) => {
                console.log('error to caching file');
            })
    )
})

// fetch caches data
this.addEventListener('fetch', (event) => {
    console.log('fetch');
    if (!navigator.onLine) {
        console.log('ofline');
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) return response;
                    let fUrl = event.request.clone();
                    fetch(fUrl)
                })
        )
    }
})

// activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('cacheName', cacheName);
                    if (cacheName !== cachesName) { // if not match last version with current version then delete last caches(last caches files)
                        console.log("Deleting out-of-date cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    return self.clients.claim();
});
