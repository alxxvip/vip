// Define global variables needed by the application before importing anything else
globalThis.__dirname = '/';
globalThis.__filename = '/index.js';

// Define process.cwd() if it doesn't exist
if (typeof process === 'undefined') {
  globalThis.process = { cwd: () => '/' };
} else if (typeof process.cwd !== 'function') {
  process.cwd = () => '/';
}

// Define path module functions if they don't exist
if (typeof path === 'undefined') {
  globalThis.path = {
    resolve: (...args) => args.join('/').replace(/\/+/g, '/'),
    dirname: (path) => path.split('/').slice(0, -1).join('/') || '/',
    join: (...args) => args.join('/').replace(/\/+/g, '/'),
    // Add additional path functions that might be used
    basename: (path, ext) => {
      const base = path.split('/').pop() || '';
      return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base;
    }
  };
}

// Export the worker function
export default {
  async fetch(request, env, ctx) {
    try {
      // Make sure __dirname is defined before importing the worker
      if (typeof __dirname === 'undefined') {
        globalThis.__dirname = '/';
      }
      
      // Import the original worker
      const { default: worker } = await import('./dist/_worker.js/index.js');
      return worker.fetch(request, env, ctx);
    } catch (error) {
      console.error('Error loading worker:', error);
      return new Response(`Server Error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
