# BOND OS Monitor — Kurulum Kılavuzu

## Sistem Mimarisi

```
Perplexity (BOND)
  │
  │  POST http://localhost:3131/event
  ▼
WebSocket Bridge Server (bond-ws-server)
  │
  │  ws://localhost:3131/ws
  ▼
Monitör Ekranı (tarayıcı / harici ekran)
```

---

## 1. Sunucuyu Başlat

```bash
cd bond-ws-server
node server.js
```

Sunucu `http://localhost:3131` adresinde başlar.

**Özel port kullanmak için:**
```bash
PORT=8080 node server.js
```

---

## 2. Monitörü Aç

Tarayıcıda monitör sayfasını aç:
- **Bağlantı ekranı** görünür
- URL: `ws://localhost:3131/ws` (varsayılan)
- **Bağlan** butonuna tıkla
- Tam ekran için `F11`

**Harici ekranda kullanım:**
Aynı ağdaysa `localhost` yerine bilgisayarın IP'sini yaz:
```
ws://192.168.1.100:3131/ws
```

---

## 3. BOND'u Bağla

Her BOND akış adımında `bond-emit.js` modülünü kullan:

```js
const bond = require('./bond-emit');

// Görev başlangıcı
await bond.taskStart({ trace_id: 'tr_abc', brand: 'TSS', intent: 'production' });

// Ajan aktive et
await bond.agentActive({
  agent_id: 'bond',
  agent_name: 'BOND',
  layer: 'bond',
  action: 'Talep analizi',
  progress: 10
});

// Araç çağrısı
await bond.toolCall({ tool: 'notion_mcp', agent: 'TSS Master', status: 'ok' });

// Ajan tamamlandı
await bond.agentDone({ agent_id: 'bond', duration_ms: 580, quality_score: 0.93 });

// Görev sonu
await bond.taskComplete({ trace_id: 'tr_abc', duration_ms: 3200, quality_score: 0.93 });
```

---

## 4. Event Referansı

| Event | Açıklama | Zorunlu Alanlar |
|---|---|---|
| `TASK_START` | Yeni görev | `trace_id`, `intent` |
| `AGENT_ACTIVE` | Ajan aktif | `agent_id`, `agent_name`, `layer`, `action` |
| `AGENT_DONE` | Ajan tamamlandı | `agent_id` |
| `AGENT_ERROR` | Ajan hata | `agent_id`, `error` |
| `TOOL_CALL` | Araç çağrısı | `tool`, `agent` |
| `TRACE_LOG` | Log satırı | `agent`, `message` |
| `TASK_COMPLETE` | Görev sonu | `trace_id`, `quality_score` |
| `SPOTLIGHT` | Spotlight güncelle | `agent`, `action`, `progress` |

### Layer Değerleri
`bond` · `master` · `sub` · `memory` · `ops` · `tool`

---

## 5. HTTP Endpoints

```
POST /event      → Tek event gönder
POST /events     → Toplu event (array)
GET  /status     → Sunucu durumu
GET  /history    → Son 50 event
POST /reset      → Oturumu temizle
```

---

## 6. Test

```bash
node bond-emit.js
```
Tam bir akış simülasyonu gönderir. Monitörde canlı izleyebilirsin.

---

## Sorun Giderme

| Sorun | Çözüm |
|---|---|
| "Bağlantı hatası" | `node server.js` çalışıyor mu kontrol et |
| Harici ekranda bağlanamıyor | Güvenlik duvarında 3131 portunu aç |
| Event gelmiyor | `curl http://localhost:3131/status` ile sunucuyu test et |
| Gecikme var | Sunucu ve monitör aynı ağda mı kontrol et |
