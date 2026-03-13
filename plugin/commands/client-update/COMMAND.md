---
command: client-update
description: Draft a client update message. Clear, professional, honest — covers status, next steps, and any blockers that need client action.
version: 1.0
updated: 2026-03
---

# /client-update

Drafts a status update message for the client. No fluff, no vague reassurance — what's done, what's next, what we need from them.

## What this does

Activates `bb-client-comms` + `bb-studio-ops` to produce a client-ready message. Adapts tone to the client's language (Turkish or English) and the situation (routine update, delay, feedback request, milestone reached).

## Usage

```
/client-update [situation summary]
```

**Examples:**
- `/client-update Wonn, brand brief approved, moving to concept phase`
- `/client-update project delayed, waiting on client assets since last week`
- `/client-update concept presentation ready, need to schedule review`
- `/client-update` *(starts a context intake)*

## Message types

| Type | When to use |
|---|---|
| **Progress update** | Regular check-in, milestone reached |
| **Blocker** | Waiting on client input, project can't proceed |
| **Feedback request** | Work is ready, need a decision |
| **Scope clarification** | New request received, needs to be addressed |
| **Delay notice** | Timeline needs to shift, proactive communication |

## Output format

Every update includes:

```
STATUS     — Where the project is right now (one sentence)
DONE       — What was completed since last update
NEXT       — What's happening next and when
NEEDS      — What we need from the client (if anything)
```

Short. No corporate filler. No apologies unless genuinely warranted.

## Tone rules

- Match the client's language
- Direct but professional
- Never vague ("we're making progress") — always specific ("identity concepts ready by Friday")
- If there's a problem, name it clearly and provide a solution in the same message

## Connects to

`bb-client-comms` · `bb-studio-ops` · `bb-ops-slack`
