// u0645u0644u0641 index.js u0641u064a u0645u062cu0644u062f workers-site u0644u0640 Cloudflare Workers

// u0627u0633u062au064au0631u0627u062f _worker.js u0627u0644u0631u0626u064au0633u064a
import worker from '../_worker.js';

// u062au0635u062fu064au0631 u062fu0627u0644u0629 fetch u0645u0646 u0627u0644u0639u0627u0645u0644 u0627u0644u0631u0626u064au0633u064a
export default {
  async fetch(request, env, ctx) {
    return worker.fetch(request, env, ctx);
  }
};
