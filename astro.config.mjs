import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://marcovelaa.github.io',
  base: '/gateim_srl',
  integrations: [tailwind(), sitemap()],
});
