# Observability

## İç Log (Sistem hafızasında tutulur)

Detaylı trace — debug, kalite analizi ve memory engine için.

| Alan | Açıklama |
|---|---|
| `trace_id` | Görev kimliği — tüm zinciri bağlar |
| `agent_id` | Hangi ajan çalıştı |
| `reasoning` | Neden bu kararı aldı |
| `input` | Ne aldı |
| `output` | Ne üretti |
| `tool_calls` | Hangi araçları çağırdı |
| `duration_ms` | Süre |
| `quality_score` | Çıktı kalite skoru (0-1) |
| `dna_version` | Hangi DNA snapshot kullanıldı |

## Memory Keeper — Observability Tetikleyicileri

| Durum | Aksiyon |
|---|---|
| Aynı ajan 2+ kez aynı hatayı yaptı | BOND'a bildir |
| Kalite skoru < 0.75 | BOND'a bildir |
| DNA version uyumsuzluğu | Acil bildir |

## Layer Değerleri

`bond` · `master` · `sub` · `memory` · `ops` · `tool`

## Monitor Emit — AKTİF

BOND her oturumda monitor'e otomatik event gönderir.

### Bağlantı Protokolü

```
1. BOND aktive olduğunda (Samet "BOND" yazdığında):
   → Monitor tunnel URL'ini memory'den oku
   → Yoksa Samet'e sor: "Monitor tunnel URL?"
   → URL alındığında /status endpoint'ini test et (curl)
   → 200 dönerse → emit aktif
   → Başarısız → "Monitor erişilemiyor — emit devre dışı" bildir, göreve devam et

2. Tunnel URL formatı:
   https://[subdomain].trycloudflare.com
   
3. Bağlantı doğrulandığında:
   → SYSTEM event gönder: {type: "SYSTEM", message: "BOND oturum başlatıldı"}
   → POST /reset ile önceki oturumu temizle
```

### Emit Kuralları

BOND her görev akışında aşağıdaki event'leri **otomatik** gönderir:

```
Görev başladığında:
  → POST /event {type: "TASK_START", trace_id, brand, intent, input}

Her ajan aktive edildiğinde:
  → POST /event {type: "AGENT_ACTIVE", agent_id, agent_name, layer, action, progress}

Her ajan tamamlandığında:
  → POST /event {type: "AGENT_DONE", agent_id, agent_name, duration_ms, quality_score}

Her ajan hata verdiğinde:
  → POST /event {type: "AGENT_ERROR", agent_id, agent_name, error}

Her araç çağrısında:
  → POST /event {type: "TOOL_CALL", tool, agent, action, status}

Önemli akış noktalarında:
  → POST /event {type: "TRACE_LOG", agent, message, tags}

Spotlight güncellemelerinde:
  → POST /event {type: "SPOTLIGHT", agent, action, progress, score}

Görev tamamlandığında:
  → POST /event {type: "TASK_COMPLETE", trace_id, duration_ms, quality_score, output_preview}
```

### Emit Yöntemi

BOND `bash` tool ile `curl` kullanarak POST gönderir:

```bash
curl -s -X POST "$MONITOR_URL/event" \
  -H "Content-Type: application/json" \
  -d '{"type": "...", ...}'
```

### Progress Değerleri

| Aşama | Progress |
|---|---|
| BOND talep aldı | 5 |
| Brand Router çalıştı | 10 |
| Brand Master aktif | 15 |
| Memory Agent DNA fetch | 25 |
| Subagents tetiklendi | 40-60 |
| Subagents tamamlandı | 70-85 |
| Quality Gate | 90 |
| Görev tamamlandı | 100 |

### Hata Toleransı

Monitor erişilemezse BOND çalışmaya devam eder — emit başarısız olursa sessizce geçilir.
Monitor hiçbir zaman BOND'un ana akışını bloklamaz.
