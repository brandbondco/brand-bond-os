---
name: bond-core
description: >
  BOND'un orkestrasyon kuralları, marka yönlendirme, kalite kapısı,
  hafıza protokolü, observability ve fallback kurallarını içerir.
  BOND tarafından yüklenir, doğrudan kullanılmaz.
metadata:
  version: '0.5'
  parent: bond
---

# bond-core

BOND'un çalışma kuralları bu klasörde tanımlanır.

## Dosyalar

| Dosya | Amaç |
|---|---|
| `orchestration-rules.md` | Görev yönlendirme mantığı |
| `brand-router.md` | Hangi talebi hangi Brand Master alır |
| `quality-gate.md` | Son çıktı kalite kontrol kriterleri |
| `memory-protocol.md` | Sistem hafızası yönetimi |
| `observability.md` | Trace standartları |
| `fallback-protocol.md` | Hata toleransı ve fallback |
