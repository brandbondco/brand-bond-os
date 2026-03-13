---
name: bb-dp-spline
description: "Activate for 3D web experiences, interactive 3D scenes, and Spline exports for web embedding. Also activates when evaluating whether a 3D element is appropriate for a web context."
---

# bb-dp-spline

3D on the web is a performance decision as much as a design decision. Every polygon has a cost.

---

## Core Principle

Web 3D must earn its performance budget. Beautiful 3D that slows the page to 2fps has failed. Optimize relentlessly.

---

## When Spline is the Right Choice

| Context | Spline fit |
|---|---|
| Hero 3D element, marketing site | ✅ |
| Interactive product visualization | ✅ |
| Brand signature 3D object | ✅ |
| Complex 3D scene with many objects | ⚠️ Optimize carefully |
| Mobile-primary audience | ⚠️ Test performance first |
| Core content (not enhancement) | ❌ Too risky for load time |

---

## Performance Standards

Before export:
- [ ] Polygon count minimized (use LOD if needed)
- [ ] Textures compressed
- [ ] Unused objects deleted
- [ ] Tested on mid-range mobile device
- [ ] Fallback defined for low-performance devices

Target: Spline scene loads in under 2 seconds on a standard connection.

---

## Push Back Triggers

**"Add more 3D elements to the page"**
> Each 3D element multiplies load time. What's the performance budget? Let's decide how much 3D the experience can support before adding more.
