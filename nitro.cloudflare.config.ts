// u0645u0644u0641 u062au0643u0648u064au0646 u062eu0627u0635 u0644u0644u0646u0634u0631 u0639u0644u0649 Cloudflare
import { config } from "dotenv";
config();

// u0627u0633u062au064au0631u0627u062f u0627u0644u0625u0635u062fu0627u0631 u0628u0634u0643u0644 u0645u0628u0627u0634u0631
const version = process.env.npm_package_version || "1.0.0";

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset: "cloudflare-pages",
  output: {
    dir: ".output",
    publicDir: ".output/public"
  },
  compatibilityDate: "2025-03-05",
  experimental: {
    asyncContext: true
  },
  // u062au0639u0637u064au0644 u062au0648u0627u0641u0642 Node.js u0644u062au062cu0646u0628 u0627u0644u062eu0637u0623
  node: false,
  // u062au0639u0631u064au0641 u0627u0644u0627u062eu062au0635u0627u0631u0627u062a u0644u0645u0633u0627u0631u0627u062a u0627u0644u0627u0633u062au064au0631u0627u062f
  alias: {
    // u0627u0644u0627u062eu062au0635u0627u0631u0627u062a u0644u062au062cu0646u0628 u0627u0633u062au062eu062fu0627u0645 __dirname u0645u0628u0627u0634u0631u0629
    '~': './server',
    '@': './server'
  },
  routeRules: {
    '/**': { cors: true }
  },
  // u062au0643u0648u064au0646 u062eu0627u0635 u0644u0640 Cloudflare
  cloudflare: {
    // u062au0643u0648u064au0646 u0644u0640 Cloudflare Pages
  },
  runtimeConfig: {
    public: {
      meta: {
        name: process.env.META_NAME || "",
        description: process.env.META_DESCRIPTION || "",
        version: version,
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
