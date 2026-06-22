export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/tokens.css', '~/assets/css/base.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  site: { url: 'https://justfortytwo.org', name: 'fortytwo' },
  nitro: {
    prerender: {
      // Routes linked from header/footer (/docs, /principles, /components, /security)
      // are added in later tasks. Don't fail the build for links to not-yet-existing pages.
      failOnError: false,
    },
  },
});
