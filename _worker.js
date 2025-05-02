/**
 * Archivo principal del worker para Cloudflare Workers
 */

// Configuración CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Rutas API básicas
const routes = {
  // Página principal
  '/': () => ({
    message: 'Backend is working as expected',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  }),
  
  // Verificación de salud
  '/healthcheck': () => ({
    status: 'ok',
    timestamp: new Date().toISOString()
  }),
  
  // Información API
  '/api': () => ({
    name: 'Kalsima Backend API',
    version: '1.0.0',
    endpoints: [
      { path: '/', description: 'API information' },
      { path: '/healthcheck', description: 'Health check endpoint' },
      { path: '/api', description: 'API documentation' }
    ]
  })
};

// Función para manejar solicitudes OPTIONS (preflight CORS)
function handleOptions() {
  return new Response(null, {
    headers: corsHeaders
  });
}

// Función para manejar rutas no encontradas
function handleNotFound(path) {
  return {
    error: 'Not Found',
    message: `Path ${path} not found`,
    status: 404
  };
}

// Exportar la función del worker
export default {
  async fetch(request, env, ctx) {
    try {
      // Manejar solicitudes OPTIONS para CORS
      if (request.method === 'OPTIONS') {
        return handleOptions();
      }
      
      // Obtener la ruta
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Buscar el manejador de ruta
      const handler = routes[path];
      const responseData = handler ? handler() : handleNotFound(path);
      
      // Determinar el estado de la respuesta
      const status = responseData.status || 200;
      
      // Crear respuesta JSON
      return new Response(JSON.stringify(responseData), {
        status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error) {
      // Manejar errores
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};
