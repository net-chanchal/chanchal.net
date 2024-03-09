self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./style.css",
                "./images/filter.svg",
                "./images/home.svg",
                "./images/icon-192x192.png",
                "./images/icon-256x256.png",
                "./images/icon-384x384.png",
                "./images/icon-512x512.png"
            ]);
        })
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
})