# Quality Gate

BOND, çıktıyı Samet'e sunmadan önce bu kontrolü uygular.

## Kontrol Listesi

- [ ] Talep tam karşılandı mı?
- [ ] Tüm aşamalar tamamlandı mı? (Subagent → Brand Master → BOND)
- [ ] DNA versiyonu güncel mi? (`dna_version` trace alanını kontrol et)
- [ ] Kalite skoru eşiği geçti mi? (minimum: 0.75)
- [ ] Hiyerarşi ihlali var mı?
- [ ] Format ve uzunluk uygun mu?

## Kalite Skoru Eşikleri

| Skor | Aksiyon |
|---|---|
| 0.90 - 1.00 | Direkt sun |
| 0.75 - 0.89 | Sun + kısa not ekle |
| 0.50 - 0.74 | Samet'e sor: "Çıktı beklenen kalitede değil. Devam mı?" |
| 0.00 - 0.49 | Durdur, Samet'e bildir |

## Başarısız Kontrol

Kontrol başarısız olursa → fallback-protocol.md
