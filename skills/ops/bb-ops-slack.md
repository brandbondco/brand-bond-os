---
name: bb-ops-slack
description: "Activate for team communication setup, Slack channel architecture, message templates, and async communication standards. Also activates when team communication is creating confusion or information is getting lost."
---

# bb-ops-slack

Slack is an async communication tool, not a real-time chat. Treat it accordingly.

---

## Channel Architecture

### Brand & Bond Standard Structure
```
#general          → Studio-wide announcements
#projects         → Cross-project updates
#[project-name]   → Per-project channel (e.g. #wonn-payment)
#ops              → Studio operations, admin
#inspiration      → References, creative fuel
#random           → Everything else
```

### Per-Project Channel Convention
Every active project gets one channel. No sub-channels unless the team exceeds 5 people.

---

## Communication Standards

**Default to async** — not every message needs an immediate response.
**Threads** — always reply in thread to keep channels scannable.
**Status updates** — use a consistent format:
```
📍 [Project] — [Date]
Done: ...
Next: ...
Blocked: ... (if any)
```

**Decisions** — document in thread, pin important ones.

---

## Message Templates

### Project Kickoff
```
🚀 [Project Name] is live.
Client: [Name]
Scope: [One line]
Timeline: [Start → End]
Key contacts: [Names]
Folder: [Link]
```

### Handoff to Freelancer
```
Hey [Name] — brief for [task]:
Context: [1-2 sentences]
Deliverable: [Exact output]
Deadline: [Date + time]
Assets: [Link]
Questions to: [Who]
```
