---
command: naming
description: Run Brand & Bond's naming process. Strategic first, generative second — names are evaluated against positioning before they're presented.
version: 1.0
updated: 2026-03
---

# /naming

Runs the full naming process: defines the territory, sets the constraints, generates candidates, then evaluates each one against strategy — not personal preference.

## What this does

Activates `bb-brand-strategy` + `bb-copywriter` to produce a curated naming shortlist with strategic rationale for each candidate.

## Usage

```
/naming [client or product description]
```

**Examples:**
- `/naming crypto payment platform, Dubai, professional audience`
- `/naming sub-brand for Wonn's business accounts feature`
- `/naming` *(starts a naming intake)*

## Process (runs automatically)

```
1. NAMING TERRITORY    — What feeling and category signal the name must carry
2. NAMING STYLE        — Real word / invented / compound / metaphor / abstract
3. CONSTRAINTS         — Length, phonetics, markets, trademark risk
4. GENERATION          — 15–20 raw candidates
5. EVALUATION          — Scored against: distinctiveness, memorability, 
                         pronounceability, trademark viability, strategic fit
6. SHORTLIST           — Top 5 with full rationale per name
```

## Evaluation criteria per name

| Criterion | What it tests |
|---|---|
| Distinctiveness | Stands out in the category |
| Memorability | Easy to recall after one encounter |
| Pronounceability | Works across key markets |
| Trademark viability | Likely available (not a legal opinion) |
| Domain/handle | .com and social handle availability signal |
| Strategic fit | Aligns with positioning territory |

## Connects to

After naming: `/brand-brief` update · `bb-brand-identity` · `bb-copywriter`
