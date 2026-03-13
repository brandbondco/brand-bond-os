---
command: concept
description: Develop brand concept directions. Always produces three options — Safe, Innovative, and Radical — grounded in the brand brief.
version: 1.0
updated: 2026-03
---

# /concept

Develops strategic brand concept directions for presentation to the client. Never a single option — always three, always grounded in strategy.

## What this does

Activates `bb-brand-strategy` + `bb-brand-identity` + `bb-presentation` to generate concept territories with rationale. Each concept includes a positioning logic, visual territory description, and TOV direction.

## Usage

```
/concept [client name or brief reference]
```

**Examples:**
- `/concept Wonn Payment`
- `/concept based on the brief we just built`

## Prerequisite

A brand brief must exist. Run `/brand-brief` first if it doesn't.

## Output structure (per concept)

```
CONCEPT NAME       — A working title that captures the territory
POSITIONING LOGIC  — Why this direction is strategically defensible
VISUAL TERRITORY   — Color, form, texture, reference direction (no moodboard, just language)
TOV DIRECTION      — How this concept sounds and speaks
TARGET RESPONSE    — What the audience should feel
RISK               — What could go wrong with this direction
```

Three concepts, formatted as a table for quick comparison, then expanded individually.

## Connects to

After concept: `/proposal` · `bb-brand-identity` · `bb-copywriter` · `bb-presentation`
