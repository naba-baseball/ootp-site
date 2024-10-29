// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'reka-ui/nuxt',
    '@nuxtjs/html-validator',
    '@unocss/nuxt',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'OOTP Baseball',
    },
  },
  css: ['@unocss/reset/tailwind.css'],
  runtimeConfig: {
    public: {
      ootpWebsiteUrl: '',
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
    viewTransition: true,
  },
  compatibilityDate: '2024-04-03',

  nitro: {
    storage: {
      csv: {
        driver: 'fs',
        base: '.data/csv',
      },
    },
    experimental: {
      tasks: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
