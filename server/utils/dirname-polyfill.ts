// Polyfill para __dirname en entornos ESM como Cloudflare Workers
export const getDirname = () => '/';
export const getFilename = () => '/index.js';
