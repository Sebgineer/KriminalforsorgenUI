// https://nuxt.com/docs/api/configuration/nuxt-config
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/style.global.css'],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vite-pwa/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
    // '@nuxt/pwa'
  ],
  pwa: {
    manifest: {
      name: "RFC",
    }
  },
  ssr: false,
  vite: {
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      })
    ]
  }
})
