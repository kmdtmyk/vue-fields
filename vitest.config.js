import {defineConfig} from 'vitest/config'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.js'],
  },
})
