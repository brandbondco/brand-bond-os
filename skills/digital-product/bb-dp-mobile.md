---
name: bb-dp-mobile
description: "Activate for iOS and Android UX decisions, native component usage, mobile-specific interaction patterns, and platform-appropriate design choices. Also activates when a mobile design is ignoring platform conventions or creating unnecessary friction."
---

# bb-dp-mobile

Mobile design is not desktop design made smaller. It's a different context with different constraints and different user behaviors.

---

## Core Principle

Respect platform conventions unless breaking them creates clear value. Users have years of muscle memory. Fighting that memory costs trust.

---

## Platform Decision

Before designing, decide: iOS-first, Android-first, or cross-platform?

| Approach | When to choose |
|---|---|
| iOS-first | Primary audience is iPhone users |
| Android-first | Primary audience is Android users or emerging markets |
| Cross-platform parity | Both audiences matter equally |
| Platform-specific | Budget allows full native for both |

Don't try to build one design that "works for both" — it usually works well for neither.

---

## iOS Standards
- Navigation: Tab bar (bottom) for primary navigation, navigation stack for hierarchy
- Typography: SF Pro — don't replace without strong reason
- Touch targets: minimum 44×44pt
- Safe areas: always respect (notch, home indicator, dynamic island)
- Gestures: swipe back is expected — don't break it

## Android Standards
- Navigation: Bottom navigation bar (3-5 items) or navigation drawer
- Typography: Roboto / Material You dynamic type
- Touch targets: minimum 48×48dp
- System back: respect Android back behavior
- Material You: consider dynamic color if targeting Android 12+

---

## Push Back Triggers

**"Just make it look like the website"**
> Mobile users have different contexts, different goals, and different input methods. The website layout will create friction on mobile. Let's design for the mobile context specifically.

**"We don't need platform-specific components"**
> Custom components have a cost — users don't recognize them instantly. Every deviation from native patterns requires more onboarding. Is that tradeoff worth it here?
