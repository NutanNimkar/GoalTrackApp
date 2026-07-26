import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG', '**/*.SVG'],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4060',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
  },
});
