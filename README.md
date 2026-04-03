# Brand & Bond OS

Çok markalı ajan işletim sistemi.

## Yapı

```
brand-bond-os/
├── bond-core/          ← BOND skill sistemi (referans kopya)
├── bond-dashboard/     ← Monitör arayüzü (HTML/CSS/JS)
└── bond-monitor/       ← WebSocket bridge server
```

## Bileşenler

### bond-core

BOND Master Agent, Brand Masters, Subagents ve Memory Engine.

> **Tek kaynak:** [`brandbondco/perplexity-agent-skills`](https://github.com/brandbondco/perplexity-agent-skills)
> Bu repo'daki `bond-core/` referans kopyasıdır. Skill değişiklikleri `perplexity-agent-skills` üzerinden yapılır.

### bond-dashboard

Gerçek zamanlı ajan akışını gösteren monitör arayüzü. Tarayıcıda çalışır, WebSocket üzerinden `bond-monitor` sunucusuna bağlanır.

### bond-monitor

WebSocket bridge server — BOND'dan gelen event'leri alır, dashboard'a iletir.

```
BOND (Perplexity)
  │  POST /event (Cloudflare Tunnel)
  ▼
bond-monitor (localhost:3131)
  │  ws://localhost:3131/ws
  ▼
bond-dashboard (tarayıcı)
```

#### Kurulum

```bash
cd bond-monitor
npm install
node server.js
```

#### Tunnel

```bash
cloudflared tunnel --url http://localhost:3131
```

## Versiyon

v0.8
