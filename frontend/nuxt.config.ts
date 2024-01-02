// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

import { resolve } from 'path';
export default defineNuxtConfig({
  ssr: true,

  modules: ['@nuxt/devtools', '@vite-pwa/nuxt', '@nuxt/image'],
  devtools: { enabled: true, vscode: {} },
  alias: {
    '~': __dirname,
    '@': __dirname,
    '~~': __dirname,
    '@@': __dirname,
    assets: resolve(__dirname, './assets'),
    public: resolve(__dirname, './public')
  },
  css: ['~/assets/icon-style.css'],
  nitro: {
    prerender: {
      routes: ['/', 'login', 'signin', '/editor', '/search', '/logout']
    }
  },
  pwa: {
    registerType: 'autoUpdate',

    includeAssets: ['**/*'],
    workbox: {
      globPatterns: [
        '**/*',
        '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'
      ],

      // Don't fallback on document based (e.g. `/some-page`) requests
      // This removes an errant console.log message from showing up.

      navigateFallback: null
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20 // 3600
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    },
    manifest: {
      name: 'DrawTube PWA',
      short_name: 'DrawTube PWA',
      description: 'Testing DrawTube PWA',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-64x64.png',
          sizes: '64x64',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any'
        }
      ]
    }
  }
});
