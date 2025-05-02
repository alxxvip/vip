// build.js
const fs = require('fs');
const path = require('path');

// تأكد من وجود مجلد workers-site
if (!fs.existsSync(path.join(__dirname, 'workers-site'))) {
  fs.mkdirSync(path.join(__dirname, 'workers-site'), { recursive: true });
}

// تأكد من وجود مجلد .output
if (!fs.existsSync(path.join(__dirname, '.output'))) {
  fs.mkdirSync(path.join(__dirname, '.output'), { recursive: true });
}

// تأكد من وجود مجلد .output/public
if (!fs.existsSync(path.join(__dirname, '.output/public'))) {
  fs.mkdirSync(path.join(__dirname, '.output/public'), { recursive: true });
}

// إنشاء ملف index.html بسيط في مجلد .output/public
fs.writeFileSync(
  path.join(__dirname, '.output/public/index.html'),
  `<!DOCTYPE html>
<html>
<head>
  <title>Backend API</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #333; }
    .container { max-width: 800px; margin: 0 auto; }
    .endpoint { background: #f4f4f4; padding: 10px; margin-bottom: 10px; border-radius: 4px; }
    code { background: #e0e0e0; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Backend API Documentation</h1>
    <p>Welcome to the Backend API. Use the following endpoints to interact with the service:</p>
    
    <div class="endpoint">
      <h3>GET /</h3>
      <p>Returns basic information about the API including version and status.</p>
      <p>Example response: <code>{ "message": "Backend is working as expected", "version": "2.0.0" }</code></p>
    </div>
    
    <div class="endpoint">
      <h3>GET /healthcheck</h3>
      <p>Health check endpoint to verify the API is running correctly.</p>
      <p>Example response: <code>{ "status": "ok", "timestamp": "2025-05-02T16:45:30.123Z" }</code></p>
    </div>
  </div>
</body>
</html>`
);

console.log('✅ Build completed successfully');
