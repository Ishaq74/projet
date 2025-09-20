import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
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
  }
});