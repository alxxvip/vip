import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  // استخدام الإصدار من متغيرات البيئة أو قيمة افتراضية
  const version = process.env.npm_package_version || "1.0.0";
  return {
    message: `Backend is working as expected (v${version})`
  };
});