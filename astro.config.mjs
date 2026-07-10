// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://zuoxingdong.github.io',
  vite: {
    plugins: [yaml()],
  },
});
