// Pure checks for tools/view/sail-timing.cjs and saved sail traces. Times are milliseconds from the sail request.
const DEFAULTS = { task: 1000, frame: 1000, slice: 100, settle: 2000 };
const finite = x => typeof x === 'number' && Number.isFinite(x);
function checkTravel(run, limits = {}) {
  const L = { ...DEFAULTS, ...limits }, failures = [], m = run.marks || {};
  for (const k of ['task','frame','slice','settle']) if (!finite(L[k]) || L[k] < 0 || (k !== 'settle' && L[k] === 0)) failures.push(`invalid ${k} limit`);
  if (!finite(m['game:arrived'])) failures.push('arrival was not recorded');
  if (run.route !== 'api') {
    if (!finite(m['chart:ready']) || !finite(m['chart:flown'])) failures.push('chart readiness/handoff was not recorded');
    else if (m['chart:flown'] < m['chart:ready']) failures.push(`chart handed over ${m['chart:ready'] - m['chart:flown']} ms before readiness`);
    if (!(run.slices || []).some(s => s.what === 'handoff-heights')) failures.push('handoff terrain slices were not recorded');
  }
  for (const task of run.longTasks || run.tasks || []) if (task.ms > L.task) failures.push(`task ${task.ms} ms exceeds ${L.task} ms at ${task.at} (${task.after || 'unattributed'})`);
  for (const s of run.slices || []) if (s.longest > L.slice) failures.push(`slice ${s.what}/${s.at || ''}: ${s.longest} ms exceeds ${L.slice} ms`);
  for (const phase of ['chartFrames', 'toDive', 'diveToEnd', 'settle']) if (run[phase]?.longest > L.frame) failures.push(`${phase} frame ${run[phase].longest} ms exceeds ${L.frame} ms`);
  const end = m['game:arrived'];
  const quality = run.quality || [];
  if (!run.qualityBefore || run.qualityBefore.mode !== 'auto' || !quality.length || quality.some(q => q.mode !== 'auto')) failures.push('automatic quality was not observed; use ladder=auto');
  else if (finite(end)) {
    if (!quality.some(q => q.at >= end + L.settle)) failures.push(`quality observation ends before the ${L.settle} ms arrival grace period`);
    const worse = quality.find(q => q.at >= (run.observationStart ?? 0) && q.at <= end + L.settle && q.rung > run.qualityBefore.rung);
    if (worse) failures.push(`quality fell from rung ${run.qualityBefore.rung} to ${worse.rung} during travel/grace at ${worse.at} ms`);
  }
  if (run.trace?.dropped) failures.push(`trace omitted ${run.trace.dropped} events`);
  return { ok: failures.length === 0, limits: L, failures };
}

/** Elapsed waits are separated from callback/upload wall time; parallel worker times are never called critical-path time. */
function summarizeTravel(run) {
  const m = run.marks || {}, span = (a,b) => finite(m[a]) && finite(m[b]) ? m[b] - m[a] : null;
  const events = run.trace?.events || [], groups = {};
  for (const e of events) {
    const key = `${e.kind}:${e.worker || e.method || ''}`, g = groups[key] ||= { count: 0, wallMs: 0, longestMs: 0, workerReportedMs: 0, workerReports: 0, receivedBytesEstimate: 0, cached: 0 };
    g.count++; g.wallMs += e.ms || 0; g.longestMs = Math.max(g.longestMs, e.ms || 0); g.receivedBytesEstimate += e.receivedBytes || 0;
    if (finite(e.workerMs)) { g.workerReports++; g.workerReportedMs += e.workerMs; } g.cached += e.cached ? 1 : 0;
  }
  const detail = name => [...(run.timeline || [])].reverse().find(e => e.name === name)?.detail ?? null;
  return { preparationToGame: span('witch:prep','witch:game'), mapPrep: detail('witch:map-prep-source'), hydration: detail('witch:map-hydrated'), shaderReadinessWait: span('witch:prep-compile0','witch:prep-compiled'), programPreparation: span('witch:prep-compiled','witch:prep-programs'), handoffAfterReady: span('chart:ready','chart:flown'), arrival: m['game:arrived'] ?? null, events: groups };
}
function checkTrace(data) {
  const runs = (data.runs || [data]).map(run => ({ island: run.island, key: run.key, budget: checkTravel(run, run.budget?.limits), summary: summarizeTravel(run) }));
  return { ok: !data.error && runs.length > 0 && runs.every(r => r.budget.ok), error: data.error || null, runs };
}
module.exports = { DEFAULTS, checkTravel, checkTrace, summarizeTravel };
if (require.main === module) {
  const fs = require('node:fs'), [file] = process.argv.slice(2);
  if (!file) { console.error('node tools/bench/travel-budget.cjs <sail-timing.json>'); process.exit(2); }
  const data = JSON.parse(fs.readFileSync(file));
  const result = checkTrace(data);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}
