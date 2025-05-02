// workers-site/index.js
// هذا الملف يعمل كنقطة دخول للتطبيق في Cloudflare Workers

/**
 * استجابة للطلبات الواردة
 * @param {Request} request - كائن الطلب
 * @param {Object} env - متغيرات البيئة
 * @param {Object} ctx - سياق التنفيذ
 * @returns {Response} - استجابة للطلب
 */
export default {
  async fetch(request, env, ctx) {
    try {
      // إعدادات CORS
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };

      // التعامل مع طلبات OPTIONS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: corsHeaders
        });
      }

      // استخراج المسار من URL
      const url = new URL(request.url);
      const path = url.pathname;

      // تعريف المسارات المتاحة
      const routes = {
        '/': () => ({
          message: 'Backend is working as expected',
          version: '2.0.0',
          timestamp: new Date().toISOString()
        }),
        '/healthcheck': () => ({
          status: 'ok',
          timestamp: new Date().toISOString()
        }),
        '/meta': () => ({
          version: '2.0.0',
          name: 'Kalsima Backend',
          description: 'Backend service for Kalsima',
          hasCaptcha: false,
          captchaClientKey: ''
        }),
      };

      // التحقق من وجود المسار المطلوب
      const handler = routes[path];
      
      if (handler) {
        // إذا وجد المسار، قم بتنفيذ الدالة المرتبطة به
        const result = handler();
        return new Response(JSON.stringify(result), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // إذا كان المسار يبدأ بـ /api، قم بتوجيهه إلى المسار المناسب
      if (path.startsWith('/api')) {
        return new Response(JSON.stringify({
          message: 'API endpoint not implemented yet',
          path: path
        }), {
          status: 501,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // إذا لم يتم العثور على المسار
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
    } catch (error) {
      // التعامل مع الأخطاء
      return new Response(JSON.stringify({
        error: error.message || 'Internal Server Error'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
