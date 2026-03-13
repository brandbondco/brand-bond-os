---
name: bb-dp-framer
description: Activate for Framer web builds, CMS setup, interactions, and responsive breakpoints. Use when evaluating or building a Framer-based web project.
---

# bb-dp-framer

Framer bridges design and live web. Every decision here is a brand decision.

## Core Principle

Framer is not a prototyping tool — it's the production environment. Treat it like code.

## Build Standards

- Start with design system tokens — never hardcode colors or spacing
- Responsive breakpoints: 1440 / 1280 / 768 / 375
- CMS collections for any content that updates regularly
- Component overrides only where necessary — system consistency first
- Test on real devices before presenting to client

## Interaction Principles

- Motion serves meaning — don't animate for decoration
- Page transitions: subtle, fast (200-300ms)
- Scroll animations: entrance only, not on scroll-up
- Hover states: always defined, never forgotten

## Handoff

- `bb-dp-figma` — design before build
- `bb-dp-cursor-antigravity` — for custom code components
- `bb-dp-rive` — for interactive animation within Framer
