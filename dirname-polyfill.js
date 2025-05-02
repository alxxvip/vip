// Define __dirname and __filename for ESM environments like Cloudflare Workers
if (typeof globalThis.__dirname === 'undefined') {
  globalThis.__dirname = '/';
}

if (typeof globalThis.__filename === 'undefined') {
  globalThis.__filename = '/index.js';
}

// Define process.cwd() if it doesn't exist
if (typeof globalThis.process === 'undefined') {
  globalThis.process = { cwd: () => '/' };
} else if (typeof globalThis.process.cwd !== 'function') {
  globalThis.process.cwd = () => '/';
}

// Define path.resolve if it doesn't exist
if (typeof globalThis.path === 'undefined') {
  globalThis.path = {
    resolve: (...args) => {
      return args.join('/').replace(/\/+/g, '/');
    },
    dirname: (path) => {
      return path.split('/').slice(0, -1).join('/') || '/';
    },
    join: (...args) => {
      return args.join('/').replace(/\/+/g, '/');
    }
  };
}

console.log('Dirname polyfill loaded. __dirname is now defined as:', globalThis.__dirname);
