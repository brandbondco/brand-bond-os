---
command: proposal
description: Generate a project proposal for a client. Scoped, priced, and structured to set clear expectations and get sign-off.
version: 1.0
updated: 2026-03
---

# /proposal

Produces a complete project proposal document. Structured to reflect Brand & Bond's approach — situation first, scope clear, three pricing options.

## What this does

Activates `bb-studio-ops` + `bb-presentation` to generate a proposal that's ready to send. Refuses to price without a defined scope.

## Usage

```
/proposal [client name and project type]
```

**Examples:**
- `/proposal Wonn Payment — brand identity + website`
- `/proposal new client, discovery + strategy only`
- `/proposal` *(starts a scoping intake)*

## Output structure

```
1. SITUATION     — Their problem, in their language (not our pitch)
2. APPROACH      — How Brand & Bond specifically solves this
3. SCOPE         — What's included, what's explicitly excluded
4. DELIVERABLES  — Named outputs, not phases
5. TIMELINE      — Realistic, with client dependencies called out
6. INVESTMENT    — Three options (Entry / Recommended / Full)
7. NEXT STEP     — One clear action to proceed
```

## Pricing options architecture

| Option | What it covers |
|---|---|
| **Entry** | Minimum viable scope — solves the core problem |
| **Recommended** | Optimal scope — what we'd do with a proper budget |
| **Full** | Comprehensive — everything that could be done |

Price on value, not hours. Each option shows the outcome, not the effort.

## Scope definition standard

Every line item must answer:
- What is produced?
- How many revision rounds?
- What does the client need to provide?
- What is NOT included?

## Connects to

After proposal: `/client-update` · `bb-studio-ops` · `bb-ops-linear`
