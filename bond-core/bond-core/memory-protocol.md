# Memory Protocol

## Hafıza Yapısı

```
bond-memory/
  ├── user-context/     ← Samet'e dair kalıcı tercihler, çalışma stili
  └── system-state/     ← Aktif marka, son karar, sistem versiyonu

brand-memory/
  ├── [marka-adi]/
  │   ├── dna-snapshot/ ← Notion DNA Hub'ın son onaylı hali
  │   ├── decisions/    ← Onaylanmış marka kararları
  │   └── report-log/   ← Periyodik ajan raporları

subagent-memory/
  ├── session/          ← Geçici — oturum bitince temizlenir
  └── templates/        ← Canlı şablonlar (DNA'ya bağlı)
```

## Okuma Kuralı

Gelen talep hangi parçayı gerektiriyorsa sadece o yüklenir.
Tüm hafıza hiçbir zaman aynı anda taranmaz.

## Yazma Kuralı

| Ne Zaman | Ne Yazılır | Kim Yazar | Nereye |
|---|---|---|---|
| Oturum sonu | Onaylı kararlar | Memory Keeper | brand-memory/decisions |
| DNA değişikliği | Güncel snapshot | Memory Keeper | brand-memory/dna-snapshot |
| Skill güncelleme | Yeni versiyon | Memory Keeper | Skill dosyası |
| Her görev | Geçici çıktı | Subagent | subagent-memory/session |

## Onay Gerektiren Değişiklikler

Aşağıdaki token grupları değiştiğinde Memory Keeper → BOND → Samet onayı gerekir:

- `brand.name.*`
- `brand.essence`
- `cta.primary`
- `voice.words.banned`
- `logo.*`
