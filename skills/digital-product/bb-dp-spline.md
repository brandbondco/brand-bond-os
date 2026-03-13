---
name: bb-dp-spline
version: 1.0
updated: 2026-03
status: active
---

# bb-dp-spline

Spline brings 3D to the web. Use it deliberately — 3D adds cost (performance, complexity) and must add equivalent value.

## When to Use Spline

- Hero moments that require 3D brand differentiation
- Interactive product visualization
- Scroll-driven 3D sequences
- WebGL-based brand identity expressions

## When NOT to Use Spline

- When CSS animation achieves the same effect
- When load time matters more than visual richness
- When the client's audience is on low-powered devices

## Performance Standards

- Scene file size: under 5MB for web deployment
- Polygon count: optimize aggressively
- Texture resolution: 1024×1024 max for web
- Test on mid-range mobile — not just MacBook Pro
- Lazy load 3D scenes — never block page render

## Export Options

- Spline Viewer embed (easiest, larger bundle)
- Export as code (React / vanilla JS) for performance control
- Export as video fallback for unsupported environments

## Handoff

- `bb-dp-framer` — Spline embedded in Framer
- `bb-dp-cursor-antigravity` — Spline in custom code
- `bb-dp-3d` — if complex 3D requires Cinema 4D or Blender source
