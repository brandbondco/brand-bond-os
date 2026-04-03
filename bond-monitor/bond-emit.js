/**
 * BOND OS — Event Emitter
 * 
 * BOND bu modülü kullanarak monitöre event gönderir.
 * Her akış adımında ilgili fonksiyon çağrılır.
 * 
 * Kullanım:
 *   const bond = require('./bond-emit');
 *   await bond.taskStart({ trace_id: 'tr_abc123', brand: 'TSS', intent: 'production' });
 *   await bond.agentActive({ agent_id: 'bond', agent_name: 'BOND', layer: 'bond', action: 'Talep analizi' });
 */

const SERVER = process.env.BOND_MONITOR_URL || 'http://localhost:3131';

async function emit(type, data = {}) {
  try {
    const res = await fetch(`${SERVER}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...data, ts: Date.now() }),
      signal: AbortSignal.timeout(2000) // 2s timeout — monitör yoksa BOND bloklanmaz
    });
    return res.ok;
  } catch {
    // Monitör yoksa veya kapalıysa sessizce devam et
    return false;
  }
}

// ── Event API ──

/** Yeni görev başlıyor */
function taskStart({ trace_id, brand, intent, input }) {
  return emit('TASK_START', { trace_id, brand, intent, input });
}

/** Bir ajan aktive edildi */
function agentActive({ agent_id, agent_name, layer, action, progress = 0 }) {
  return emit('AGENT_ACTIVE', { agent_id, agent_name, layer, action, progress });
}

/** Bir ajan görevini tamamladı */
function agentDone({ agent_id, agent_name, duration_ms, quality_score }) {
  return emit('AGENT_DONE', { agent_id, agent_name, duration_ms, quality_score });
}

/** Bir ajan hata verdi */
function agentError({ agent_id, agent_name, error }) {
  return emit('AGENT_ERROR', { agent_id, agent_name, error });
}

/** Araç çağrısı yapıldı */
function toolCall({ tool, agent, action, status = 'ok' }) {
  return emit('TOOL_CALL', { tool, agent, action, status });
}

/** Trace log satırı */
function traceLog({ agent, message, tags = [] }) {
  return emit('TRACE_LOG', { agent, message, tags, time: new Date().toTimeString().slice(0,8) });
}

/** Spotlight güncelleme — aktif ajan ve ilerleme */
function spotlight({ agent, action, progress, score }) {
  return emit('SPOTLIGHT', { agent, action, progress, score });
}

/** Görev tamamlandı */
function taskComplete({ trace_id, duration_ms, quality_score, output_preview }) {
  return emit('TASK_COMPLETE', { trace_id, duration_ms, quality_score, output_preview });
}

/** Sistem mesajı */
function system(message, data = {}) {
  return emit('SYSTEM', { message, ...data });
}

/** Oturumu temizle */
async function reset() {
  try {
    await fetch(`${SERVER}/reset`, { method: 'POST', signal: AbortSignal.timeout(2000) });
  } catch {}
}

module.exports = {
  taskStart, agentActive, agentDone, agentError,
  toolCall, traceLog, spotlight, taskComplete, system, reset,
  emit // raw emit for custom events
};

// ── Örnek kullanım (node bond-emit.js çalıştırınca test eder) ──
if (require.main === module) {
  (async () => {
    console.log('BOND emit test başlıyor...');

    await reset();
    await new Promise(r => setTimeout(r, 200));

    const tid = 'tr_test_' + Date.now();

    await taskStart({ trace_id: tid, brand: 'TSS', intent: 'production', input: 'Test talebi' });
    await new Promise(r => setTimeout(r, 300));

    await agentActive({ agent_id:'bond', agent_name:'BOND', layer:'bond', action:'Talep alındı — analiz ediliyor', progress:10 });
    await new Promise(r => setTimeout(r, 600));

    await traceLog({ agent:'BOND', message:'Brand Router çalışıyor', tags:[{label:'brand-router.md', cls:'tool'}] });
    await agentDone({ agent_id:'bond', agent_name:'BOND', duration_ms:580 });
    await new Promise(r => setTimeout(r, 300));

    await agentActive({ agent_id:'master', agent_name:'TSS Master', layer:'master', action:'DNA snapshot yükleniyor', progress:35 });
    await toolCall({ tool:'notion_mcp', agent:'TSS Master', action:'DNA Hub okuma', status:'ok' });
    await new Promise(r => setTimeout(r, 700));

    await agentDone({ agent_id:'master', agent_name:'TSS Master', duration_ms:650 });

    await agentActive({ agent_id:'sub', agent_name:'Voice Agent', layer:'sub', action:'İçerik üretiliyor — DNA v2.1', progress:65 });
    await new Promise(r => setTimeout(r, 900));

    await agentDone({ agent_id:'sub', agent_name:'Voice Agent', duration_ms:880, quality_score:0.93 });

    await taskComplete({ trace_id: tid, duration_ms:3200, quality_score:0.93 });

    console.log('Test tamamlandı.');
  })();
}
