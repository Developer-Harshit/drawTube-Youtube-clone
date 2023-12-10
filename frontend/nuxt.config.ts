// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@vite-pwa/nuxt'],
  devtools: { enabled: true, vscode: {} },
  css: ['~/assets/icon-style.css'],

  pwa: {
    manifest: {
      name: 'Nuxt3 PWA',
      short_name: 'Nuxt3 PWA',
      description: 'Testing Nuxt3 PWA',
      icons: [
        {
          src: '/icon_64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: '/icon_144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/icon_192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon_512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    registerType: 'autoUpdate',

    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20 // 3600
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
});
