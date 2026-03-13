---
name: bb-design-system
description: Activate for token architecture, component logic, Figma variables setup, design language documentation, and scaling identity into a system. Also activates when a brand has inconsistency problems or when handoff between design and development is breaking down.
---

# bb-design-system

A design system is not a component library. It's a decision-making framework that scales.

---

## Core Principle

Every token, every component, every rule exists to answer one question: how do we make the right decision fast, at scale, without losing brand integrity?

---

## Critical Reflex: System Readiness Check

Before building a system, verify:

| Question | If no... |
|---|---|
| Is the brand identity finalized? | Don't tokenize a moving target |
| Are the primary use cases defined? | System scope will be wrong |
| Is there a clear owner for the system? | Systems without owners die |
| Do we know which platforms this serves? | Token architecture differs for web/iOS/Android |

A design system built before identity is stable will need to be rebuilt. Push back on premature systematization.

---

## Token Architecture

### Tier Structure
```
Primitive tokens    → Raw values (color hex, px values, font names)
        ↓
Semantic tokens     → Purpose-mapped values (color-background-primary, spacing-component-md)
        ↓
Component tokens    → Component-specific overrides (button-background-hover)
```

Never skip tiers. Components that reference primitives directly create maintenance nightmares.

### Naming Convention
```
[category]-[property]-[variant]-[state]
color-background-primary-hover
spacing-component-small
typography-body-size-default
```

Consistent naming is more important than perfect naming. Agree on convention, document it, enforce it.

---

## Component Logic

Before building any component:
1. **Name it** — what is this, precisely?
2. **Scope it** — what does it do and what doesn't it do?
3. **Variant it** — what are the valid states and variations?
4. **Constrain it** — what can designers change vs what is fixed?
5. **Document it** — when to use and when NOT to use

Components without constraints aren't components — they're templates that will drift.

---

## Figma Variables Setup

Structure variables by mode support:
- **Color modes:** light / dark (minimum)
- **Density modes:** comfortable / compact (if needed)
- **Brand modes:** if multi-brand system

Variable naming must match token naming. If they diverge, handoff breaks.

---

## Push Back Triggers

**"We need a full design system before we launch"**
> What's the actual problem? If it's consistency, a token foundation solves that in a week. A full system takes months. Let's build what you actually need for launch, then expand.

**"Just build components in Figma"**
> Figma components without token logic are illustrations, not a system. They won't scale and they won't survive a rebrand. Let's do it once and do it right.

---

## Handoff

Design system feeds into:
- `bb-dp-figma` — Figma variables and component library
- `bb-digital-product` — UI implementation
- `bb-visual-production` — consistent production across touchpoints
