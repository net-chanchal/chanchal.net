const CASHES = [
    "./",
    "./style.css",
    "./images/arrow-right.svg",
    "./images/chanchal.jpg",
    "./images/code.svg",
    "./images/edit.svg",
    "./images/filter.svg",
    "./images/home.svg",
    "./images/info.svg",
    "./images/loading.svg",
    "./images/notification.svg",
    "./images/restart.svg",
    "./images/settings.svg",
    "./images/sleep.gif",
    "./images/user.png",
    "./images/wifi.svg",
    "./static/js/main.23d2f8f8.js",
    "./logo48.png",
    "./logo72.png",
    "./logo96.png",
    "./logo144.png",
    "./logo192.png",
    "./logo512.png",
    "./manifest.json"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(CASHES);
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