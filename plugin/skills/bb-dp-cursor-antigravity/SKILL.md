---
name: bb-dp-cursor-antigravity
description: Activate for code generation, AI-assisted development, and Claude to Antigravity handoffs. Use when a design needs to be translated into working code.
---

# bb-dp-cursor-antigravity

Code generation is the bridge between design and production. Quality here determines quality everywhere downstream.

## Core Principle

AI-generated code is a starting point, not a final product. Every output must be reviewed against brand system and performance standards.

## Handoff Protocol: Claude → Antigravity

When handing off to Antigravity or Cursor:
```
1. DESIGN CONTEXT  — Link to Figma file, relevant frames
2. TECH STACK      — Framework, libraries, existing conventions
3. TOKEN REFERENCE — Design token file or CSS variable list
4. SCOPE          — Exactly what to build (no ambiguity)
5. CONSTRAINTS    — Performance targets, browser support, accessibility
6. REVIEW CRITERIA — What done looks like
```

## Code Quality Standards

- Token values only — no hardcoded colors or spacing
- Component props match Figma property names
- Responsive by default — no fixed widths
- Accessible by default — semantic HTML, ARIA where needed
- Commented where logic is non-obvious

## Handoff

- `bb-dp-figma` — source of design specs
- `bb-dp-framer` — if web build, not custom code
- `bb-design-system` — token reference
