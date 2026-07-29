import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gateim.com.bo', // Using .com.bo as it's a Bolivian company (placeholder)
  integrations: [tailwind(), sitemap()],
});
