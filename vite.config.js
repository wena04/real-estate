import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_DEPLOY_TARGET === 'gh-pages' ? '/real-estate/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
