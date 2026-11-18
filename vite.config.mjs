import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import {resolve} from 'path'

export default defineConfig({
  plugins: [vue(), cssInjectedByJs()],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
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
      external: ['vue'],
      output: {
        globals: {vue: 'Vue'},
      },
      // Keep the existing mixed default/named UMD API intact.
      onwarn(warning, warn){
        if(warning.code === 'MIXED_EXPORTS') return
        warn(warning)
      },
    },
    sourcemap: true,
  },
})
