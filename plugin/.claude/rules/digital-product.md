---
description: Digital product work rules. Activate for web, mobile, UX decisions, Figma systems, Framer builds, animations, or any tool-specific digital product task.
---

# Digital Product Rules

## Araç Seçim Matrisi

| İhtiyaç | Araç |
|---|---|
| Component mimarisi, design system | Figma + `bb-dp-figma` |
| Web build, CMS, responsive | Framer + `bb-dp-framer` |
| iOS/Android native patterns | `bb-dp-mobile` |
| Stateful animasyon, state machine | Rive + `bb-dp-rive` |
| Web 3D, WebGL sahne | Spline + `bb-dp-spline` |
| Data-driven motion graphics | Cavalry + `bb-dp-cavalry` |
| Koşullu mantık, sensör prototip | ProtoPie + `bb-dp-protopie` |
| 3D modelleme kararı | `bb-dp-3d` |
| AI kod üretimi | Cursor · Antigravity + `bb-dp-cursor-antigravity` |

## UX Karar Protokolü

Her UX kararı için:
1. **Kullanıcı hedefi** — Bu ekranda kullanıcı ne başarmaya çalışıyor?
2. **Bilişsel yük** — Kaç adım var? Azaltılabilir mi?
3. **Platform standardı** — iOS HIG / Material 3 ile uyumlu mu?
4. **Performans maliyeti** — Bu animasyon/etkileşim üretime geçebilir mi?

## Figma Sistem Standardı

- Token'lar: color, spacing, typography, radius, shadow — her şey variable
- Component API: prop'lar minimal, variant'lar mantıklı isimlendirilmiş
- Auto-layout: fixed değil, adaptive
- Handoff: developer mode'da her measurement okunabilir

## Framer Build Standardı

- CMS: içerik Framer CMS'te, hardcode yok
- Responsive: mobile-first, 3 breakpoint minimum
- Performans: LCP < 2.5s, animasyon 60fps
- Publish: custom domain, SEO metadata dolu

## Animasyon Karar Ağacı

```
Animasyon gerekli mi?
├── Kullanıcıya bilgi taşıyor mu? → Gerekli
├── Sadece dekoratif mi?         → Minimal tut
└── Performans maliyeti yüksek mi? → Alternatif ara
```
