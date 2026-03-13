---
command: brand-brief
description: Generate a complete, strategic brand brief for a client. Structures all discovery inputs into a single reference document the whole project runs on.
version: 1.0
updated: 2026-03
---

# /brand-brief

Produces the master brand brief document. This is the single source of truth for every decision in the project — identity, copy, digital product, and presentations all reference this.

## What this does

Activates `bb-discovery` + `bb-brand-strategy` to synthesize inputs into a structured brief. Pushes back on vague answers before producing the document.

## Usage

```
/brand-brief [client name]
```

**Examples:**
- `/brand-brief Wonn Payment`
- `/brand-brief` *(starts an intake interview)*

## Output structure

```
1. CLIENT OVERVIEW      — Business, stage, goal
2. REAL PROBLEM         — One sentence diagnosis
3. TARGET AUDIENCE      — Specific, not demographic soup
4. COMPETITIVE CONTEXT  — Who owns what in the market
5. POSITIONING          — What this brand will stand for
6. BRAND PERSONALITY    — Is / is not pairs
7. TONE OF VOICE        — Vocabulary, structure, formality level
8. SUCCESS METRICS      — How we know this worked
9. SCOPE SUMMARY        — What's in, what's out
10. OPEN QUESTIONS      — What's still unresolved
```

## Connects to

After brand brief: `/concept` · `/naming` · `/proposal` · `bb-brand-identity`
