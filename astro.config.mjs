// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import vue from '@astrojs/vue';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc(), mdx(), icon(), vue()],
  
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: 'standalone'
  })
});