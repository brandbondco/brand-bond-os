---
name: bb-dp-framer
description: "Activate for Framer web builds, CMS setup, interactions, responsive breakpoints, and publishing decisions. Also activates when evaluating whether Framer is the right tool for a given web project."
---

# bb-dp-framer

Framer is a production tool, not a prototype tool. Treat every build as if it's going live — because it is.

---

## Core Principle

Framer's power is speed without sacrificing quality. Its risk is the same. Build with system thinking from day one or the project becomes unmaintainable.

---

## When Framer is the Right Choice

| Scenario | Framer fit |
|---|---|
| Marketing site, portfolio, landing page | ✅ Strong fit |
| Content-heavy site with CMS | ✅ Strong fit |
| Interaction-rich, animation-forward | ✅ Strong fit |
| Complex web app with user auth | ❌ Wrong tool |
| E-commerce with complex logic | ❌ Wrong tool |
| Requires custom backend | ❌ Wrong tool |

Push back if Framer is being used for a use case it doesn't serve.

---

## Build Standards

### Component System
- Build all repeated elements as components before designing pages
- Use Framer's component properties — not per-instance overrides
- Connect to design tokens where possible

### Responsive Strategy
Define breakpoints before building:
```
Desktop   → 1440px (design base)
Laptop    → 1024px
Tablet    → 768px
Mobile    → 375px
```
Design mobile-first if content is primarily consumed on mobile.

### CMS Setup
- Structure CMS fields before building CMS-connected components
- Field naming must match content strategy
- Plan for content at scale — not just demo content

### Performance Checklist
- [ ] Images optimized (WebP, correct dimensions)
- [ ] Interactions use CSS where possible (not JS)
- [ ] Fonts subset if custom
- [ ] No unused components or assets in publish

---

## Push Back Triggers

**"Add more animations"**
> Animation serves communication. What does each animation communicate? If it doesn't add meaning, it adds load time and distraction.

**"Can Framer do X?"**
> Let me check if it's the right tool for X before we build it. Better to know now than halfway through.
