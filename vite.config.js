import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  resolve: {
    alias:
      command === 'build'
        ? { '@marp-team/marp-core/browser': './marp-core-browser.cjs' }
        : {},
  },
}))
