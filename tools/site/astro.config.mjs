import { defineConfig } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact(), markdoc()],
});