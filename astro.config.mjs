import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'es', 'ar', 'zh'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  typescript: {
    strict: true
  },
  build: {
    assets: 'assets'
  },
  compilerOptions: {
    strict: true
  },
  vite: {
    define: {
      __DB_PREFIX__: JSON.stringify(process.env.DB_PREFIX || 'astro_')
    }
  }
});