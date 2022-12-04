'use strict'

// This is exactly same as "@marp-team/marp-core/browser" module, but formatted
// by Prettier. By some reason, Vite cannot resolve the original module.

Object.defineProperty(exports, '__esModule', { value: !0 })
const e = {
    h1: {
      proto: () => HTMLHeadingElement,
      attrs: { role: 'heading', 'aria-level': '1' },
      style:
        'display: block; font-size: 2em; margin-block-start: 0.67em; margin-block-end: 0.67em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;',
    },
    h2: {
      proto: () => HTMLHeadingElement,
      attrs: { role: 'heading', 'aria-level': '2' },
      style:
        'display: block; font-size: 1.5em; margin-block-start: 0.83em; margin-block-end: 0.83em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;',
    },
    h3: {
      proto: () => HTMLHeadingElement,
      attrs: { role: 'heading', 'aria-level': '3' },
      style:
        'display: block; font-size: 1.17em; margin-block-start: 1em; margin-block-end: 1em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;',
    },
    h4: {
      proto: () => HTMLHeadingElement,
      attrs: { role: 'heading', 'aria-level': '4' },
      style:
        'display: block; margin-block-start: 1.33em; margin-block-end: 1.33em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;',
    },
    h5: {
      proto: () => HTMLHeadingElement,
      attrs: { role: 'heading', 'aria-level': '5' },
      style:
        'display: block; font-size: 0.83em; margin-block-start: 1.67em; margin-block-end: 1.67em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;',
    },
    h6: {
      proto: () => HTMLHeadingElement,
      attrs: { role: 'heading', 'aria-level': '6' },
      style:
        'display: block; font-size: 0.67em; margin-block-start: 2.33em; margin-block-end: 2.33em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;',
    },
    span: { proto: () => HTMLSpanElement },
    pre: {
      proto: () => HTMLElement,
      style:
        'display: block; font-family: monospace; white-space: pre; margin: 1em 0; --marp-auto-scaling-white-space: pre;',
    },
  },
  t = 'data-marp-auto-scaling-svg',
  i = 'data-marp-auto-scaling-container'
