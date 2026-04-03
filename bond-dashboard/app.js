/* ─────────────────────────────────────────
   BOND OS Live Monitor — WebSocket Client
   ───────────────────────────────────────── */

// ── DOM ──
const connOverlay  = document.getElementById('connOverlay');
const mainHeader   = document.getElementById('mainHeader');
const mainContent  = document.getElementById('mainContent');
const wsUrlInput   = document.getElementById('wsUrl');
const connectBtn   = document.getElementById('connectBtn');
const connStatus   = document.getElementById('connStatus');
const flowArea     = document.getElementById('flowArea');
const flowIdle     = document.getElementById('flowIdle');
const traceArea    = document.getElementById('traceArea');
const traceEmpty   = document.getElementById('traceEmpty');
const agentBar     = document.getElementById('agentBar');
const abName       = document.getElementById('abName');
const abAction     = document.getElementById('abAction');
const abScore      = document.getElementById('abScore');
const abProgress   = document.getElementById('abProgress');
const tracePill    = document.getElementById('tracePill');
const sysDot       = document.getElementById('sysDot');
const sysLabel     = document.getElementById('sysLabel');
const wsLabel      = document.getElementById('wsLabel');
const wsIndicator  = document.querySelector('.ws-dot');
const flowMeta     = document.getElementById('flowMeta');
const eventCount   = document.getElementById('eventCount');
const monitorCount = document.getElementById('monitorCount');
const connDetail   = document.getElementById('connDetail');
// metrics
const mTasks       = document.getElementById('mTasks');
const mAgents      = document.getElementById('mAgents');
const mScore       = document.getElementById('mScore');
const mDuration    = document.getElementById('mDuration');
const mAgentsSub   = document.getElementById('mAgentsSub');

// ── State ──
let ws           = null;
let reconnectTimer = null;
let wsUrl        = '';
let totalEvents  = 0;
let taskCount    = 0;
let currentTraceId = null;
let flowNodes    = {};     // id → {card, dot, action el}
let layerCounts  = { bond:0, master:0, sub:0, memory:0, ops:0, tool:0 };
let toolCalls    = [];
let pingInterval = null;
let sessionStart = null;

// ── Theme ──
const themeToggle = document.querySelector('[data-theme-toggle]');
let currentTheme = 'dark';
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.innerHTML = currentTheme === 'dark'
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
});

// ── Connect ──
connectBtn.addEventListener('click', () => {
  wsUrl = wsUrlInput.value.trim();
  if (!wsUrl) return;
  connect(wsUrl);
});
wsUrlInput.addEventListener('keydown', e => { if (e.key === 'Enter') connectBtn.click(); });

document.getElementById('disconnectBtn').addEventListener('click', () => {
  if (ws) ws.close();
  showOverlay();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  fetch(wsUrl.replace('wss://', 'https://').replace('ws://', 'http://').replace('/ws', '/reset'), { method:'POST' })
    .catch(() => {});
  resetSession();
});

document.getElementById('clearLogBtn').addEventListener('click', () => {
  traceArea.innerHTML = '<div class="trace-empty" id="traceEmpty">Event bekleniyor</div>';
  totalEvents = 0;
  updateEventCount();
});

function connect(url) {
  setConnStatus('connecting', 'Bağlanılıyor...');
  clearTimeout(reconnectTimer);

  try {
    ws = new WebSocket(url);
  } catch(e) {
    setConnStatus('error', 'Geçersiz URL: ' + e.message);
    return;
  }

  ws.addEventListener('open', () => {
    setConnStatus('ok', 'Bağlantı kuruldu');
    setWsState('connected');
    connDetail.textContent = url;
    sessionStart = Date.now();
    showMain();
    startPing();
  });

  ws.addEventListener('message', (evt) => {
    try {
      const event = JSON.parse(evt.data);
      handleEvent(event);
    } catch(e) {
      console.warn('Parse hatası:', e);
    }
  });

  ws.addEventListener('close', () => {
    setWsState('disconnected');
    stopPing();
    // Auto-reconnect after 3s
    reconnectTimer = setTimeout(() => {
      if (wsUrl) {
        setWsState('connecting');
        connect(wsUrl);
      }
    }, 3000);
  });

  ws.addEventListener('error', () => {
    setConnStatus('error', 'Bağlantı hatası — sunucu çalışıyor mu?');
  });
}

