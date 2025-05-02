import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

// بديل لـ __dirname في بيئة ESM
export function getPathFromFileURL(metaUrl: string) {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}

// الحصول على المسار المطلق للملف
export function getAbsolutePath(metaUrl: string, ...paths: string[]) {
  const { __dirname } = getPathFromFileURL(metaUrl);
  return join(__dirname, ...paths);
}

// الحصول على المسار المطلق من جذر المشروع
export function getProjectPath(...paths: string[]) {
  // في Cloudflare Workers، نستخدم المسار النسبي
  if (typeof process === 'undefined' || !process.cwd) {
    return join('/', ...paths);
  }
  
  // في بيئة Node.js العادية، نستخدم process.cwd()
  return resolve(process.cwd(), ...paths);
}

// استخدم هذه الدالة بدلاً من require(__dirname + '/path')
export function requireFromProject(path: string) {
  const fullPath = getProjectPath(path);
  return require(fullPath);
}
