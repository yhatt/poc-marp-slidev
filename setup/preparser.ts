import { definePreparserSetup } from '@slidev/types'
import { Marp } from '@marp-team/marp-core'
import YAML from 'js-yaml'

const slidevInheritedHeadmatters = [
  'title',
  'titleTemplate',
  'info',
  'download',
  'exportFilename',
  'remoteAssets',
  'selectable',
  'record',
  'colorSchema',
  'routerMode',
  'favicon',
  'drawings',
]

const marp = new Marp({
  script: false,
  container: false,
  // html: true
})

const escpaeChars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
  '`': '&#96;',
  '\n': '&#10;',
  '\r': '&#13;',
}

const escape = (str: string) =>
  str.replace(/[&<>"'\n\r`]/g, (c) => escpaeChars[c])

export default definePreparserSetup(() => ({
  name: 'Marp',
  async transformRawLines(lines: string[]) {
    const { html, css, comments } = marp.render(lines.join('\n'), {
      htmlAsArray: true,
    })

    // Set up headmatters
    const slidevHeadmatters: Record<string, any> = {}
    const matchedHeadmatter = lines.join('\n').match(/^---.*\r?\n([\s\S]*?)---/)

    if (matchedHeadmatter) {
      const headmatter = YAML.load(matchedHeadmatter[1])

      if (typeof headmatter === 'object') {
        for (const key of slidevInheritedHeadmatters) {
          if (key in headmatter) {
            slidevHeadmatters[key] = headmatter[key]
          }
        }
      }
    }

    // Apply aspect ratio
    const matchedViewBox = html[0].match(/viewBox="0\s+0\s+(\d+)\s+(\d+)"/)

    if (matchedViewBox) {
      slidevHeadmatters.aspectRatio = `${matchedViewBox[1]}/${matchedViewBox[2]}`

      const vw = Number.parseInt(matchedViewBox[1], 10)
      if (!Number.isNaN(vw)) slidevHeadmatters.canvasWidth = vw
    }

    // Replace Slidev Markdown to render Marp Markdown
    lines.splice(
      0,
      lines.length,
      ...(slidevHeadmatters.length <= 0
        ? []
        : ['---', JSON.stringify(slidevHeadmatters), '---']),
      ...html
        .map(
          (v, i) =>
            '<!-- ⚠️⚠️⚠️ This is a generated Markdown. To avoid overriding original Markdown contents, please do not edit Markdown contents and notes through Web directly! ⚠️⚠️⚠️ -->\n\n' +
            `<MarpSlide html="${escape(v)}" css="${escape(css)}" />\n\n` +
            `<!--\n${comments[i].join('\n\n')}\n-->`
        )
        .join('\n\n---\n\n')
        .split('\n')
    )
  },
}))