function startPing() {
  stopPing();
  pingInterval = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type:'PING' }));
    }
  }, 20000);
}
function stopPing() {
  if (pingInterval) { clearInterval(pingInterval); pingInterval = null; }
}

// ── Event Handler ──
function handleEvent(event) {
  const t = event.type;

  if (t === 'CONNECTED') {
    if (event.monitors) monitorCount.textContent = event.monitors + ' monitör aktif';
    return;
  }
  if (t === 'PONG') return;

  if (t === 'HISTORY') {
    // Replay history events (muted — no animation delay needed)
    event.events.forEach(e => handleEvent(e));
    return;
  }

  if (t === 'RESET') {
    resetSession();
    return;
  }

  if (t === 'MONITORS_UPDATE') {
    monitorCount.textContent = event.count + ' monitör aktif';
    return;
  }

  // All other events increment counter
  totalEvents++;
  updateEventCount();

  switch(t) {
    case 'TASK_START':    onTaskStart(event);    break;
    case 'AGENT_ACTIVE':  onAgentActive(event);  break;
    case 'AGENT_DONE':    onAgentDone(event);    break;
    case 'AGENT_ERROR':   onAgentError(event);   break;
    case 'TOOL_CALL':     onToolCall(event);     break;
    case 'TRACE_LOG':     onTraceLog(event);     break;
    case 'TASK_COMPLETE': onTaskComplete(event); break;
    case 'SPOTLIGHT':     onSpotlight(event);    break;
    case 'SYSTEM':        onSystem(event);       break;
    default:
      // Generic — just log it
      addTraceEntry(event.agent || 'SYSTEM', event.message || t, event.tags || [], null);
  }
}

// ── Event Handlers ──
function onTaskStart(e) {
  taskCount++;
  mTasks.textContent = taskCount;
  currentTraceId = e.trace_id || genId();
  tracePill.textContent = 'trace_id: ' + currentTraceId;
  flowMeta.textContent = e.intent || '—';

  // Clear flow for new task
  clearFlow();
  setSystemProcessing(true);

  addTraceEntry('BOND', 'Yeni görev başlatıldı — ' + (e.intent || ''), [
    { label:'trace_id: ' + currentTraceId, cls:'info' },
    { label:'brand: ' + (e.brand||'—'), cls:'' }
  ], ts());
}

function onAgentActive(e) {
  const { agent_id, agent_name, layer, action } = e;

  // Show idle → flow
  if (flowIdle.parentElement === flowArea) {
    flowArea.removeChild(flowIdle);
  }

  // Create node if doesn't exist
  if (!flowNodes[agent_id]) {
    const node = createNode(agent_id, agent_name, layer, 'active', action);
    const delay = Object.keys(flowNodes).length * 60;
    node.style.animationDelay = delay + 'ms';
    flowArea.appendChild(node);
    flowNodes[agent_id] = {
      card: document.getElementById('nc-' + agent_id),
      dot:  document.getElementById('nd-' + agent_id),
      act:  document.getElementById('na-' + agent_id),
      startTs: Date.now()
    };
    // Add connector before (not for first node)
    if (Object.keys(flowNodes).length > 1) {
      flowArea.insertBefore(createConnector(true), node);
    }
  } else {
    setNodeState(agent_id, 'active', action);
  }

  // Spotlight
  setSpotlight(agent_name, action, e.progress || 0);
  mAgentsSub.textContent = agent_name;

  // Layer count
  const l = layerKey(layer);
  if (l) {
    layerCounts[l]++;
    const el = document.getElementById('lc-' + l);
    if (el) el.textContent = layerCounts[l];
    // Highlight row
    document.querySelectorAll('.layer-row').forEach(r => r.classList.remove('active-layer'));
    const row = document.querySelector(`[data-layer="${l}"]`);
    if (row) row.classList.add('active-layer');
  }

  // Agents metric
  const activeCount = Object.values(flowNodes).filter(n => n.status === 'active').length + 1;
  mAgents.textContent = Object.keys(flowNodes).length;

  flowArea.scrollTop = flowArea.scrollHeight;
}

