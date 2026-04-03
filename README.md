# Brand & Bond OS

Çok markalı ajan işletim sistemi.

## Yapı

```
brand-bond-os/
├── bond-core/          ← BOND skill sistemi (orchestration, brand masters, subagents)
└── bond-monitor/       ← WebSocket bridge server (monitor eklentisi)
```

## Bileşenler

### bond-core
BOND Master Agent, Brand Masters, Subagents ve Memory Engine'i içerir.
Perplexity Computer skill kütüphanesine yüklenir.

### bond-monitor
Gerçek zamanlı ajan akışını izleyen WebSocket bridge server.
`agent.brand.bond` üzerinden Cloudflare Tunnel ile erişilir.

#### Kurulum
```bash
cd bond-monitor
npm install
node server.js
```

## Versiyon
v0.7
