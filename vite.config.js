import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-doc-tht.nutech-integrasi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Fix duplicate Access-Control-Allow-Origin header from server
            if (proxyRes.headers['access-control-allow-origin']) {
              proxyRes.headers['access-control-allow-origin'] = '*';
            }
          });
        },
      },
    },
  },
})
