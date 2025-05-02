// Import the dirname polyfill first
import '../../dirname-polyfill.js';

// Export a placeholder that will be replaced during build
export default {
  fetch: (request, env, ctx) => {
    return new Response('This is a placeholder. The actual worker will be generated during build.');
  }
};
