---
marp: true
title: Marp on Slidev PoC

# Some Slidev headmatters are still supported
favicon: https://marp.app/favicon.png
info: "Just a curious and crazy PoC to integrate [Marp](https://marp.app) with [Slidev](https://sli.dev). Render Marp slides on Slidev's presentation interface."
---

<!--
_backgroundImage: url('https://marp.app/assets/hero-background.jpg')
-->

![bg right 80% vertical](https://marp.app/assets/marp.svg)
![bg 60%](https://sli.dev/logo-title.png)

# <!--fit--> [Marp](https://marp.app) on [Slidev](https://sli.dev)

An integration example of Marp for Slidev

<!-- Marp's presenter note is also working correctly. -->
<!-- Unlike Slidev, Marp recognizes every comments in a page as the presenter note. -->

---

<!--
_class: invert
-->

## <!--fit--> Yes, it's working! :rofl:

This is Slidev but also Marp :smile:

![bg opacity](https://images.unsplash.com/photo-1627433488375-61f25ad84e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyODA1NDQzNw&ixlib=rb-1.2.1&q=80&w=1080)

---

# How to write slides

Split pages by horizontal ruler (`---`). It's very simple! :satisfied:

```markdown
# Slide 1

foobar

---

# Slide 2

foobar
```

---

## Limitations

- Cannot mix features for Markdown contents, both of Marp and Slidev.
- An original Markdown will break if edited Markdown or notes through Slidev's web interface.
