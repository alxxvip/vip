// Polyfill for __dirname in ESM environments like Cloudflare Workers
if (typeof globalThis.__dirname === 'undefined') {
  globalThis.__dirname = '/';
}
if (typeof globalThis.__filename === 'undefined') {
  globalThis.__filename = '/index.js';
}
