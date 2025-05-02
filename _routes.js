// Archivo de rutas simplificado para Cloudflare Pages

// Exportar rutas básicas
export default {
  '/': () => {
    return {
      message: 'Backend is working as expected',
      version: '1.0.0'
    };
  },
  '/healthcheck': () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
};
