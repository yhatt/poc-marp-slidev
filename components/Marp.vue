<template>
  <div ref="marp">
    <div data-marp-contents><slot /></div>
  </div>
</template>

<script lang="ts">
import { browser } from '@marp-team/marp-core/browser'
import { onMounted, onUpdated, onUnmounted, ref } from 'vue'

export default {
  props: {
    css: String,
  },
  setup(props) {
    const marp = ref(null)

    let cleanup: () => void | undefined = undefined

    onMounted(() => {
      if (!marp.value.shadowRoot) marp.value.attachShadow({ mode: 'open' })

      const root = marp.value.shadowRoot as ShadowRoot
      root.innerHTML = `<style data-marp-css>${props.css}</style><style>:host{all:initial;}:host>[data-marpit-svg]{vertical-align:top;}</style>`

      const contents = marp.value.querySelector('[data-marp-contents]')
      if (contents) root.appendChild(contents)

      cleanup = browser(root)
    })

    onUpdated(() => {
      const root = marp.value.shadowRoot as ShadowRoot
      const marpCss = root.querySelector('[data-marp-css]')

      if (marpCss) marpCss.innerHTML = props.css
    })

    onUnmounted(() => {
      cleanup?.()
    })

    return { marp }
  },
}
</script>
