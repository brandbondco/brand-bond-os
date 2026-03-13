---
name: bb-dp-protopie
description: Activate for advanced prototype builds, micro-interaction design, and high-fidelity behavior simulation. Use when Figma prototyping is insufficient to communicate the experience.
---

# bb-dp-protopie

ProtoPie is for interactions too complex for Figma. Use it to validate behavior before building.

## When to Use ProtoPie

- Conditional logic (if/then interactions)
- Multi-step flows with state
- Sensor-based interactions (device tilt, touch force)
- Realistic data in prototype (variables, formulas)
- User testing with high-fidelity behavior

## When NOT to Use ProtoPie

- Simple click-through flows → Figma is enough
- Final production handoff → Use Framer or code
- Static presentation → Keynote or PDF is faster

## Prototype Standards

- Define the test scenario before building
- Use variables for any data that changes
- Name all components and interactions clearly
- Include error states and edge cases
- Export for sharing — don't require ProtoPie to view

## Handoff

- `bb-dp-figma` — design source
- `bb-dp-mobile` — if mobile gesture testing
- `bb-digital-product` — validated behavior fed back to UX decisions
