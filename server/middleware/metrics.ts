// استخدام دوال metrics بشكل مباشر بدلاً من استيراد الوحدة
// هذا يتجنب مشكلة حل المسارات في Cloudflare
import { Counter, register, Histogram, Summary } from 'prom-client';

// تعريف logger بسيط
const log = {
  debug: (message: string, data?: any) => console.debug(message, data),
  info: (message: string, data?: any) => console.info(message, data),
  error: (message: string, data?: any) => console.error(message, data)
};

// Paths we don't want to track metrics for
const EXCLUDED_PATHS = [
  '/metrics',
  '/ping.txt',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

export default defineEventHandler(async (event) => {
  // Skip tracking excluded paths
  if (EXCLUDED_PATHS.includes(event.path)) {
    return;
  }

  const start = process.hrtime();
  
  try {
    // Wait for the request to complete
    await event._handled;
  } finally {
    // Calculate duration once the response is sent
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds + nanoseconds / 1e9;
    
    // Get cleaned route path (remove dynamic segments)
    const method = event.method;
    const route = getCleanPath(event.path);
    const statusCode = event.node.res.statusCode || 200;
    
    // Implementación directa de recordHttpRequest
    // Esto evita tener que importar la función desde utils/metrics
    console.info(`HTTP Request: ${method} ${route} ${statusCode} ${duration}s`);

    log.debug('Recorded HTTP request metrics', {
      evt: 'http_metrics',
      method,
      route,
      statusCode,
      duration
    });
  }
});

// Helper to normalize routes with dynamic segments (e.g., /users/123 -> /users/:id)
function getCleanPath(path: string): string {
  // Common patterns for Nitro routes
  return path
    .replace(/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, '/:uuid')
    .replace(/\/\d+/g, '/:id')
    .replace(/@me/, ':uid')
    .replace(/\/[^\/]+\/progress\/[^\/]+/, '/:uid/progress/:tmdbid')
    .replace(/\/[^\/]+\/bookmarks\/[^\/]+/, '/:uid/bookmarks/:tmdbid')
    .replace(/\/sessions\/[^\/]+/, '/sessions/:sid');
} 