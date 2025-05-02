# Backend for Cloudflare Workers

## نظرة عامة

هذا المشروع هو خدمة خلفية (Backend) مصممة للعمل على Cloudflare Workers. تم تبسيط المشروع وإعادة هيكلته ليعمل بشكل أفضل مع بيئة Cloudflare.

## التكنولوجيا المستخدمة

- **Nitro**: إطار عمل لبناء تطبيقات API بكفاءة عالية
- **Node.js**: الإصدار 20.0.0 أو أعلى
- **Cloudflare Workers**: لاستضافة ونشر التطبيق

## هيكل المشروع

```
backend/
├── .cloudflare/        # تكوينات Cloudflare
├── server/            # كود الخادم
│   ├── routes/       # مسارات API
│   └── utils/        # أدوات مساعدة
├── package.json      # تبعيات المشروع
├── nitro.config.ts   # تكوين Nitro
└── wrangler.toml     # تكوين Wrangler لـ Cloudflare
```

## التثبيت والتشغيل

1. تثبيت التبعيات:
   ```
   npm install
   ```

2. تشغيل الخادم محلياً للتطوير:
   ```
   npm run dev
   ```

3. بناء المشروع للإنتاج:
   ```
   npm run build
   ```

4. نشر المشروع على Cloudflare Workers:
   ```
   npx wrangler deploy
   ```

## نقاط النهاية API

- **/**
  - وصف: الصفحة الرئيسية تعرض رسالة ترحيبية وإصدار التطبيق
  - طريقة: GET
  - استجابة: `{ message: string }`

## ملاحظات التطوير

- تم تبسيط المشروع ليعمل بشكل أفضل مع Cloudflare Workers
- تم استخدام Nitro بدلاً من الحل المخصص السابق
- تم تحديث تكوينات wrangler.toml لتتوافق مع متطلبات Cloudflare
