---
description: Notion filing rules. Activate whenever producing any deliverable — strategy, copy, brief, web content, or research. Every output must be filed in Notion automatically.
---

# Notion Filing Rules

## Temel Prensip

Her üretilen çıktı Notion'a kaydedilir. Kullanıcı istemese bile — üretim bittikten sonra otomatik olarak ilgili sayfaya eklenir. Bu bir tercih değil, çalışma standardı.

---

## Workspace Haritası

### Wonn Payment

| Sayfa | Notion ID | Ne için |
|---|---|---|
| Wonn - Payment (Wiki DB) | `collection://2ca02474-a137-8068-bd51-000b0a193e90` | Ana hub, tüm Wonn belgeleri |
| Brand DNA | `31c02474-a137-80af-afb2-c729a3603959` | Kimlik, ses, ton, yazım kuralları |
| wonnpay.com | `32102474-a137-8039-b8fd-fd5f126b9104` | Web sitesi içerikleri |

---

## İçerik Tipi → Konum

| Üretilen çıktı | Nereye kaydedilir |
|---|---|
| Web sayfası içeriği (hero, about, features vb.) | `wonnpay.com` sayfası — ilgili bölüme ekle/güncelle |
| Brand brief | Wonn Wiki'de yeni sayfa: "Brand Brief — [tarih]" |
| Strateji belgesi | Wonn Wiki'de yeni sayfa: "Strategy — [konu]" |
| Copy (tagline, headline, body copy) | `Brand DNA` sayfasına ilgili bölüme ekle |
| Social media içerikleri | Wonn Wiki'de yeni sayfa: "Social Content — [platform] — [tarih]" |
| Rakip analizi | Wonn Wiki'de yeni sayfa: "Competitor Research — [tarih]" |
| Concept directions | Wonn Wiki'de yeni sayfa: "Concept — [isim]" |
| Proposal / teklif | Wonn Wiki'de yeni sayfa: "Proposal — [kapsam] — [tarih]" |

---

## Kaydetme Protokolü

### Her üretimde şu sırayı izle:

```
1. ÜRET     — İçeriği tamamla, kullanıcıya göster
2. ARA      — notion-search ile ilgili sayfa var mı kontrol et
3. KARAR    — Var: güncelle / Yok: yeni sayfa oluştur
4. KAYDET   — notion-update-page veya notion-create-pages
5. RAPORLA  — "Notion'a kaydedildi → [sayfa adı]" ile bağlantı ver
```

### Güncelleme mi, yeni sayfa mı?

| Durum | Aksiyon |
|---|---|
| Aynı konuda sayfa zaten var | `notion-update-page` — `update_content` ile ilgili bölümü güncelle |
| İlk kez bu içerik üretiliyor | `notion-create-pages` ile yeni sayfa oluştur |
| Web içeriği (wonnpay.com) | Her zaman mevcut sayfayı güncelle, yeni sayfa açma |
| Brand DNA içeriği | Mevcut sayfaya ilgili bölüme ekle |

---

## Web İçeriği Kuralları (wonnpay.com)

`wonnpay.com` sayfası bölümlere göre düzenlenir. Yeni içerik üretildiğinde:

1. `notion-fetch` ile mevcut içeriği oku
2. İçeriğin ait olduğu bölümü belirle (Hero, Features, About, CTA vb.)
3. `notion-update-page` — `update_content` ile sadece o bölümü güncelle
4. Diğer bölümlere dokunma

**Bölüm yapısı:**
```
# Hero
# Features / How it Works
# About
# Pricing
# Trust / Security
# CTA
# Footer
```

---

## Wiki Kısıtı

Wonn - Payment bir Notion Wiki'si. Bu demek ki:
- Sayfa özellikleri (properties) güncellenemez
- Sadece sayfa **içeriği** (content) oluşturulabilir ve güncellenebilir
- Yeni sayfa oluştururken `data_source_id: 2ca02474-a137-8068-bd51-000b0a193e90` kullan

---

## Rapor Formatı

Her kayıt sonrasında kısa bilgi ver:

```
✓ Notion'a kaydedildi → [Sayfa Adı] (notion.so/...)
```

Hata varsa:
```
⚠ Notion kaydı başarısız → [hata] → Manuel kayıt gerekebilir
```
