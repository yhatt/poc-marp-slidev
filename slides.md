---
marp: true
title: Marp on Slidev
---

<!--
_backgroundImage: url('https://marp.app/assets/hero-background.jpg')
-->

![bg right 80% vertical](https://marp.app/assets/marp.svg)
![bg 60%](https://sli.dev/logo-title.png)

# <!--fit--> [Marp](https://marp.app) on [Slidev](https://sli.dev)

An integration example of Marp for Slidev

---

<!--
_class: invert
-->

## <!--fit--> Yes, it is (paritally) working! :rofl:

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

# Restrictions

- Front-matter and HTML comments would be consumed by Slidev.
- Local directives are always scoped.
