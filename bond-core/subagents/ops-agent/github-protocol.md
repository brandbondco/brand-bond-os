# GitHub Protocol

## PR ve Commit Kuralları

### Ön Kontrol (Idempotency)

```
1. PR açmadan önce aynı branch adı ile açık PR var mı kontrol et
2. Varsa → güncelle veya yorum ekle
3. Yoksa → yeni PR aç
```

### Branch İsimlendirme

```
[marka]/[tip]/[kısa-açıklama]
Örnek: tss/token/update-voice-banned-words
```

### Commit Mesajı

```
[marka] tip: kısa açıklama

Örnek: [tss] fix: update banned word list in voice tokens
```

Tipler: `fix`, `feat`, `token`, `docs`, `refactor`

### PR Formatı

| Alan | Kural |
|---|---|
| Başlık | Commit mesajı ile aynı format |
| Açıklama | Ne değişti + neden |
| Reviewer | Brand Master belirler |

### Kısıtlar

- Hiçbir ajan `main` branch'e direkt push yapamaz
- Design Agent → token dosyaları
- Ops Agent → PR açma, commit
- Her PR için TOOL_CALL emiti atılır

## Yetki

Ops Agent ve Design Agent. Brand Master onayı zorunlu.
