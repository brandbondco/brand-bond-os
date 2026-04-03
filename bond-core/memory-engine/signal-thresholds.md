# Signal Thresholds

Memory Keeper bu eşikleri izler. Aşılınca BOND tetiklenir.

## Güncelleme Sinyalleri

| Sinyal | Eşik | BOND Mesajı |
|---|---|---|
| Aynı token değişti | 3+ kez | "DNA güncellensin mi?" |
| Yasaklı kelime kullanıldı | 2+ kez | "Voice Agent skill güncellensin mi?" |
| Skill kuralıyla çelişen çıktı | 1 kez | Acil bildir |
| Snapshot ≠ Notion DNA | Anlık | Çift doğrulama başlat |
| Brand Master aynı kararı tekrarladı | 2+ kez | "Karar hafızaya işlensin mi?" |

## Kalite Sinyalleri

| Sinyal | Eşik | Aksiyon |
|---|---|---|
| Kalite skoru düşük | 2+ ardışık | BOND'a bildir |
| Token kullanımı yüksek | Normalin 3x | BOND'a bildir |
| Ajan hata tekrarı | 2+ kez | BOND'a bildir |

## Rollback Sinyalleri

| Sinyal | Eşik | Aksiyon |
|---|---|---|
| Skill güncelleme sonrası kalite düştü | 1 kez | "Rollback yapalım mı?" |
| DNA güncellemesi sonrası çıktı bozuldu | 1 kez | "Önceki snapshot'a dönelim mi?" |
