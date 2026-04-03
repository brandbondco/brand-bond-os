# Brand & Bond OS — Monitor

BOND ajan sisteminin gerçek zamanlı izleme altyapısı.

## Yapı

```
brand-bond-os/
├── bond-dashboard/     ← Monitör arayüzü (HTML/CSS/JS)
└── bond-monitor/       ← WebSocket bridge server (Node.js)
```

## Mimari

```
BOND (Perplexity)
  │
  │  POST /event  →  Cloudflare Tunnel
  ▼
bond-monitor  (localhost:3131)
  │
  │  ws://localhost:3131/ws
  ▼
bond-dashboard  (tarayıcı)
```

## bond-monitor

WebSocket bridge server. BOND'dan HTTP POST ile event alır, bağlı dashboard'lara WebSocket üzerinden iletir.

### Kurulum

```bash
cd bond-monitor
npm install
node server.js
```

### Endpoints

| Method | Path | Açıklama |
|---|---|---|
| POST | `/event` | Tek event gönder |
| POST | `/events` | Toplu event (array) |
| GET | `/status` | Sunucu durumu |
| GET | `/history` | Son 50 event |
| POST | `/reset` | Oturumu temizle |

### Tunnel

```bash
cloudflared tunnel --url http://localhost:3131
```

## bond-dashboard

Tarayıcıda çalışan canlı monitör arayüzü. WebSocket üzerinden `bond-monitor`'e bağlanır.

Gösterimler:
- Ajan akışı (BOND → Master → Subagents)
- Trace log
- Kalite skoru ve metrikler
- Katman aktivitesi
- Araç çağrıları

### Kullanım

Dashboard dosyalarını tarayıcıda aç, `ws://localhost:3131/ws` adresine bağlan.

## Event Tipleri

| Event | Açıklama |
|---|---|
| `TASK_START` | Yeni görev başladı |
| `AGENT_ACTIVE` | Ajan aktive edildi |
| `AGENT_DONE` | Ajan tamamlandı |
| `AGENT_ERROR` | Ajan hata verdi |
| `TOOL_CALL` | Araç çağrısı |
| `TRACE_LOG` | Log satırı |
| `SPOTLIGHT` | Spotlight güncelleme |
| `TASK_COMPLETE` | Görev tamamlandı |

## İlgili Repo

BOND skill sistemi (core): [`brandbondco/perplexity-agent-skills`](https://github.com/brandbondco/perplexity-agent-skills)
