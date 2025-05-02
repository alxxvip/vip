// Archivo principal para Cloudflare Workers

// Configuración de CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Función para manejar solicitudes OPTIONS (preflight CORS)
async function handleOptions() {
  return new Response(null, {
    headers: corsHeaders
  });
}

// Función principal para manejar todas las solicitudes
export default {
  async fetch(request, env, ctx) {
    // Manejar solicitudes OPTIONS para CORS
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }
    
    // Obtener la URL y la ruta
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Rutas básicas
    if (path === '/' || path === '') {
      return new Response(JSON.stringify({
        message: 'Backend is working as expected',
        version: '1.0.0'
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
    
    if (path === '/healthcheck') {
      return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString()
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
    
    // Ruta no encontrada
    return new Response(JSON.stringify({
      error: 'Not Found',
      path: path
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};
