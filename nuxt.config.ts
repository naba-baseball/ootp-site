// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future:{
    compatibilityVersion: 4
  },

  nitro:{
    experimental:{
      tasks: true
    }
  },
  experimental:{
    typedPages: true
  },

  modules: ['@nuxt/eslint', '@vueuse/nuxt', 'reka-ui/nuxt']
})