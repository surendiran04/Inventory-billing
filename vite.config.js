import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Specify modules that should be treated as external
      external: ['url', 'util', 'os'],
      output: {
        // Set the format to 'es' for ES modules compatibility
        format: 'es',
      },
    },
  },
});
