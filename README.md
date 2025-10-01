# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
"# Instagram" 
"# Instagram"

https://www.timsanteford.com/posts/manage-dark-and-light-modes-in-your-react-app-with-fluent-ui/ 

https://developer.mozilla.org/ru/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Installable_PWAs

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My React Vite App',
        short_name: 'MyApp',
        description: 'React + Vite PWA пример',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";
import { registerSW } from 'virtual:pwa-register'

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
);

const updateSW = registerSW({
    onNeedRefresh() { },
    onOfflineReady() { }
})

Cannot find module 'virtual:pwa-register' or its corresponding type declarations.

/////////////////

import ReactRefreshPlugin from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    ReactRefreshPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My React Vite App',
        short_name: 'MyApp',
        description: 'React + Vite PWA пример',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [{
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
        ]
      }
    })
  ],
  define: {
    "process.env.VITE_BASE_URL": process.env.VITE_BASE_URL,
    "import.meta.env.COLOR_SCHEME_LIGHT": JSON.stringify("#f0f0f0"),
    "import.meta.env.COLOR_SCHEME_DARK": JSON.stringify("black"),
  },

  build: {
    cssCodeSplit: false,
    terserOptions: {
      compress: {
        global_defs: {
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: true,
          "process.env.COLOR_SCHEME_LIGHT": "#f0f0f0",
          "process.env.COLOR_SCHEME_DARK": "black",
        },
      },
    },
  },
};


///////////////////
PWA (documantation) for Installing

https://www.saurabhmisra.dev/setup-react-pwa-using-vite/



import ReactRefreshPlugin from "@vitejs/plugin-react";

export default {
  plugins: [ReactRefreshPlugin()],
  define: {
    "process.env.VITE_BASE_URL": process.env.VITE_BASE_URL,
    "import.meta.env.COLOR_SCHEME_LIGHT": JSON.stringify("#f0f0f0"),
    "import.meta.env.COLOR_SCHEME_DARK": JSON.stringify("black"),
  },

  build: {
    cssCodeSplit: false,
    terserOptions: {
      compress: {
        global_defs: {
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: true,
          "process.env.COLOR_SCHEME_LIGHT": "#f0f0f0",
          "process.env.COLOR_SCHEME_DARK": "black",
        },
      },
    },
  },
};



//////
/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'

// ⚡ Кешировать все билдовые ассеты (vite сам подставит список)
precacheAndRoute(self.__WB_MANIFEST)

// 🟢 HTML (страницы) → NetworkFirst
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'html-cache' })
)

// 🟡 API → NetworkFirst
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({ cacheName: 'api-cache' })
)

// 🔵 CSS/JS → StaleWhileRevalidate
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({ cacheName: 'static-resources' })
)

// 🖼️ Картинки → CacheFirst
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
  })
)

sw.ts ///////////

/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'

// Кешировать билдовые ассеты
precacheAndRoute(self.__WB_MANIFEST)

// HTML / SPA
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3,
  })
)

// JS/CSS
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({ cacheName: 'static-resources' })
)

// Картинки
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
  })
)

// API → Кешируем **все GET-запросы** к серверу
const API_BASE = import.meta.env.VITE_API_URL || ''

registerRoute(
  ({ url, request }) =>
    url.origin === API_BASE && request.method === 'GET',
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 5,
  })
)
