# Brand Router

## Marka Tespiti

BOND her talepte önce aktif markayı belirler:

```
1. Talep içinde marka adı açıkça geçiyor mu?
   → Evet: o markanın Brand Master'ını aktive et
   → Hayır: bond-memory/system-state/active-brand oku
   → Bulunamadı: Samet'e sor

2. Brand Master mevcut ve erişilebilir mi?
   → Evet: görevi devret
   → Hayır: fallback-protocol.md
```

## Kayıtlı Brand Masters

| Marka | Brand Master | DNA Kaynağı |
|---|---|---|
| The Side System™ | tss-master | `brand-masters/tss-master/dna-source.md` |
| *(yeni marka)* | *(eklenecek)* | *(eklenecek)* |

## Yeni Marka Ekleme

1. `brand-masters/[marka-adi]-master/` klasörü oluştur
2. `SKILL.md`, `dna-source.md`, `active-agents.md` dosyalarını yaz
3. Bu tabloya ekle
