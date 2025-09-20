import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
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