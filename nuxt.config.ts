// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'reka-ui/nuxt',
    // '@nuxtjs/html-validator',
    '@unocss/nuxt',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@hebilicious/vue-query-nuxt',
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
    databaseUrl: '',
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
      uploads: {
        driver: 'fsLite',
        base: '.data/uploads',
      },
      config: {
        driver: 'fsLite',
        base: '.data/config',
      },
      scripts: {
        driver: 'fsLite',
        base: 'scripts'
      }
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
