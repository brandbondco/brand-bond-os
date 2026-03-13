---
name: bb-dp-figma
description: "Activate for Figma component building, auto-layout setup, variables and token connection, design file organization, and any Figma structure decisions. Also activates when a Figma file is inconsistent, unscalable, or hard to hand off."
---

# bb-dp-figma

Figma is not a drawing tool. It's a system-building tool. Every decision in Figma either scales or creates debt.

---

## Core Principle

A Figma file that only the creator can navigate is a liability. Build for the next person — even if that person is you in 3 months.

---

## File Architecture

### Page Structure
```
🎨 Cover          → Project name, version, last updated
📐 Design System  → All tokens, components, foundations
🖥 Screens        → Actual designs, organized by flow
🔄 Flows          → Connected prototypes
📦 Archive        → Old versions, never delete
```

### Layer Naming
- Use real names, not "Frame 47" or "Group 3"
- Components: `[Component/Variant]` e.g. `Button/Primary/Default`
- Screens: `[Flow/Screen]` e.g. `Onboarding/Welcome`
- Groups: describe content, not position (not "left group")

---

## Component Structure

Every component needs:
1. **Base component** — the master, lives in Design System page
2. **Variants** — all valid states defined (default, hover, active, disabled, error)
3. **Properties** — exposed via Component Properties, not layer overrides
4. **Auto-layout** — always. No fixed-position components.
5. **Documentation** — usage note in component description field

Components without variants are illustrations. Components without auto-layout break on content changes.

---

## Variables Setup

### Mode Architecture
```
Color Variables
├── Light mode
├── Dark mode
└── (Brand modes if multi-brand)

Spacing Variables
└── Base scale (4px grid)

Typography Variables
└── Scale definitions
```

### Naming Convention
Match token naming exactly:
```
color/background/primary
color/text/secondary
spacing/component/sm
```

If Figma variable names diverge from code tokens — handoff breaks.

---

## Push Back Triggers

**"Just duplicate the frame and change it"**
> Duplicating without components means every change happens N times. Let's build the component once and use instances.

**"We'll clean up the file later"**
> Files don't get cleaned up later. The mess compounds. 20 minutes of organization now saves hours of confusion.

**"Auto-layout makes it complicated"**
> Auto-layout makes it correct. Fixed frames break on real content. Let's set it up right.
