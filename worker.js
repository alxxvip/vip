// ملف رئيسي لـ Cloudflare Workers

// استيراد ملف المسارات
import routes from './_routes.js';

// تكوين CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// دالة للتعامل مع طلبات OPTIONS (preflight CORS)
async function handleOptions() {
  return new Response(null, {
    headers: corsHeaders
  });
}

// دالة رئيسية للتعامل مع جميع الطلبات
export default {
  async fetch(request, env, ctx) {
    // التعامل مع طلبات OPTIONS لـ CORS
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }
    
    // الحصول على URL والمسار
    const url = new URL(request.url);
    const path = url.pathname;
    
    // البحث عن معالج المسار في ملف المسارات
    const handler = routes[path] || routes['404'];
    
    try {
      // استدعاء معالج المسار والحصول على البيانات
      const data = await handler(request);
      
      // تحديد حالة الاستجابة
      const status = data.status || 200;
      
      // إنشاء استجابة JSON
      return new Response(JSON.stringify(data), {
        status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error) {
      // التعامل مع الأخطاء
      console.error(`Error handling request to ${path}:`, error);
      
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
