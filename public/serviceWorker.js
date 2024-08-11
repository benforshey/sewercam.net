/* eslint-env worker */
const cacheName = "Offline First";
const cacheVersion = "1.0.20-9";
// String of pages & assets relative to project root.
// If any file in this list fails, the whole service worker fails to install.
const cacheURIs = [
  "index.html",
  "your-sewer-scope.html",
  "common-problems.html",
  "pipe-library.html",
  "404.html",
  "scripts/main-min.js",
  "scripts/main-min.js.map",
  "favicon.ico",
  "fonts/exo2-bold-webfont.woff2",
  "fonts/exo2-regular-webfont.woff2",
  "fonts/opensans-bold-webfont.woff2",
  "fonts/opensans-italic-webfont.woff2",
  "fonts/opensans-regular-webfont.woff2",
  "images/fleet-540.jpg",
  "images/fleet-1080.jpg",
  "images/fleet-2160.jpg",
  "images/camera.svg",
  "images/low-poly.png",
];

const errorText = `
<h1>Sorry, you&rsquo;re offline right now.</h1>
<h2>Error Code: 503&mdash;Service Unavailable</h2>
<p>You can reach us at <a href="tel:3606281782">(360) 628-1782</a></p>
<p>When you regain internet connection, please try visiting this page again. If you are using a <a href="http://browsehappy.com/" target="_blank" rel="noopener noreferrer">modern browser</a>, each page you visit will save itself for future visits&mdash;even when your&rsquo;re offline.</p>
`;

self.addEventListener("install", (event) => {
  console.log(`WORKER: ${event.type} started`);
  event.waitUntil(
    caches
      .open(`${cacheName}, ${cacheVersion}`)
      .then((cache) => {
        console.log(`WORKER: ${event.type} event opened cache`);
        return cache.addAll(cacheURIs);
      })
      .then(() => {
        console.log(`WORKER: ${event.type} completed`);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys() // This method returns a promise that resolves to an array of available cache keys.
      .then((keys) =>
        Promise.all(
          // Return a promise that resolves when outdated caches are deleted.
          keys
            .filter(
              (
                key // Filter over the keys array.
              ) =>
                // Return an array of caches not starting with the cacheName and ending with the
                // cacheVersion.
                !(key.startsWith(cacheName) && key.endsWith(cacheVersion))
            )
            .map(
              (
                key // Map over the filtered array.
              ) => caches.delete(key) // Delete the caches, fulfilling the promise.
            )
        )
      )
      .then(() => {
        console.log("WORKER: activate completed.");
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    console.log(
      `WORKER: is only set to respond to 'GET' requests. Fetch event '${event.request.method}' ignored for URL '${event.request.url}'`
    );

    const request = event.request;

    return event.respondWith(
      // Return the browser's original request, basically passing it through.
      fetch(request)
    );
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      console.log(`WORKER: fetch event ${cached ? "(cached)" : "(network)"} `);

      const networked = fetch(event.request)
        // Regardless of cache success or failure, we are fetching a fresh copy
        // from the network to update our cache.
        .then(fetchedFromNetwork, unableToResolve) // Handle network request success and failure.
        .catch(unableToResolve); // Catch errors from fetchedFromNetwork handler.

      // If there's a cached response (a caches.match), return it from the cache.
      // Otherwise, return the networked response from fetch(event.request).
      return cached || networked;

      function fetchedFromNetwork(response) {
        // Clone the response (a stream can only be consumed once), since we're consuming
        // this in both the ServiceWorker cache and the fetch request.
        const cacheCopy = response.clone();

        console.log(
          `WORKER: fetch response from network for: ${event.request.url}`
        );

        caches
          .open(`${cacheName}, ${cacheVersion}`) // Open a cache to store the response.
          .then((cache) => {
            cache.put(event.request, cacheCopy); // Store the response.
          })
          .then(() => {
            console.log(
              `WORKER: fetch response stored in cache for: ${event.request.url}`
            );
          });
        return response; // Fulfill the promise.
      }

      // No response from either cache or network. Send a meaningful response accordingly.
      function unableToResolve() {
        console.log("WORKER: fetch request failed in both cache and network.");
        return new Response(errorText, {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/html; charset=utf-8",
          }),
        });
      }
    })
  );
});
