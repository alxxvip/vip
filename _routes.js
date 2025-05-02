// ملف مسارات مبسط لـ Cloudflare Pages

// تصدير المسارات الأساسية
export default {
  // الصفحة الرئيسية
  '/': (request) => {
    return {
      message: 'Backend is working as expected',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    };
  },
  
  // فحص الصحة
  '/healthcheck': (request) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  },
  
  // معلومات عن API
  '/api': (request) => {
    return {
      name: 'Kalsima Backend API',
      version: '1.0.0',
      endpoints: [
        { path: '/', description: 'API information' },
        { path: '/healthcheck', description: 'Health check endpoint' },
        { path: '/api', description: 'API documentation' }
      ]
    };
  },
  
  // معالجة المسارات غير الموجودة
  '404': (request) => {
    return {
      error: 'Not Found',
      message: `Path ${new URL(request.url).pathname} not found`,
      status: 404
    };
  }
};
