// Small, payload-free evidence retained even when a timing trip never reaches arrival.
function snapshotFailure() {
  const chart = window.chart, trace = window.__travelProbe?.trace;
  return {
    ready: window.witch?.ready ?? null,
    chart: chart ? { selected: chart.chart?.selected ?? null, islands: (chart.islands?.() || []).map(i => ({ id: i.id, outline: !!i.outline, sail: !!i.sail })) } : null,
    marks: performance.getEntriesByType('mark').slice(-32).map(e => ({ name: e.name, at: Math.round(e.startTime) })),
    probe: trace ? { dropped: trace.dropped, workerEvents: trace.events.length, lastWorkerEvents: trace.events.slice(-32).map(e => ({ ...e })), uploads: Object.values(trace.uploads || {}).map(g => ({ ...g })) } : null,
  };
}
async function collectFailure(page, context, timeout = 1500) {
  if (!page) return { ...context, diagnosticError: 'no page created' };
  const capture = async read => {
    let timer;
    try { return await Promise.race([Promise.resolve().then(read), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('failure snapshot timed out')), timeout); })]); }
    catch (e) { return { diagnosticError: String(e) }; }
    finally { clearTimeout(timer); }
  };
  let workers = [];
  try { workers = page.workers?.() || []; } catch { /* page already closed */ }
  const [snapshot, ...states] = await Promise.all([
    capture(() => page.evaluate(snapshotFailure)),
    ...workers.map(async worker => ({ url: worker.url(), ...await capture(() => worker.evaluate(() => ({ handlerInstalled: typeof self.onmessage === 'function', marks: performance.getEntriesByType('mark').slice(-16).map(e => ({ name: e.name, at: Math.round(e.startTime) })) }))) })),
  ]);
  return { ...context, ...snapshot, workers: states };
}
module.exports = { snapshotFailure, collectFailure };
