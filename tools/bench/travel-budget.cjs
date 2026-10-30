// Pure checks for tools/view/sail-timing.cjs and saved sail traces. Times are milliseconds from the sail request.
const DEFAULTS = { task: 1000, frame: 1000, slice: 100, settle: 2000 };
const { summarizeWorkerJobs } = require('./worker-job-summary.cjs');
const finite = x => typeof x === 'number' && Number.isFinite(x);
function checkTravel(run, limits = {}) {
  const L = { ...DEFAULTS, ...limits }, failures = [], m = run.marks || {};
  const tasks = Array.isArray(run.longTasks) ? run.longTasks : null;
  const slices = Array.isArray(run.slices) ? run.slices : null;
  const phases = run.route === 'api' ? ['toDive','diveToEnd','settle'] : ['chartFrames','toDive','diveToEnd','settle'];
  if (run.route !== undefined && !['api','chart'].includes(run.route)) failures.push('unsupported travel route');
  for (const k of ['task','frame','slice','settle']) if (!finite(L[k]) || L[k] < 0 || (k !== 'settle' && L[k] === 0)) failures.push(`invalid ${k} limit`);
  if (!tasks || (!tasks.length && run.coverage?.longTasks !== true)) failures.push('long-task coverage is missing or unsupported');
  if (!slices?.length) failures.push('sliced-build measurements are missing');
  for (const phase of phases) {
    const p = run[phase];
    if (!p || !Number.isInteger(p.frames) || p.frames <= 0 || !finite(p.longest) || p.longest < 0) failures.push(`${phase} frame measurements are missing or invalid`);
  }
  if (!finite(m['game:arrived']) || m['game:arrived'] < 0) failures.push('arrival was not recorded');
  if (run.route !== 'api') {
    if (!finite(m['chart:ready']) || m['chart:ready'] < 0 || !finite(m['chart:flown']) || m['chart:flown'] < 0) failures.push('chart readiness/handoff was not recorded');
    else if (m['chart:flown'] < m['chart:ready']) failures.push(`chart handed over ${m['chart:ready'] - m['chart:flown']} ms before readiness`);
    if (!(slices || []).some(s => s.what === 'handoff-heights')) failures.push('handoff terrain slices were not recorded');
  }
  for (const task of tasks || []) {
    if (!task || !finite(task.at) || !finite(task.ms) || task.ms < 0) failures.push('invalid long-task measurement');
    else if (task.ms > L.task) failures.push(`task ${task.ms} ms exceeds ${L.task} ms at ${task.at} (${task.after || 'unattributed'})`);
  }
  for (const s of slices || []) {
    if (!s || typeof s.what !== 'string' || !finite(s.ms) || s.ms < 0 || !Number.isInteger(s.slices) || s.slices <= 0 || !finite(s.longest) || s.longest < 0) failures.push('invalid sliced-build measurement');
    else if (s.longest > L.slice) failures.push(`slice ${s.what}/${s.at || ''}: ${s.longest} ms exceeds ${L.slice} ms`);
  }
  for (const phase of phases) if (run[phase]?.longest > L.frame) failures.push(`${phase} frame ${run[phase].longest} ms exceeds ${L.frame} ms`);
  const end = m['game:arrived'];
  const quality = Array.isArray(run.quality) ? run.quality : [];
  const rung = r => Number.isInteger(r) && r >= 0;
  if (!run.qualityBefore || !rung(run.qualityBefore.rung) || run.qualityBefore.mode !== 'auto' || !quality.length || quality.some(q => !q || !finite(q.at) || !rung(q.rung) || q.mode !== 'auto')) failures.push('automatic quality was not observed or is invalid; use ladder=auto');
  else if (finite(end)) {
    if (!quality.some(q => q.at >= (run.observationStart ?? 0) && q.at <= end)) failures.push('quality was not sampled during travel');
    if (!quality.some(q => q.at >= end + L.settle)) failures.push(`quality observation ends before the ${L.settle} ms arrival grace period`);
    const worse = quality.find(q => q.at >= (run.observationStart ?? 0) && q.at <= end + L.settle && q.rung > run.qualityBefore.rung);
    if (worse) failures.push(`quality fell from rung ${run.qualityBefore.rung} to ${worse.rung} during travel/grace at ${worse.at} ms`);
  }
  if (run.trace?.dropped) failures.push(`trace omitted ${run.trace.dropped} events`);
  if (run.key?.knobs?.['tool.probe'] === 'worker-jobs-v1' && (run.trace?.capabilities?.workerJobs !== 1 || ![...(run.trace?.events || []), ...(run.trace?.activeJobs || [])].some(e => e?.kind === 'worker-job' && e.jobId))) failures.push('worker-job timing protocol was not observed');
  if (run.trace?.uploads !== undefined) {
    if (!Array.isArray(run.trace.uploads)) failures.push('upload aggregates are invalid');
    else for (const g of run.trace.uploads) {
      if (!g || typeof g.method !== 'string' || !Number.isInteger(g.count) || g.count <= 0 || !finite(g.wallMs) || !finite(g.longestMs) || g.longestMs < 0 || g.wallMs < g.longestMs || !finite(g.firstAt) || !finite(g.lastAt) || !finite(g.longestAt) || g.firstAt > g.longestAt || g.longestAt > g.lastAt || !Number.isInteger(g.errors) || g.errors < 0 || g.errors > g.count) failures.push('upload aggregate measurement is invalid');
    }
  }
  return { ok: failures.length === 0, limits: L, failures };
}

/** Elapsed waits are separated from callback/upload wall time; parallel worker times are never called critical-path time. */
function summarizeTravel(run) {
  const m = run.marks || {}, span = (a,b) => finite(m[a]) && finite(m[b]) ? m[b] - m[a] : null;
  const events = run.trace?.events || [], groups = {};
  for (const e of events) {
    if (e.kind === 'worker-job') continue; // stage/queue spans have their own table, not callback CPU totals
    const key = `${e.kind}:${e.worker || e.method || ''}`, g = groups[key] ||= { count: 0, wallMs: 0, longestMs: 0, workerReportedMs: 0, workerReports: 0, receivedBytesEstimate: 0, cached: 0 };
    g.count++; g.wallMs += e.ms || 0; g.longestMs = Math.max(g.longestMs, e.ms || 0); g.receivedBytesEstimate += e.receivedBytes || 0;
    if (finite(e.workerMs)) { g.workerReports++; g.workerReportedMs += e.workerMs; } g.cached += e.cached ? 1 : 0;
  }
  for (const e of Array.isArray(run.trace?.uploads) ? run.trace.uploads : []) {
    if (!e) continue;
    const key = `upload-call:${e.method}`, g = groups[key] ||= { count: 0, wallMs: 0, longestMs: 0, workerReportedMs: 0, workerReports: 0, receivedBytesEstimate: 0, cached: 0 };
    g.count += e.count; g.wallMs += e.wallMs; g.longestMs = Math.max(g.longestMs, e.longestMs);
  }
  const detail = name => [...(run.timeline || [])].reverse().find(e => e.name === name)?.detail ?? null;
  return { preparationToGame: span('witch:prep','witch:game'), mapPrep: detail('witch:map-prep-source'), hydration: detail('witch:map-hydrated'), shaderReadinessWait: span('witch:prep-compile0','witch:prep-compiled'), programPreparation: span('witch:prep-compiled','witch:prep-programs'), handoffAfterReady: span('chart:ready','chart:flown'), arrival: m['game:arrived'] ?? null, events: groups, workerJobs: summarizeWorkerJobs(run.trace) };
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
