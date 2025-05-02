// Script de construcciu00f3n simple para preparar los archivos para Cloudflare Workers
const fs = require('fs');
const path = require('path');

console.log('Iniciando script de construcciu00f3n para Cloudflare Workers...');

// Crear directorio workers-site si no existe
const workersSiteDir = path.join(__dirname, 'workers-site');
if (!fs.existsSync(workersSiteDir)) {
  console.log('Creando directorio workers-site...');
  fs.mkdirSync(workersSiteDir, { recursive: true });
}

// Copiar _worker.js a workers-site/index.js
const sourceFile = path.join(__dirname, '_worker.js');
const targetFile = path.join(workersSiteDir, 'index.js');

try {
  if (fs.existsSync(sourceFile)) {
    console.log(`Copiando ${sourceFile} a ${targetFile}...`);
    fs.copyFileSync(sourceFile, targetFile);
    console.log('Archivo copiado exitosamente.');
  } else {
    console.error(`Error: El archivo fuente ${sourceFile} no existe.`);
    process.exit(1);
  }
} catch (error) {
  console.error('Error durante la construcciu00f3n:', error);
  process.exit(1);
}

console.log('Script de construcciu00f3n completado exitosamente.');
