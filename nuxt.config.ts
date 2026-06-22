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
      // Only the homepage exists yet; nav links to future pages (/docs, /principles,
      // /components, /security) are added in later tasks. Prerender just '/' explicitly
      // and don't crawl, so the build stays green without masking real errors.
      routes: ['/'],
      crawlLinks: false,
    },
  },
});