class n extends HTMLElement {
  constructor() {
    super(), (this.svgPreserveAspectRatio = 'xMinYMid meet')
    const e =
      (e) =>
      ([t]) => {
        const { width: i, height: n } = t.contentRect
        ;(this[e] = { width: i, height: n }), this.updateSVGRect()
      }
    this.attachShadow({ mode: 'open' }),
      (this.containerObserver = new ResizeObserver(e('containerSize'))),
      (this.wrapperObserver = new ResizeObserver((...t) => {
        e('wrapperSize')(...t), this.flushSvgDisplay()
      }))
  }
  static get observedAttributes() {
    return ['data-downscale-only']
  }
  connectedCallback() {
    var e, n, s, r, o
    ;(this.shadowRoot.innerHTML =
      `\n<style>\n  svg[${t}] { display: block; width: 100%; height: auto; vertical-align: top; }\n  span[${i}] { display: table; white-space: var(--marp-auto-scaling-white-space, nowrap); width: max-content; }\n</style>\n<div data-marp-auto-scaling-wrapper>\n  <svg part="svg" ${t}>\n    <foreignObject><span ${i}><slot></slot></span></foreignObject>\n  </svg>\n</div>\n    `
        .split(/\n\s*/)
        .join('')),
      (this.wrapper =
        null !==
          (e = this.shadowRoot.querySelector(
            'div[data-marp-auto-scaling-wrapper]'
          )) && void 0 !== e
          ? e
          : void 0)
    const a = this.svg
    ;(this.svg =
      null !==
        (s =
          null === (n = this.wrapper) || void 0 === n
            ? void 0
            : n.querySelector(`svg[${t}]`)) && void 0 !== s
        ? s
        : void 0),
      this.svg !== a &&
        (this.svgComputedStyle = this.svg
          ? window.getComputedStyle(this.svg)
          : void 0),
      (this.container =
        null !==
          (o =
            null === (r = this.svg) || void 0 === r
              ? void 0
              : r.querySelector(`span[${i}]`)) && void 0 !== o
          ? o
          : void 0),
      this.observe()
  }
  disconnectedCallback() {
    ;(this.svg = void 0),
      (this.svgComputedStyle = void 0),
      (this.wrapper = void 0),
      (this.container = void 0),
      this.observe()
  }
  attributeChangedCallback() {
    this.observe()
  }
  flushSvgDisplay() {
    const { svg: e } = this
    e &&
      ((e.style.display = 'inline'),
      requestAnimationFrame(() => {
        e.style.display = ''
      }))
  }
  observe() {
    this.containerObserver.disconnect(),
      this.wrapperObserver.disconnect(),
      this.wrapper && this.wrapperObserver.observe(this.wrapper),
      this.container && this.containerObserver.observe(this.container),
      this.svgComputedStyle && this.observeSVGStyle(this.svgComputedStyle)
  }
  observeSVGStyle(e) {
    const t = () => {
      const i = (() => {
        const t = e.getPropertyValue('--preserve-aspect-ratio')
        if (t) return t.trim()
        return `x${(({ textAlign: e, direction: t }) => {
          if (e.endsWith('left')) return 'Min'
          if (e.endsWith('right')) return 'Max'
          if ('start' === e || 'end' === e) {
            let i = 'rtl' === t
            return 'end' === e && (i = !i), i ? 'Max' : 'Min'
          }
          return 'Mid'
        })(e)}YMid meet`
      })()
      i !== this.svgPreserveAspectRatio &&
        ((this.svgPreserveAspectRatio = i), this.updateSVGRect()),
        e === this.svgComputedStyle && requestAnimationFrame(t)
    }
    t()
  }
  updateSVGRect() {
    var e, t, i, n, s, r, o
    let a = Math.ceil(
      null !==
        (t =
          null === (e = this.containerSize) || void 0 === e
            ? void 0
            : e.width) && void 0 !== t
        ? t
        : 0
    )
    const l = Math.ceil(
      null !==
        (n =
          null === (i = this.containerSize) || void 0 === i
            ? void 0
            : i.height) && void 0 !== n
        ? n
        : 0
    )
    void 0 !== this.dataset.downscaleOnly &&
      (a = Math.max(
        a,
        null !==
          (r =
            null === (s = this.wrapperSize) || void 0 === s
              ? void 0
              : s.width) && void 0 !== r
          ? r
          : 0
      ))
    const c =
      null === (o = this.svg) || void 0 === o
        ? void 0
        : o.querySelector(':scope > foreignObject')
    if (
      (null == c || c.setAttribute('width', `${a}`),
      null == c || c.setAttribute('height', `${l}`),
      this.svg &&
        (this.svg.setAttribute('viewBox', `0 0 ${a} ${l}`),
        this.svg.setAttribute(
          'preserveAspectRatio',
          this.svgPreserveAspectRatio
        ),
        (this.svg.style.height = a <= 0 || l <= 0 ? '0' : '')),
      this.container)
    ) {
      const e = this.svgPreserveAspectRatio.toLowerCase()
      ;(this.container.style.marginLeft =
        e.startsWith('xmid') || e.startsWith('xmax') ? 'auto' : '0'),
        (this.container.style.marginRight = e.startsWith('xmi') ? 'auto' : '0')
    }
  }
}
const s = (e, { attrs: t = {}, style: i }) =>
  class extends e {
    constructor(...e) {
      super(...e)
      for (const [e, i] of Object.entries(t))
        this.hasAttribute(e) || this.setAttribute(e, i)
      this.attachShadow({ mode: 'open' })
    }
    static get observedAttributes() {
      return ['data-auto-scaling']
    }
    connectedCallback() {
      this._update()
    }
    attributeChangedCallback() {
      this._update()
    }
    _update() {
      const e = i ? `<style>:host { ${i} }</style>` : ''
      let t = '<slot></slot>'
      const { autoScaling: n } = this.dataset
      if (void 0 !== n) {
        t = `<marp-auto-scaling exportparts="svg:auto-scaling" ${
          'downscale-only' === n ? 'data-downscale-only' : ''
        }>${t}</marp-auto-scaling>`
      }
      this.shadowRoot.innerHTML = e + t
    }
  }
let r
const o = Symbol(),
  a = 'marpitSVGPolyfill:setZoomFactor,',
  l = Symbol()