function onAgentDone(e) {
  const { agent_id, duration_ms, quality_score } = e;
  if (flowNodes[agent_id]) {
    setNodeState(agent_id, 'done');
    const dur = duration_ms ? (duration_ms > 1000 ? (duration_ms/1000).toFixed(1)+'s' : duration_ms+'ms') : '';
    const durEl = document.getElementById('ndur-' + agent_id);
    if (durEl && dur) durEl.textContent = dur;
    flowNodes[agent_id].status = 'done';
  }
  if (quality_score !== undefined) {
    mScore.textContent = quality_score.toFixed(2);
    mScore.style.color = quality_score >= 0.75 ? 'var(--c-green)' : quality_score >= 0.5 ? 'var(--c-yellow)' : 'var(--c-red)';
  }
}

function onAgentError(e) {
  const { agent_id } = e;
  if (flowNodes[agent_id]) setNodeState(agent_id, 'error');
  addTraceEntry(e.agent_name || agent_id, 'Hata: ' + (e.error || '—'), [{ label:'error', cls:'err' }], ts());
}

function onToolCall(e) {
  const { tool, agent, action, status } = e;
  // Add to tools list
  addToolCall(tool, agent, status);
  const l = 'tool';
  layerCounts[l]++;
  const el = document.getElementById('lc-' + l);
  if (el) el.textContent = layerCounts[l];

  addTraceEntry(agent || tool, action || 'Araç çağrısı: ' + tool, [
    { label: tool, cls:'tool' },
    { label: status === 'ok' ? '✓' : status || '...', cls: status==='ok'?'ok':'' }
  ], ts());
}

function onTraceLog(e) {
  addTraceEntry(e.agent, e.message, e.tags || [], e.time || ts());
}

function onTaskComplete(e) {
  setSystemProcessing(false);
  const dur = e.duration_ms ? (e.duration_ms > 1000 ? (e.duration_ms/1000).toFixed(1)+'s' : e.duration_ms+'ms') : '—';
  mDuration.textContent = e.duration_ms || '—';
  if (e.quality_score !== undefined) {
    mScore.textContent = e.quality_score.toFixed(2);
    mScore.style.color = e.quality_score >= 0.75 ? 'var(--c-green)' : 'var(--c-yellow)';
  }
  setSpotlight('BOND', 'Görev tamamlandı · ' + dur, 100);
  addTraceEntry('BOND', 'Görev tamamlandı · ' + dur, [
    { label:'score: ' + (e.quality_score || '—'), cls:'ok' },
    { label:'duration: ' + dur, cls:'ok' }
  ], ts());
}

function onSpotlight(e) {
  setSpotlight(e.agent, e.action, e.progress || 0);
  if (e.score !== undefined) {
    abScore.textContent = 'score: ' + e.score;
    abScore.style.display = 'inline';
  }
}

function onSystem(e) {
  if (e.monitors !== undefined) {
    monitorCount.textContent = e.monitors + ' monitör aktif';
  }
}

// ── UI Helpers ──
function createNode(id, name, layer, status, action) {
  const lcls  = 'nc-' + layerKey(layer);
  const badge = 'badge-' + layerKey(layer);

  const wrap = document.createElement('div');
  wrap.className = 'flow-node';

  wrap.innerHTML = `
    <div class="node-card ${lcls}" id="nc-${id}">
      <div class="node-row1">
        <span class="node-name">${name}</span>
        <span class="node-badge ${badge}">${layerKey(layer)}</span>
      </div>
      <div class="node-action" id="na-${id}">${action || '—'}</div>
      <div class="node-footer">
        <div class="ndot ${status}" id="nd-${id}"></div>
        <span class="nstatus" id="ns-${id}">${statusLabel(status)}</span>
        <span class="node-dur" id="ndur-${id}"></span>
      </div>
    </div>
  `;
  return wrap;
}

function createConnector(live = false) {
  const el = document.createElement('div');
  el.className = 'flow-conn' + (live ? ' live' : '');
  return el;
}

function setNodeState(id, status, action) {
  const card = document.getElementById('nc-' + id);
  const dot  = document.getElementById('nd-' + id);
  const lbl  = document.getElementById('ns-' + id);
  const act  = document.getElementById('na-' + id);
  if (!card) return;
  card.classList.remove('is-active','is-done','is-error');
  if (status === 'active') card.classList.add('is-active');
  if (status === 'done')   card.classList.add('is-done');
  if (status === 'error')  card.classList.add('is-error');
  dot.className = 'ndot ' + status;
  lbl.textContent = statusLabel(status);
  if (action && act) { act.textContent = action; act.classList.add('lit'); }
}

