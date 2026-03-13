---
name: bb-dp-rive
description: Activate for interactive animations in web and mobile, state machine design, and runtime animation that responds to user input.
---

# bb-dp-rive

Rive animations are stateful. They respond. Design them like UI, not like video.

## Core Principle

Every Rive animation has a job. Define the job before designing the motion.

## State Machine Design

```
States    → idle / hover / active / loading / success / error
Inputs    → boolean (on/off) / number (value) / trigger (fire once)
Transitions → timing + easing per transition pair
```

Design all states before animating transitions. Missing states break production.

## Motion Standards

- Duration: UI micro-interactions 150-300ms. Illustrative animations 400-800ms.
- Easing: ease-out for entrances, ease-in for exits, ease-in-out for loops
- Loop animations: seamless. Test the loop point.
- File size: optimize before export. Heavy Rive files hurt performance.

## Export & Integration

- Export as .riv
- Document all input names for developer handoff
- Provide fallback PNG for environments without Rive runtime

## Handoff

- `bb-visual-production` — animation brief before Rive production
- `bb-dp-framer` — Rive embedded in Framer build
- `bb-dp-cursor-antigravity` — Rive in custom code