let c, d
function p(e) {
  const t = ('object' == typeof e && e.target) || document,
    i = 'object' == typeof e ? e.zoom : e
  window[l] ||
    (Object.defineProperty(window, l, { configurable: !0, value: !0 }),
    window.addEventListener('message', ({ data: e, origin: t }) => {
      if (t === window.origin)
        try {
          if (e && 'string' == typeof e && e.startsWith(a)) {
            const [, t] = e.split(','),
              i = Number.parseFloat(t)
            Number.isNaN(i) || (d = i)
          }
        } catch (e) {
          console.error(e)
        }
    }))
  let n = !1
  Array.from(t.querySelectorAll('svg[data-marpit-svg]'), (e) => {
    var t, s, r, o
    e.style.transform || (e.style.transform = 'translateZ(0)')
    const a = i || d || e.currentScale || 1
    c !== a && ((c = a), (n = a))
    const l = e.getBoundingClientRect(),
      { length: p } = e.children
    for (let i = 0; i < p; i += 1) {
      const n = e.children[i]
      if (n.getScreenCTM) {
        const e = n.getScreenCTM()
        if (e) {
          const i =
              null !==
                (s =
                  null === (t = n.x) || void 0 === t
                    ? void 0
                    : t.baseVal.value) && void 0 !== s
                ? s
                : 0,
            c =
              null !==
                (o =
                  null === (r = n.y) || void 0 === r
                    ? void 0
                    : r.baseVal.value) && void 0 !== o
                ? o
                : 0,
            d = n.children.length
          for (let t = 0; t < d; t += 1) {
            const s = n.children[t]
            if ('SECTION' === s.tagName) {
              const { style: t } = s
              t.transformOrigin || (t.transformOrigin = `${-i}px ${-c}px`),
                (t.transform = `scale(${a}) matrix(${e.a}, ${e.b}, ${e.c}, ${
                  e.d
                }, ${e.e - l.left}, ${e.f - l.top}) translateZ(0.0001px)`)
              break
            }
          }
        }
      }
    }
  }),
    !1 !== n &&
      Array.from(t.querySelectorAll('iframe'), ({ contentWindow: e }) => {
        null == e ||
          e.postMessage(
            `${a}${n}`,
            'null' === window.origin ? '*' : window.origin
          )
      })
}
function h({ once: e = !1, target: t = document } = {}) {
  const i = 'Apple Computer, Inc.' === navigator.vendor ? [p] : []
  let n = !e
  const s = () => {
    for (const e of i) e({ target: t })
    n && window.requestAnimationFrame(s)
  }
  return (
    s(),
    () => {
      n = !1
    }
  )
}
;(c = 1), (d = void 0)
const g = Symbol(),
  m = (t = document) => {
    if ('undefined' == typeof window)
      throw new Error(
        "Marp Core's browser script is valid only in browser context."
      )
    if (
      (((t = document) => {
        const i = window[o]
        i || customElements.define('marp-auto-scaling', n)
        for (const n of Object.keys(e)) {
          const o = `marp-${n}`,
            a = e[n].proto()
          null != r ||
            (r = !!document
              .createElement('div', { is: 'marp-auto-scaling' })
              .outerHTML.startsWith('<div is')),
            r && a !== HTMLElement
              ? i ||
                customElements.define(o, s(a, { style: e[n].style }), {
                  extends: n,
                })
              : (i || customElements.define(o, s(HTMLElement, e[n])),
                t.querySelectorAll(`${n}[is="${o}"]`).forEach((e) => {
                  e.outerHTML = e.outerHTML
                    .replace(new RegExp(`^<${n}`, 'i'), `<${o}`)
                    .replace(new RegExp(`</${n}>$`, 'i'), `</${o}>`)
                }))
        }
        window[o] = !0
      })(t),
      t[g])
    )
      return t[g]
    const i = h({ target: t }),
      a = () => {
        i(), delete t[g]
      },
      l = Object.assign(a, { cleanup: a, update: () => m(t) })
    return Object.defineProperty(t, g, { configurable: !0, value: l }), l
  }
;(exports.browser = m), (exports.default = m), (exports.observer = h)
