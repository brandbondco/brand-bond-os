# Slack Protocol

## Bildirim Kuralları

### Ön Kontrol (Idempotency)

```
1. Göndermeden önce son 1 saatteki mesajları kontrol et
2. Aynı içerikli bildirim varsa → gönderme
3. Yoksa → gönder
```

### Bildirim Formatı

```
[BOND · marka_adı] kısa başlık

Detay satırı — ne oldu, ne gerekiyor.
```

### Bildirim Türleri

| Tür | Ne Zaman | Onay |
|---|---|---|
| DNA değişikliği | Sync farkı tespit edildiğinde | BOND onayı |
| Görev tamamlandı | Büyük görev bittiğinde | Otomatik |
| Hata bildirimi | Fallback devreye girdiğinde | Otomatik |
| Karar onayı | Samet'ten onay beklendiğinde | BOND onayı |

### Kısıtlar

- BOND onayladıktan sonra gönderilir (otomatik türler hariç)
- Duplicate önlemek için son 1 saatteki mesajlar kontrol edilir
- Her bildirim için TOOL_CALL emiti atılır

## Yetki

Sadece Ops Agent. BOND onayı zorunlu (otomatik türler hariç).
