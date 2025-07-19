import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // Ensure process.env is available for libraries that might need it
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
