// ملف العامل الرئيسي لـ Cloudflare Pages

// تكوين CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// مسارات API البسيطة
const routes = {
  // الصفحة الرئيسية
  '/': () => ({
    message: 'Backend is working as expected',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  }),
  
  // فحص الصحة
  '/healthcheck': () => ({
    status: 'ok',
    timestamp: new Date().toISOString()
  }),
  
  // معلومات عن API
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

// دالة للتعامل مع طلبات OPTIONS (preflight CORS)
function handleOptions() {
  return new Response(null, {
    headers: corsHeaders
  });
}

// دالة للتعامل مع المسارات غير الموجودة
function handleNotFound(path) {
  return {
    error: 'Not Found',
    message: `Path ${path} not found`,
    status: 404
  };
}

// تصدير دالة العامل
export default {
  async fetch(request, env, ctx) {
    try {
      // التعامل مع طلبات OPTIONS لـ CORS
      if (request.method === 'OPTIONS') {
        return handleOptions();
      }
      
      // الحصول على المسار
      const url = new URL(request.url);
      const path = url.pathname;
      
      // البحث عن معالج المسار
      const handler = routes[path];
      const responseData = handler ? handler() : handleNotFound(path);
      
      // تحديد حالة الاستجابة
      const status = responseData.status || 200;
      
      // إنشاء استجابة JSON
      return new Response(JSON.stringify(responseData), {
        status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error) {
      // التعامل مع الأخطاء
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
