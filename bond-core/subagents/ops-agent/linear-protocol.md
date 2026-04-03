# Linear Protocol

## Ticket Oluşturma Kuralları

### Ön Kontrol (Idempotency)

```
1. Oluşturmadan önce Linear'da başlık ile arama yap
2. Aynı veya çok benzer ticket varsa → güncelle, yeni oluşturma
3. Yoksa → oluştur
```

### Ticket Formatı

| Alan | Kural |
|---|---|
| Başlık | Kısa, açık, fiil ile başlar |
| Açıklama | Problem + beklenen çıktı |
| Label | Marka adı (ör: `the-side-system`) |
| Öncelik | Brand Master belirler |
| Atanan | Brand Master belirler veya boş bırakılır |

### Durum Güncellemeleri

```
Ticket oluşturduktan sonra:
→ TOOL_CALL emiti at
→ Brand Master'a bildir
→ Duplicate kontrolü: aynı trace_id'de aynı ticket iki kez oluşturulmaz
```

## Yetki

Sadece Ops Agent ticket oluşturabilir.
Brand Master onayı olmadan ticket açılmaz.
