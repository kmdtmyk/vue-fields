import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      // Stories contain Vue 2 runtime templates that need the compiler.
      vue: 'vue/dist/vue.esm.js',
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
