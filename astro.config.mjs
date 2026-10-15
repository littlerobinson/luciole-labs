// @ts-check

import { defineConfig } from 'astro/config';

import process from 'node:process';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  site: 'https://luciolelabs.dev',
  server: {
    host: true,
  },
  vite: {
    server: {
      watch: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
      },
    },
  },
});