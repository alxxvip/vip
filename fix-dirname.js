// @ts-check
const fs = require('fs');
const path = require('path');

console.log('Ejecutando script de corrección para __dirname...');

// Define the paths to check and fix
const outputDir = path.join(process.cwd(), '.output');
const distDir = path.join(process.cwd(), 'dist');

// Function to add __dirname polyfill to a file
function addDirnamePolyfill(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  console.log(`Adding __dirname polyfill to: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add the polyfill at the beginning of the file
  const polyfill = `
// __dirname polyfill for Cloudflare Workers
globalThis.__dirname = '/';
globalThis.__filename = '/index.js';
if (typeof process === 'undefined') {
  globalThis.process = { cwd: () => '/' };
} else if (typeof process.cwd !== 'function') {
  process.cwd = () => '/';
}
`;
  
  // Only add the polyfill if it's not already there
  if (!content.includes('__dirname polyfill')) {
    content = polyfill + content;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully patched: ${filePath}`);
  } else {
    console.log(`Polyfill already exists in: ${filePath}`);
  }
}

// Function to recursively find and fix JavaScript files
function findAndFixFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findAndFixFiles(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      addDirnamePolyfill(filePath);
    }
  }
}

// Create a custom _worker.js file in the dist directory
function createCustomWorker() {
  const workerDir = path.join(distDir, '_worker.js');
  const indexPath = path.join(workerDir, 'index.js');
  
  if (fs.existsSync(workerDir) && fs.existsSync(indexPath)) {
    console.log('Creating custom _worker.js wrapper...');
    
    const customWorker = `
// __dirname polyfill for Cloudflare Workers
globalThis.__dirname = '/';
globalThis.__filename = '/index.js';
if (typeof process === 'undefined') {
  globalThis.process = { cwd: () => '/' };
} else if (typeof process.cwd !== 'function') {
  process.cwd = () => '/';
}

// Import the original worker (using require syntax for CommonJS)
const originalWorker = require('./_worker.js/index.js');

// Export the worker with __dirname defined
module.exports = {
  fetch: (request, env, ctx) => {
    return originalWorker.default.fetch(request, env, ctx);
  }
};
`;
    
    fs.writeFileSync(path.join(distDir, 'worker.js'), customWorker, 'utf8');
    console.log('Custom worker created successfully!');
  } else {
    console.log('Worker files not found, skipping custom worker creation.');
  }
}

// Fix the main worker file
if (fs.existsSync(distDir)) {
  const workerDir = path.join(distDir, '_worker.js');
  if (fs.existsSync(workerDir)) {
    const indexPath = path.join(workerDir, 'index.js');
    if (fs.existsSync(indexPath)) {
      addDirnamePolyfill(indexPath);
    }
    
    // Also fix the nitro chunk
    const nitroChunkDir = path.join(workerDir, 'chunks', 'nitro');
    if (fs.existsSync(nitroChunkDir)) {
      const files = fs.readdirSync(nitroChunkDir);
      for (const file of files) {
        if (file.endsWith('.mjs')) {
          addDirnamePolyfill(path.join(nitroChunkDir, file));
        }
      }
    }
  }
  
  // Create custom worker
  createCustomWorker();
} else {
  console.log(`Dist directory not found: ${distDir}`);
}

console.log('__dirname fix script completed!');
