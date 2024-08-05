import react from '@vitejs/plugin-react';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: ['node_modules', 'dist', '**/*.json'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'next.config.js',
        'pages/_document.tsx',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
