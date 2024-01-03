// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

import { resolve } from "path";
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1"
    }
  },

  modules: ["@nuxtjs/tailwindcss", "@unlazy/nuxt", "@nuxtjs/color-mode"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode"
  },
  unlazy: {
    ssr: true
  },
  devtools: {
    enabled: true,
    vscode: {},

    timeline: {
      enabled: false
    }
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      API_URL: process.env.API_URL || "http://localhost:5000",
      apiBase: "/api"
    }
  },

  alias: {
    "~": __dirname,
    "@": __dirname,
    "~~": __dirname,
    "@@": __dirname,
    assets: resolve(__dirname, "./assets"),
    public: resolve(__dirname, "./public")
  },

  css: ["~/assets/css/global.css", "~/assets/css/icons.css"]
  //   nitro: {
  //     prerender: {
  //       routes: ["/", "login", "signin", "/editor", "/search", "/logout"]
  //     }
  //   },
});
