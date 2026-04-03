# Tool Registry

Sistemde kullanılan tüm connector'lar ve erişim kuralları.

## Connector Haritası

| Araç | Connector ID | Kim Kullanabilir | Yetki |
|---|---|---|---|
| **Notion** | `notion_mcp` | Brand Masters, Memory Agent, Memory Keeper | Okuma + Yazma |
| **Linear** | `linear_alt` | Ops Agent | Okuma + Yazma |
| **GitHub** | `github_mcp_direct` | Ops Agent, Design Agent | Okuma + PR açma |
| **Slack** | `slack_direct` | Ops Agent | Sadece gönderme |
| **Google Drive** | `google_drive` | Memory Agent | Okuma |
| **Outlook** | `outlook` | Ops Agent | Okuma + Gönderme |
| **Google Calendar** | `gcal` | BOND | Okuma |

---

## Erişim Kuralları

### Her araç aksiyonunda zorunlu adımlar:

```
1. Yetki kontrolü
   → Bu ajan bu araç için yetkili mi? (yukarıdaki tablo)
   → Değilse → Brand Master üzerinden yetki iste

2. Idempotency kontrolü
   → Bu aksiyon daha önce yapıldı mı?
   → Yapıldıysa → güncelle, tekrar yapma
   → Detay → bond-core/fallback-protocol.md

3. Trace kaydı
   → tool_calls alanına ekle
   → trace_id ile bağla
   → Detay → bond-core/observability.md

4. Hata durumu
   → Araç başarısız → bond-core/fallback-protocol.md
```

---

## Araç Bazlı Kurallar

### Notion (`notion_mcp`)
```
Okuma: DNA Hub sayfaları, Memory Sync Log
Yazma: Memory Sync Log, karar geçmişi, DNA güncellemeleri
Kısıt: Brand Master veya Memory Keeper onayı olmadan DNA sayfalarına yazılmaz
```

### Linear (`linear_alt`)
```
Okuma: Mevcut ticket'ları kontrol et (idempotency)
Yazma: Ticket oluştur, durum güncelle
Kısıt: Brand Master onayı olmadan ticket açılmaz
       Duplicate önlemek için önce title ile arama yap
```

### GitHub (`github_mcp_direct`)
```
Okuma: Token dosyaları, component kodu, PR listesi
Yazma: PR açma, commit
Kısıt: Design Agent → token dosyaları
       Ops Agent → PR ve commit
       Hiçbir ajan main branch'e direkt push yapamaz
```

### Slack (`slack_direct`)
```
Gönderme: Ekip bildirimleri
Kısıt: BOND onayladıktan sonra gönderilir
       Duplicate bildirimi önlemek için son 1 saatteki mesajları kontrol et
```

### Google Drive (`google_drive`)
```
Okuma: Referans dokümanlar, şablonlar
Yazma: Yok
```

### Outlook (`outlook`)
```
Okuma: Gelen kutusu, takvim
Gönderme: BOND onayı zorunlu
Kısıt: Samet adına gönderilecek her e-posta BOND'un quality-gate'inden geçer
```

### Google Calendar (`gcal`)
```
Okuma: Müsaitlik kontrolü, toplantı bağlamı
Yazma: Yok (şimdilik)
```

---

## Yetki İhlali

Bir ajan yetkisiz bir araç çağırırsa:

```
→ Aksiyon durdurulur
→ Memory Keeper'a bildir
→ BOND'a acil bildir
→ Trace log'a yaz
→ Samet'e bildir
```