function statusLabel(s) {
  return s === 'active' ? 'Çalışıyor' : s === 'done' ? 'Tamamlandı' : s === 'error' ? 'Hata' : 'Bekliyor';
}

function layerKey(layer) {
  const map = {
    bond:'bond', master:'master', sub:'sub',
    memory:'memory', ops:'ops', tool:'tool',
    'Brand Master':'master', 'Subagent':'sub',
    'Memory':'memory', 'Ops':'ops', 'Tool':'tool', 'BOND':'bond'
  };
  return map[layer] || layer?.toLowerCase() || 'bond';
}

function setSpotlight(name, action, progress) {
  agentBar.style.display = 'block';
  abName.textContent   = name;
  abAction.textContent = action;
  abProgress.style.width = Math.min(100, progress) + '%';
}

function setSystemProcessing(v) {
  sysDot.className = 'sys-dot' + (v ? ' processing' : '');
  sysLabel.textContent = v ? 'İşleniyor...' : 'Sistem aktif';
}

function addTraceEntry(agent, msg, tags, time) {
  const empty = document.getElementById('traceEmpty');
  if (empty) empty.remove();

  const el = document.createElement('div');
  el.className = 'trace-entry';
  const tagsHtml = (tags||[]).map(t =>
    `<span class="te-tag ${t.cls||''}">${t.label}</span>`
  ).join('');
  el.innerHTML = `
    <div class="te-top">
      <span class="te-agent">${agent}</span>
      <span class="te-time">${time || ts()}</span>
    </div>
    <div class="te-msg">${msg}</div>
    ${tags?.length ? `<div class="te-tags">${tagsHtml}</div>` : ''}
  `;
  traceArea.prepend(el);
}

function addToolCall(tool, agent, status) {
  const empty = document.querySelector('.tools-empty');
  if (empty) empty.remove();

  const el = document.createElement('div');
  el.className = 'tool-call-entry';
  el.innerHTML = `
    <span class="tc-name">${tool}</span>
    <span class="tc-meta">${agent || ''} · ${ts()}</span>
  `;
  const list = document.getElementById('toolsList');
  list.prepend(el);
  // Max 10 visible
  while (list.children.length > 10) list.removeChild(list.lastChild);
}

function clearFlow() {
  flowArea.innerHTML = '';
  flowNodes = {};
  agentBar.style.display = 'none';
  layerCounts = { bond:0, master:0, sub:0, memory:0, ops:0, tool:0 };
  Object.keys(layerCounts).forEach(k => {
    const el = document.getElementById('lc-' + k);
    if (el) el.textContent = '0';
  });
  document.querySelectorAll('.layer-row').forEach(r => r.classList.remove('active-layer'));
}

function resetSession() {
  clearFlow();
  flowArea.appendChild(flowIdle);
  traceArea.innerHTML = '<div class="trace-empty" id="traceEmpty">Event bekleniyor</div>';
  document.getElementById('toolsList').innerHTML = '<div class="tools-empty">Henüz araç çağrısı yok</div>';
  totalEvents = 0; taskCount = 0;
  mTasks.textContent = '0'; mAgents.textContent = '0';
  mScore.textContent = '—'; mDuration.textContent = '—';
  tracePill.textContent = 'trace_id: —'; flowMeta.textContent = '—';
  setSystemProcessing(false);
  updateEventCount();
}

function updateEventCount() {
  eventCount.textContent = totalEvents + ' event';
}

function setWsState(state) {
  wsIndicator.className = 'ws-dot ' + state;
  wsLabel.textContent = state === 'connected' ? 'Bağlı' : state === 'connecting' ? 'Bağlanıyor...' : 'Bağlantı yok';
}

function showMain() {
  connOverlay.style.display = 'none';
  mainHeader.style.display = 'flex';
  mainContent.style.display = 'grid';
}

function showOverlay() {
  connOverlay.style.display = 'flex';
  mainHeader.style.display = 'none';
  mainContent.style.display = 'none';
}

function setConnStatus(type, msg) {
  connStatus.textContent = msg;
  connStatus.className = 'conn-status ' + (type === 'error' ? 'error' : type === 'ok' ? 'ok' : '');
}

function ts() {
  return new Date().toTimeString().slice(0,8);
}
function genId() {
  return 'tr_' + Math.random().toString(36).slice(2,10);
}
