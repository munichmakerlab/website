// @ts-check
import { defineConfig } from 'astro/config';

import markdoc from '@astrojs/markdoc';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import vue from '@astrojs/vue';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc(), mdx(), icon(), vue()],

  adapter: node({
    mode: 'standalone'
  })
});