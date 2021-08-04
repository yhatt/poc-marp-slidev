import { Marp } from '@marp-team/marp-core'
import { defineConfig } from 'vite'

export default defineConfig({
  slidev: {
    markdown: {
      markdownItSetup(md) {
        const marp = new Marp({ script: false })

        // Overwrite rendering function
        md.render = (...args) => {
          const { html, css } = marp.render(...args)
          return `<Marp css="${md.utils.escapeHtml(css)}">${html}</Marp>`
        }
      },
    },
  },
})
