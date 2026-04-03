# Fallback Protocol

## Hata Seviyeleri

| Seviye | Durum | Aksiyon |
|---|---|---|
| Kırmızı | DNA erişilemiyor + snapshot yok | Görevi durdur, Samet'e bildir |
| Turuncu | Subagent başarısız, fallback çalışıyor | Samet'e bildir, devam et |
| Sarı | Kalite skoru düşük veya DNA eski | Samet'e not geç, devam et |
| Yeşil | Sistem tam çalışıyor | Sessiz |

## Fallback Hiyerarşisi

```
Agents Team başarısız
  → Parent Subagent devralır, delta olmadan çalışır

Subagent başarısız
  → Brand Master BOND'a bildirir
  → BOND: yeniden dene (1x) veya basit akışa geç

Brand Master başarısız
  → BOND direkt Subagent'a yönlendirir
  → Samet'e bildir: "Temel modda devam ediyorum"

Notion DNA fetch başarısız
  → Son geçerli dna-snapshot kullanılır
  → Memory Keeper'a bildir

Memory Keeper başarısız
  → BOND kritik hafıza işlemlerini devralır
  → Oturum sonunda Memory Keeper yeniden başlatılır
```

## Idempotency Kuralı

Yan etkisi olan tüm aksiyonlar idempotent olmalıdır:

- Linear ticket: önce kontrol et, varsa güncelle
- Notion yazma: önce kontrol et, varsa versiyonla
- Slack bildirimi: duplicate gönderimi önle
