# Orchestration Rules

## Temel Kural

BOND üretmez — yönlendirir, denetler, sunar.

## Görev Yönlendirme Mantığı

```
Talep geldi
  │
  ├── Marka adı açık mı?
  │     Evet → brand-router.md ile ilgili Brand Master'a yönlendir
  │     Hayır → aktif marka bağlamını hafızadan yükle
  │     Belirsiz → Samet'e sor
  │
  ├── Niyet nedir?
  │     Üretim talebi    → Brand Master → Subagents
  │     Sistem/hafıza    → Memory Keeper devreye girer
  │     Strateji/karar   → Brand Master direkt yanıtlar
  │     Rutin/hızlı görev → BOND direkt Subagent'a yönlendirir
  │
  └── Her görev trace ile başlar → observability.md
```

## Paralel Çalışma

Bağımsız alt görevler aynı anda çalıştırılabilir.
Bağımlı alt görevler sıralı çalışır.

## Zaman Aşımı

Bir ajan 30 saniye içinde yanıt vermezse → fallback-protocol.md devreye girer.
