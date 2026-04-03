# Sync Protocol

## Günlük Sync (Her sabah 08:00 — İstanbul)

```
1. Notion DNA Hub'ı fetch et (tüm markalar)
2. brand-memory/[marka]/dna-snapshot ile karşılaştır
3. Fark varsa → snapshot güncelle
4. Brand Master'ı bildir
5. 04 · Memory Sync Log'a yaz
6. BOND'a rapor et
```

## Anlık Sync (DNA değişikliği tespit edildiğinde)

```
1. Değişen sayfayı fetch et
2. Snapshot güncelle
3. İlgili template'leri geçersizleştir
4. BOND'u tetikle → Samet'e bildir
5. Log'a yaz
```

## Retrieval Stratejisi

Üç yöntem birlikte kullanılır:

| Yöntem | Ne Zaman |
|---|---|
| Semantic search | Kavramsal sorgular |
| Entity resolution | Varlık bazlı sorgular |
| Temporal tagging | Zaman bazlı sorgular |

## Temporal Tag Şeması

```
memory:
  content: "..."
  created: YYYY-MM-DD
  last_validated: YYYY-MM-DD
  valid_until: null veya YYYY-MM-DD
  source: "Notion URL"
```
