import { config } from "dotenv";
config();
import { version } from "./server/utils/config";

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset: "cloudflare",
  output: {
    dir: ".output",
    publicDir: ".output/public"
  },
  compatibilityDate: "2025-03-05",
  experimental: {
    asyncContext: true
  },
  // تعطيل توافق Node.js لتجنب الخطأ
  node: false,
  alias: {
    // Add aliases to avoid using __dirname directly
    '~': './server',
    '@': './server'
  },
  routeRules: {
    '/**': { cors: true }
  },
  // Configuración específica para Cloudflare
  cloudflare: {
    // Configuración para Cloudflare Pages
  },
  runtimeConfig: {
    public: {
      meta: {
        name: process.env.META_NAME || "",
        description: process.env.META_DESCRIPTION || "",
        version: version || "",
        captcha: (process.env.CAPTCHA === "true").toString(),
        captchaClientKey: process.env.CAPTCHA_CLIENT_KEY || "",
      },
    },
    cryptoSecret: process.env.CRYPTO_SECRET,
    tmdbApiKey: process.env.TMDB_API_KEY,
    trakt: {
      clientId: process.env.TRAKT_CLIENT_ID,
      clientSecret: process.env.TRAKT_CLIENT_SECRET,
    },
  }
});
