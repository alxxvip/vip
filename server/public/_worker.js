// Definir __dirname y __filename globalmente antes de cualquier importación
globalThis.__dirname = '/';
globalThis.__filename = '/index.js';

// Definir process.cwd() si no existe
if (typeof process === 'undefined') {
  globalThis.process = { cwd: () => '/' };
} else if (typeof process.cwd !== 'function') {
  process.cwd = () => '/';
}

// Función para crear un worker personalizado
async function createWorker() {
  try {
    // Importar el worker generado por Nitro
    const { default: worker } = await import('./index.js');
    return worker;
  } catch (error) {
    console.error('Error al importar el worker:', error);
    return {
      fetch: () => new Response('Error interno del servidor', { status: 500 })
    };
  }
}

// Inicializar el worker
const workerPromise = createWorker();

// Exportar el handler de fetch
export default {
  async fetch(request, env, ctx) {
    const worker = await workerPromise;
    return worker.fetch(request, env, ctx);
  }
};
