// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://urgooddodo.github.io',
  base: '/portfolio',

  i18n: {
    locales: ['en', 'ru'],

    defaultLocale: 'en',

    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});