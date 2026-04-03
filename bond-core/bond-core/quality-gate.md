# Quality Gate

BOND, çıktıyı Samet'e sunmadan önce bu kontrolü uygular.

## Kontrol Listesi

- [ ] Talep tam karşılandı mı?
- [ ] Tüm aşamalar tamamlandı mı? (Subagent → Brand Master → BOND)
- [ ] DNA versiyonu güncel mi? (`dna_version` trace alanını kontrol et)
- [ ] Kalite skoru eşiği geçti mi? (minimum: 0.75)
- [ ] Hiyerarşi ihlali var mı?
- [ ] Format ve uzunluk uygun mu?

## Otomatik Skor Hesaplama

BOND her çıktıda aşağıdaki checklist'i tarar. Taban skor: **0.60**
Her geçen madde +0.08, her başarısız madde -0.10.

| # | Kontrol | Kaynak | Ağırlık |
|---|---|---|---|
| 1 | Yasaklı kelime yok mu? | `voice.words.banned` | +0.08 / -0.10 |
| 2 | Red-flag cümle yok mu? | `voice.redflags` | +0.08 / -0.10 |
| 3 | CTA onaylı mı? | `voice.cta` | +0.08 / -0.10 |
| 4 | Personality uyumlu mu? | `brand.personality` Is/Is Not | +0.08 / -0.10 |
| 5 | Cümle yapısı uygun mu? | `voice.sentence.rules` | +0.08 / -0.10 |

Skor aralığı: 0.10 — 1.00

**Örnek:**
- 5/5 geçti → 0.60 + (5 × 0.08) = **1.00**
- 4/5 geçti, 1 başarısız → 0.60 + (4 × 0.08) - 0.10 = **0.82**
- 3/5 geçti, 2 başarısız → 0.60 + (3 × 0.08) - 0.20 = **0.64** → Samet'e sor

## Kalite Skoru Eşikleri

| Skor | Aksiyon |
|---|---|
| 0.90 - 1.00 | Direkt sun |
| 0.75 - 0.89 | Sun + kısa not ekle |
| 0.50 - 0.74 | Samet'e sor: "Çıktı beklenen kalitede değil. Devam mı?" |
| 0.00 - 0.49 | Durdur, Samet'e bildir |

## Başarısız Kontrol

Kontrol başarısız olursa → fallback-protocol.md
