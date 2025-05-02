// تكوين خاص لـ Cloudflare Pages

module.exports = {
  // تعطيل توافق Node.js لتجنب الأخطاء
  nodejsCompat: false,
  
  // استخدام preset مختلف
  preset: 'cloudflare',
  
  // تعيين مجلد الإخراج
  buildOutputDirectory: '.output/public',
  
  // تكوين البناء
  build: {
    command: 'npm run build',
    environment: {
      NODE_VERSION: '20.5.0'
    }
  },
  
  // تكوين النشر
  deploy: {
    command: 'npx wrangler deploy'
  }
};
