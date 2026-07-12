// Service Worker mínimo — só o necessário pra tornar o app instalável (PWA).
// O app depende de rede (TomTom, ElevenLabs) o tempo todo, então não tentamos
// funcionar 100% offline — só cacheamos o "esqueleto" estático do app.
const CACHE = "siga-livre-v1";
const ARQUIVOS_ESTATICOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/app.css",
  "./js/config.js",
  "./js/data.js",
  "./js/i18n.js",
  "./js/traffic.js",
  "./js/agent.js",
  "./js/voice.js",
  "./js/sounds.js",
  "./js/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS_ESTATICOS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estratégia: tenta a rede primeiro (dados sempre atualizados); se falhar
// (sem sinal), cai no cache do esqueleto estático como último recurso.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
