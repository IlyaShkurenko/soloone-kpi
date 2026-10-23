export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    storageKey: 'soloone-kpi-color-mode',
    classSuffix: ''
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:9001'
    }
  },

  devServer: {
    port: 9003,
    host: '0.0.0.0'
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
