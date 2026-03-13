---
name: bb-dp-cursor-antigravity
description: "Activate for code generation tasks, AI-assisted development, and Claude-to-Antigravity handoffs. Use when a design needs to be translated into working code, or when development workflow needs to be defined."
---

# bb-dp-cursor-antigravity

Code generation is not magic. The quality of the output matches the quality of the input. Garbage brief → garbage code.

---

## Core Principle

AI coding tools accelerate execution — they don't replace thinking. Architecture decisions, component structure, and naming conventions must be defined before code is generated.

---

## Handoff Protocol: Claude → Antigravity

When handing off from design/strategy to code generation:

```
1. STACK         — Define tech stack explicitly (React, Next.js, Tailwind, etc.)
2. COMPONENTS    — List components to be built with descriptions
3. DATA STRUCTURE — Define props, types, data shapes
4. DESIGN TOKENS — Provide token values or reference file
5. INTERACTIONS  — Describe behavior, states, transitions
6. CONSTRAINTS   — Performance requirements, browser support, accessibility level
```

A handoff without these 6 items produces code that needs complete rewriting.

---

## Code Quality Standards

Generated code must meet:
- [ ] Component is isolated and reusable
- [ ] Props are typed (TypeScript preferred)
- [ ] No hardcoded values — use tokens/variables
- [ ] Accessible (semantic HTML, ARIA where needed)
- [ ] Responsive without breakpoint hacks
- [ ] No console errors or warnings

---

## Push Back Triggers

**"Just generate the whole site"**
> Generating without architecture produces spaghetti. Let's define the component tree and data model first — it takes an hour and saves days of refactoring.

**"Fix this code" (no context)**
> I need to understand what it's supposed to do before I can fix what it's doing wrong. Describe the intended behavior first.
