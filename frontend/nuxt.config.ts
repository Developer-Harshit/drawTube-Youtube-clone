// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@vite-pwa/nuxt'],
  devtools: { enabled: true, vscode: {} },

  css: ['~/assets/icon-style.css'],
  routeRules: {
    'http://localhost:5000/**': { cors: true }
  },

  pwa: {
    manifest: {
      name: 'DrawTube PWA',
      short_name: 'DrawTube PWA',
      description: 'Testing DrawTube PWA',
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
      globPatterns: ['**/*.{png}']
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
