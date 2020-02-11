importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-app",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.815979774a83b16d9029.js",
    "revision": "278521dcb411f82afb04e1079d0c0992"
  },
  {
    "url": "/_nuxt/layouts/default.04264b517f92049fc5f3.js",
    "revision": "816d75125affd72c571f1dbe32a052bd"
  },
  {
    "url": "/_nuxt/manifest.a5e5be38eeb21b1b19ed.js",
    "revision": "e074fd00f02cf4471cdfa85fbc247afd"
  },
  {
    "url": "/_nuxt/pages/index.baa760eefe908970a020.js",
    "revision": "5814734a9f4c201fe906f28cf2f523a1"
  },
  {
    "url": "/_nuxt/pages/login.3911dffb0ff8801775e5.js",
    "revision": "66e58b054227e2622ed85dd5010cd4e3"
  },
  {
    "url": "/_nuxt/pages/main.3ae0ffbc609d583760d5.js",
    "revision": "3ec2f7acf81df53e8f90ba24e9003d43"
  },
  {
    "url": "/_nuxt/pages/option.63e963b495cf6708abf6.js",
    "revision": "6e22335ec3c9a81140a650ed652af218"
  },
  {
    "url": "/_nuxt/vendor.1166c7ed14e1bff1df21.js",
    "revision": "9bc2c05e50a30d47e40032043d732c79"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

