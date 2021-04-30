import { defineConfig } from 'laravel-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: './resources/views/app.blade.php',
  //       guest: './resources/views/guest/app.blade.php',
  //     },
  //   },
  // },
})
  .withPlugin(vue);
