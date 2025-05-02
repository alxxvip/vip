// Archivo de configuraciu00f3n especu00edfico para Cloudflare Pages

// Exportar una funciu00f3n fetch simple para demostrar que funciona
export default {
  async fetch(request, env, ctx) {
    return new Response(JSON.stringify({
      message: 'Backend is working on Cloudflare Pages',
      version: '1.0.0',
      status: 'success'
    }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }
};
