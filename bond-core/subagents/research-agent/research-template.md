# Research Agent — Çalışma Şablonu

## Araştırma Çıktı Formatı

Her araştırma çıktısı aşağıdaki yapıda paketlenir:

### 1. Özet (Brand Master'a teslim edilen)

```
Konu: [araştırma konusu]
Marka bağlamı: [hangi DNA token'ları ile yorumlandı]
Bulgu sayısı: [X]
Güvenilirlik: [yüksek / orta / düşük]
```

### 2. Bulgular

Her bulgu için:

| Alan | Açıklama |
|---|---|
| Başlık | Kısa, deklaratif |
| Kaynak | URL veya referans |
| İlgili DNA token | Hangi marka bağlamıyla ilişkili |
| Yorum | Marka perspektifinden ne anlama geliyor |

### 3. Marka Yorumu

Ham araştırma çıktısı teslim edilmez. Bulgular her zaman marka DNA bağlamıyla yorumlanır:

- Bu bulgu markayı nasıl etkiler?
- Hangi execution boşluğuna işaret ediyor?
- Aksiyon önerisi nedir?

## Kurallar

- Kaynak belirtilmeyen bulgu kabul edilmez
- Genel ifadeler yerine somut veri tercih edilir
- Brand Master'dan alınan DNA bağlamı zorunludur
- Çıktı alıcısı: Brand Master
