---
command: discovery
description: Run Brand & Bond's discovery framework for a new or existing client. Diagnoses the real problem before any strategy or design work begins.
version: 1.0
updated: 2026-03
---

# /discovery

Run this command at the start of any new client engagement, brief review, or when the current project direction feels unclear.

## What this does

Activates `bb-discovery` to evaluate the brief and produce a structured discovery report. Refuses to move forward without a clear diagnosis.

## Usage

```
/discovery [client name or brief summary]
```

**Examples:**
- `/discovery Wonn Payment — crypto platform rebrand`
- `/discovery new client, SaaS B2B, wants "a new website"`
- `/discovery` *(starts an interactive brief intake)*

## Output

```
SITUATION    — Where the brand actually is
REAL PROBLEM — The underlying issue (one sentence)
OPPORTUNITY  — What can be built from here
UNKNOWNS     — What we still need before proceeding
NEXT STEP    — Specific action, not generic advice
```

## Connects to

After discovery: `/proposal` · `/brand-brief` · `bb-brand-strategy`
