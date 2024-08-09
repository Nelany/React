import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  define: {
    global: {},
    'process.env': {},
  },
  plugins: [remix()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'dist/*', '**/*.json'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
