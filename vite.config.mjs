import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import {resolve} from 'path'

export default defineConfig({
  plugins: [vue(), cssInjectedByJs()],
  resolve: {
    alias: {
      // Stories are Vue 2 option objects with runtime `template` strings.
      // The compiler-included build is required when the Playground renders them.
      vue: 'vue/dist/vue.esm.js',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueFields',
      formats: ['umd'],
      fileName: () => 'index.umd.min.js',
    },
    rollupOptions: {
      external: ['vue', 'big.js', '@kmdtmyk/ruby-date'],
      output: {
        globals: {
          vue: 'Vue',
          'big.js': 'Big',
          '@kmdtmyk/ruby-date': 'RubyDate',
        },
        // Keep the existing mixed default/named UMD API explicit.
        exports: 'named',
      },
    },
    sourcemap: true,
  },
})
