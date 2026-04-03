# Observability

## Trace Standartları

Her ajan aksiyonu için zorunlu alanlar:

| Alan | Açıklama |
|---|---|
| `trace_id` | Oturum kimliği — tüm zinciri bağlar |
| `agent_id` | Hangi ajan çalıştı |
| `reasoning` | Neden bu kararı aldı |
| `input` | Ne aldı |
| `output` | Ne üretti |
| `tool_calls` | Hangi araçları çağırdı |
| `token_usage` | Token maliyeti |
| `duration_ms` | Süre |
| `quality_score` | Çıktı kalite skoru (0-1) |
| `dna_version` | Hangi DNA snapshot kullanıldı |

## Memory Keeper — Observability Tetikleyicileri

| Durum | Aksiyon |
|---|---|
| Aynı ajan 2+ kez aynı hatayı yaptı | BOND'a bildir |
| Kalite skoru < 0.75 | BOND'a bildir |
| Token kullanımı normalin 3x üstünde | BOND'a bildir |
| DNA version uyumsuzluğu | Acil bildir |

## Monitor Emit Protokolü

BOND her görevde aşağıdaki HTTP POST çağrılarını aşağıdaki endpoint'e gönderir.
Monitör kapalıysa veya sunucu yanıt vermiyorsa sessizce devam edilir — hiçbir zaman bloklanmaz.

**Aktif endpoint:** `https://agent.brand.bond/event`

> Kalıcı URL — Cloudflare Tunnel üzerinden `bond-monitor` tüneline yönlendirilir.

### Zorunlu Emit Noktaları

| An | Event type | Zorunlu alanlar |
|---|---|---|
| Samet'ten talep alındı | `TASK_START` | `trace_id`, `brand`, `intent` |
| Bir ajan aktive edildi | `AGENT_ACTIVE` | `agent_id`, `agent_name`, `layer`, `action`, `progress` |
| Bir ajan tamamlandı | `AGENT_DONE` | `agent_id`, `duration_ms`, `quality_score` |
| Araç çağrısı yapıldı | `TOOL_CALL` | `tool`, `agent`, `status` |
| Önemli bir log satırı | `TRACE_LOG` | `agent`, `message`, `tags` |
| Görev tamamlandı | `TASK_COMPLETE` | `trace_id`, `duration_ms`, `quality_score` |
| Hata oluştu | `AGENT_ERROR` | `agent_id`, `error` |

### Layer Değerleri
`bond` · `master` · `sub` · `memory` · `ops` · `tool`

### Emit Formatı
```
POST https://agent.brand.bond/event
Content-Type: application/json

{
  "type": "AGENT_ACTIVE",
  "agent_id": "bond",
  "agent_name": "BOND",
  "layer": "bond",
  "action": "Talep analizi — marka ve niyet tespiti",
  "progress": 10,
  "ts": <unix_ms>
}
```

### trace_id Üretimi
Her görev başında: `tr_` + 8 rastgele alfanümerik karakter (örn: `tr_a3f9k2m1`)
Aynı trace_id tüm emit çağrılarında kullanılır.

### Fallback
Sunucu yanıt vermezse (timeout 2s) → sessizce devam et, Samet'e bildirme.
