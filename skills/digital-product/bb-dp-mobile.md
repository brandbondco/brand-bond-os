---
name: bb-dp-mobile
version: 1.0
updated: 2026-03
status: active
---

# bb-dp-mobile

Mobile is not a smaller desktop. It's a different context, different behavior, different constraints.

## Core Principle

Design for the thumb first. Everything else follows.

## Platform Standards

### iOS
- Follow Human Interface Guidelines for native patterns
- Navigation: tab bar (5 items max), navigation stack, modal sheets
- Typography: SF Pro. Don't fight the system font.
- Touch targets: 44×44pt minimum

### Android
- Follow Material Design 3 for native patterns
- Navigation: bottom nav, nav drawer, back stack
- Typography: Roboto / Google Sans system
- Touch targets: 48×48dp minimum

## Mobile UX Principles

- One primary action per screen
- Content above the fold must earn the scroll
- Keyboard-aware layouts — always
- Offline states always designed, never forgotten
- Error states as clear as success states

## Handoff

- `bb-dp-figma` — component library with mobile variants
- `bb-dp-protopie` — for native gesture prototypes
- `bb-dp-cursor-antigravity` — when moving to React Native
