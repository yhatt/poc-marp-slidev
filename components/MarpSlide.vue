<script setup lang="ts">
import { browser, MarpCoreBrowser } from '@marp-team/marp-core/browser'
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'

interface MarpSlideProps {
  html: string
  css: string
}

const { html, css } = defineProps<MarpSlideProps>()
const marpSlide = ref()

let marpCoreBrowser: MarpCoreBrowser

const setup = (initialize = false) => {
  if (!marpSlide.value.shadowRoot)
    marpSlide.value.attachShadow({ mode: 'open' })

  const root = marpSlide.value.shadowRoot as ShadowRoot
  root.innerHTML = `<style data-marp-css>${css}</style><style>:host{all:initial;}:host>[data-marpit-svg]{vertical-align:top;}</style>${html}`

  if (initialize) marpCoreBrowser = browser(root)
}

onMounted(() => setup(true))
onUpdated(() => setup())
onUnmounted(() => marpCoreBrowser?.())
</script>

<template>
  <div class="marp-slide" ref="marpSlide"></div>
</template>

<style scoped>
.marp-slide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
