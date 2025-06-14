import { config } from "dotenv";
config();
import { version } from "./server/utils/config";

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset: "cloudflare-pages",
  compatibilityDate: "2025-03-05",
  experimental: {
    asyncContext: true,
  },
  // تعطيل استخدام Prisma في بيئة Cloudflare Workers
  externals: {
    // تجاهل حزم Prisma عند البناء
    inline: ["@prisma/client"],
  },
  // تعطيل توافق Node.js لتجنب المشاكل
  node: false,
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
  },
});
