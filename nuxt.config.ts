export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/icon'],
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
  // Icons are inlined as SVG at build time from local collections: no runtime API calls, no icon font.
  icon: { mode: 'svg', serverBundle: 'local', clientBundle: { scan: true }, fallbackToApi: false },
  site: { url: 'https://forty-two.it', name: 'fortytwo' },
  nitro: {
    prerender: {
      // Every route is listed explicitly and links are not crawled, so a broken or
      // forgotten page fails the build instead of being silently skipped.
      routes: ['/', '/how-it-works', '/always-on', '/trust'],
      crawlLinks: false,
    },
  },
});
