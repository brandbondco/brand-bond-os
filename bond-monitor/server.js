/**
 * BOND OS — WebSocket Bridge Server
 * 
 * İki görevi var:
 * 1. HTTP POST /event  → BOND'dan event alır
 * 2. WebSocket /ws     → Monitör ekranına anlık iletir
 * 
 * Kurulum: node server.js
 * Varsayılan port: 3131 (değiştirmek için PORT env kullan)
 */

const express = require('express');
const cors    = require('cors');
const http    = require('http');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 3131;

// ── Express ──
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Son N event'i bellekte tut — yeni bağlanan monitörler geçmişi görsün
const EVENT_BUFFER_SIZE = 200;
const eventBuffer = [];

function pushEvent(event) {
  event.server_ts = Date.now();
  eventBuffer.push(event);
  if (eventBuffer.length > EVENT_BUFFER_SIZE) eventBuffer.shift();
  broadcastToMonitors(event);
}

// ── HTTP Endpoints ──

// BOND'dan event gönderme
app.post('/event', (req, res) => {
  const event = req.body;
  if (!event || !event.type) {
    return res.status(400).json({ error: 'event.type zorunlu' });
  }
  pushEvent(event);
  res.json({ ok: true, ts: event.server_ts, clients: getMonitorCount() });
});

// Toplu event — bir trace'in tüm adımlarını tek seferde gönder
app.post('/events', (req, res) => {
  const { events } = req.body;
  if (!Array.isArray(events)) return res.status(400).json({ error: 'events array zorunlu' });
  events.forEach(pushEvent);
  res.json({ ok: true, count: events.length });
});

// Sistem durumu — BOND bağlı mı kontrol et
app.get('/status', (req, res) => {
  res.json({
    ok: true,
    version: '1.0.0',
    monitors: getMonitorCount(),
    buffered_events: eventBuffer.length,
    uptime_s: Math.floor(process.uptime())
  });
});

// Son event'leri getir (yeni bağlanan monitör için)
app.get('/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  res.json(eventBuffer.slice(-limit));
});

// Tüm buffer'ı temizle (yeni oturum başlangıcı)
app.post('/reset', (req, res) => {
  eventBuffer.length = 0;
  broadcastToMonitors({ type: 'RESET', ts: Date.now() });
  res.json({ ok: true });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── HTTP + WebSocket Server ──
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const monitors = new Set();

function getMonitorCount() { return monitors.size; }

function broadcastToMonitors(event) {
  const payload = JSON.stringify(event);
  monitors.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  });
}

wss.on('connection', (ws, req) => {
  monitors.add(ws);
  console.log(`[+] Monitör bağlandı — toplam: ${monitors.size}`);

  // Yeni bağlanan monitöre son event geçmişini gönder
  const history = eventBuffer.slice(-50);
  if (history.length > 0) {
    ws.send(JSON.stringify({ type: 'HISTORY', events: history }));
  }

  // Bağlantı onayı
  ws.send(JSON.stringify({
    type: 'CONNECTED',
    message: 'BOND Monitor bağlandı',
    monitors: monitors.size,
    ts: Date.now()
  }));

  ws.on('message', (data) => {
    // Monitörden ping gelirse pong dön
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'PING') {
        ws.send(JSON.stringify({ type: 'PONG', ts: Date.now() }));
      }
    } catch {}
  });

  ws.on('close', () => {
    monitors.delete(ws);
    console.log(`[-] Monitör ayrıldı — toplam: ${monitors.size}`);
  });

  ws.on('error', (err) => {
    console.error('WS hata:', err.message);
    monitors.delete(ws);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔═══════════════════════════════════════╗');
  console.log('║       BOND OS — Monitor Server        ║');
  console.log('╠═══════════════════════════════════════╣');
  console.log(`║  HTTP  →  http://localhost:${PORT}       ║`);
  console.log(`║  WS    →  ws://localhost:${PORT}/ws      ║`);
  console.log('╠═══════════════════════════════════════╣');
  console.log('║  Endpoints:                           ║');
  console.log('║  POST /event     ← BOND event gönder ║');
  console.log('║  GET  /status    ← Sistem durumu      ║');
  console.log('║  GET  /history   ← Event geçmişi      ║');
  console.log('║  POST /reset     ← Oturumu temizle    ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => { server.close(); process.exit(0); });
process.on('SIGINT',  () => { server.close(); process.exit(0); });
