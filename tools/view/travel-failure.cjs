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
  let timer;
  try {
    const snapshot = await Promise.race([
      page.evaluate(snapshotFailure),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('failure snapshot timed out')), timeout); }),
    ]);
    return { ...context, ...snapshot };
  } catch (e) { return { ...context, diagnosticError: String(e) }; }
  finally { clearTimeout(timer); }
}
module.exports = { snapshotFailure, collectFailure };
