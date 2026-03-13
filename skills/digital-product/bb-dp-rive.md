---
name: bb-dp-rive
description: "Activate for interactive animations in web and mobile, state machine design, and runtime animation that responds to user input. Use when animation needs to be more than decorative — when it needs to respond, branch, or carry logic."
---

# bb-dp-rive

Rive is for animation that thinks. If the animation doesn't respond to anything, use Lottie or CSS. Use Rive when state matters.

---

## Core Principle

Rive animations are mini-applications. They have states, transitions, and inputs. Design the state machine before touching the timeline.

---

## State Machine First

Before animating:
```
1. List all states (idle, hover, active, loading, success, error)
2. Define transitions between states (what triggers them?)
3. Define inputs (boolean, number, trigger)
4. Map inputs to transitions
```

An animation built without a state machine plan will be rebuilt.

---

## When Rive is the Right Choice

| Use case | Rive fit |
|---|---|
| Icon with hover/active state | ✅ |
| Loading animation with success/error states | ✅ |
| Character with multiple behaviors | ✅ |
| Interactive brand element | ✅ |
| Simple one-shot animation | ❌ Use Lottie/CSS |
| Video-style hero animation | ❌ Use video/CSS |

---

## Export Standards

- Artboard size matches intended display size
- All unused assets removed before export
- State machine inputs documented for developer
- Test in Rive runtime (not just editor) before handoff
