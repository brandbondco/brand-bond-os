---
description: Agent and rule management protocol. Activate when the user requests a change to how an agent behaves, wants to add a new rule, modify page structure, update a skill description, or says something like "artık şöyle yapalım", "bu ajanı güncelle", "kural ekle", "yapıyı değiştir".
---

# Agent Yönetim Protokolü

## NEO'nun Sistem Üzerindeki Yetkisi

NEO tüm agent, rule ve skill dosyalarını okuyabilir ve güncelleyebilir. Bu yetki şu amaçlar için kullanılır:
- Samet'in verdiği geri bildirimleri kalıcı kurala dönüştürmek
- Notion sayfa yapısı değişince ilgili filing kuralını güncellemek
- Yeni müşteri / yeni proje başlayınca yeni agent oluşturmak
- Bir agent yanlış davranıyorsa onu düzeltmek

**Her değişiklik önce Samet'e gösterilir. Onay alınmadan dosya değiştirilmez.**

---

## Değişiklik Akışı

```
Samet bir değişiklik söyler
         ↓
NEO hangi dosyanın değişeceğini belirler
         ↓
NEO mevcut içeriği okur (Read tool)
         ↓
NEO taslak değişikliği Samet'e gösterir
         ↓
Samet onaylar
         ↓
NEO dosyayı düzenler (Edit/Write tool)
         ↓
git add → git commit → git push
         ↓
"✓ Güncellendi. Plugin'i güncellemek için:
 /plugin marketplace update brand-bond-os"
```

---

## Tetikleyici Örnekler

| Samet ne derse | NEO ne yapar |
|---|---|
| "Wonn copy'lerinde artık 'instant' yerine 'real-time' kullanalım" | `wonn.md` kuralını günceller |
| "wonnpay.com'da Pricing bölümü kaldırıldı" | `notion-filing.md`'deki web yapısını günceller |
| "Brand DNA sayfasına Naming bölümü ekleyelim" | `notion-filing.md` + `Brand DNA` Notion sayfasını günceller |
| "Yeni müşteri: Continuum için agent lazım" | `continuum-brand-dna.md` agent dosyası oluşturur |
| "bb-discovery skill'i her zaman devreye giriyor, sadece yeni müşteri için olsun" | `bb-discovery/SKILL.md` description'ını günceller |
| "NEO artık Türkçe değil, sadece İngilizce konuşsun" | `NEO.md` dil protokolünü günceller |

---

## Yeni Agent Oluşturma Şablonu

Yeni bir müşteri ajanı oluşturulurken kullanılacak temel yapı:

```markdown
---
name: [client-brand-dna]
description: >
  [Client] brand identity, voice, tone, and writing standards agent.
  Activate for any [Client] content production, copy review, or brand direction.
---

# [client-brand-dna]

**Role:** [Müşterinin] kimliği, sesi, tonu ve yazım kuralları.

## Brand Overview
[Tek paragraf: kim, ne, nerede, kime]

## Positioning
[Ne oldukları ve ne olmadıkları]

## Brand Personality
[Is / Is not tablosu]

## Tone of Voice
[Register, vocabulary, sentence structure, formality level]

## Writing Rules
[Numerik kurallar listesi]

## What to Avoid
[Yasak liste]
```

---

## Notion Yapısı Değişince

Samet "şu bölümü kaldıralım" veya "bu sayfayı şöyle düzenleyelim" dediğinde:

1. `notion-filing.md` dosyasındaki ilgili bölümü güncelle
2. Notion'da `notion-update-page` ile sayfayı güncelle (varsa)
3. İlgili agent'ın kurallarında da bu yapı referans ediliyorsa onu da güncelle
4. Commit + push
5. Kullanıcıya bildir

---

## Dosya Yolları

```
Plugin kaynak: /Users/vagabond/Desktop/Cursor/brand-bond-os/plugin/
Agents:        .../plugin/agents/
Skills:        .../plugin/skills/
Commands:      .../plugin/commands/
Rules:         .../plugin/.claude/rules/
```

Git repo: `brandbondco/brand-bond-os` (main branch)
