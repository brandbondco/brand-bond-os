---
name: bb-dp-figma
description: Activate for Figma component building, auto-layout setup, variables and token connection, and design file organization. Use when Figma structure decisions need to be made.
---

# bb-dp-figma

Figma is the source of truth for the design system. Every decision here has downstream consequences.

## Core Principle

Figma structure reflects design system logic — not the other way around. Build the system first, then express it in Figma.

## Component Architecture

- Use auto-layout for every component — no fixed-size frames
- Variants handle states, not separate components
- Properties expose only what needs to change — hide the rest
- Naming follows token naming: category/property/variant/state

## Variables Setup

Structure:
```
Primitive variables  → raw values (hex, px, font names)
Semantic variables   → purpose-mapped (color/background/primary)
Component variables  → component-specific (button/bg/hover)
```

Modes minimum: light / dark. Add density or brand modes only if needed.

## Handoff

- `bb-design-system` — token logic before Figma setup
- `bb-dp-framer` — when Figma moves to web build
- `bb-dp-cursor-antigravity` — when design moves to code
