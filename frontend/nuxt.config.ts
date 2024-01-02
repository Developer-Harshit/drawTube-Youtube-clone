// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

import { resolve } from 'path';
export default defineNuxtConfig({
  ssr: true,

  app: {
    htmlAttrs: {
      lang: 'en'
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
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
    manifest: false, // public/manifest.webmanifest
    strategies: 'generateSW',
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    //includeAssets: ['avatar.svg', 'privacy.txt'],
    workbox: {
      navigateFallback: '/',
      globPatterns: [
        '**/*',
        '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'
      ],

      navigateFallbackDenylist: [/^\/api/],
      runtimeCaching: [
        {
          urlPattern: ({ url }) => {
            return url.pathname.startsWith('/api');
          },
          handler: 'CacheFirst' as const,
          options: {
            cacheName: 'api-cache',
            cacheableResponse: { statuses: [0, 200] }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600 // 360 for testing only
    },
    devOptions: {
      enabled: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/]
    }
  }
});
