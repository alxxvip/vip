// ملف index.js في مجلد workers-site لـ Cloudflare Pages

// استيراد _worker.js الرئيسي
import worker from '../../_worker.js';

// تصدير دالة fetch من العامل الرئيسي
export default {
  async fetch(request, env, ctx) {
    return worker.fetch(request, env, ctx);
  }
};
