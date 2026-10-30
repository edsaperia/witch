export function distribution(values) {
  const x = [...values].sort((a, b) => a - b);
  if (!x.length || x.some(v => !Number.isFinite(v))) throw Error("Missing or nonfinite frame timings");
  const m = Math.floor(x.length / 2);
  return { count: x.length, max: x.at(-1), p99: x[Math.max(0, Math.ceil(x.length * .99) - 1)], median: x.length % 2 ? x[m] : (x[m - 1] + x[m]) / 2 };
}
export function mergedIntervals(intervals) {
  const result = [];
  for (const [a, b] of intervals.filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b) && b > a).sort((a, b) => a[0] - b[0])) {
    const last = result.at(-1);
    if (last && a <= last[1]) last[1] = Math.max(last[1], b); else result.push([a, b]);
  }
  return result;
}
export const overlap = (intervals, start, end) => intervals.reduce((sum, [a, b]) => sum + Math.max(0, Math.min(end, b) - Math.max(start, a)), 0);
export function gcForWalk(events, anchor) {
  const mark = events.find(e => e.name === "house-profile-walk-start");
  if (!mark || !Number.isFinite(mark.ts) || !Number.isFinite(anchor)) throw Error("GC trace has no walk clock anchor");
  const gc = /(?:V8\.GC|MinorGC|MajorGC|Scavenge|MarkCompact|GarbageCollect)/i;
  const intervals = [], stack = [], offset = mark.ts / 1000 - anchor;
  for (const e of events.filter(e => e.pid === mark.pid && e.tid === mark.tid).sort((a, b) => a.ts - b.ts)) {
    if (e.ph === "B") stack.push(e);
    else if (e.ph === "E") { const begin = stack.pop(); if (begin && gc.test(begin.name)) intervals.push([begin.ts / 1000 - offset, e.ts / 1000 - offset]); }
    else if (e.ph === "X" && gc.test(e.name) && Number.isFinite(e.dur)) intervals.push([e.ts / 1000 - offset, (e.ts + e.dur) / 1000 - offset]);
  }
  return { intervals: mergedIntervals(intervals), rawIntervals: intervals.length, thread: { pid: mark.pid, tid: mark.tid }, offset };
}
export function frameRows(walk, columns, events) {
  if (!walk.got || !Array.isArray(walk.samples) || walk.samples.length % columns.length) throw Error("House route stopped short or lost samples");
  const gc = gcForWalk(events, walk.anchor), rows = [];
  for (let i = 0; i < walk.samples.length; i += columns.length) {
    const row = Object.fromEntries(columns.map((c, k) => [c, walk.samples[i + k]]));
    if (![row.start, row.wall, row.step, row.render, row.witch, row.witchStart, row.witchEnd].every(Number.isFinite)) throw Error("Missing measured frame phase");
    row.renderOther = Math.max(0, row.render - row.witch);
    row.outside = Math.max(0, row.wall - row.step - row.render);
    row.gcWall = overlap(gc.intervals, row.start, row.start + row.wall);
    row.gcWitch = overlap(gc.intervals, row.witchStart, row.witchEnd);
    rows.push(row);
  }
  return { rows, gc };
}
export function summarizeRuns(runs) {
  const frames = runs.flatMap(r => r.rows.filter(f => f.section === 1).map(f => ({ ...f, repeat: r.repeat })));
  const phases = Object.fromEntries(["wall", "step", "render", "witch", "renderOther", "outside", "gcWall", "gcWitch"].map(k => [k, distribution(frames.map(f => f[k]))]));
  return { runs: runs.length, phases, top5: [...frames].sort((a, b) => b.witch - a.witch).slice(0, 5), perRun: runs.map(r => ({ repeat: r.repeat, smokeRouteIterations: r.frames, sampledFramesIncludingSeat: r.rows.length, phases: Object.fromEntries(["step", "render", "witch", "gcWitch"].map(k => [k, distribution(r.rows.filter(f => f.section === 1).map(f => f[k]))])) })) };
}
export function markdown(result) {
  const lines = ["# Same-route house profile", "", `Complete: ${result.complete}. Cap: 14 minutes. Five fresh-browser runs per configuration. Profiling overhead is included; this is not an uninstrumented smoke replacement.`, "", "| configuration | runs | samples | witch max ms | p99 ms | median ms |", "|---|---:|---:|---:|---:|---:|"];
  for (const [name, group] of Object.entries(result.groups)) {
    const w = group.phases.witch;
    lines.push(`| ${name} | ${group.runs} | ${w.count} | ${w.max.toFixed(3)} | ${w.p99.toFixed(3)} | ${w.median.toFixed(3)} |`);
  }
  for (const [name, group] of Object.entries(result.groups)) {
    lines.push("", `## ${name}: five slowest witch frames`, "", "| run/frame | x,z | wall | step | render | witch | other render | GC in witch |", "|---|---|---:|---:|---:|---:|---:|---:|");
    for (const f of group.top5) lines.push(`| ${f.repeat}/${f.frame} | ${f.x.toFixed(2)},${f.z.toFixed(2)} | ${f.wall.toFixed(3)} | ${f.step.toFixed(3)} | ${f.render.toFixed(3)} | ${f.witch.toFixed(3)} | ${f.renderOther.toFixed(3)} | ${f.gcWitch.toFixed(3)} |`);
  }
  lines.push("", "Inclusive wall/render/witch phases are separate, never added. Quantiles use actual route frame calls; the smoke's iteration count also includes waypoint transitions. Seat-exit samples are retained separately. GC overlaps are merged on the renderer main thread and are not added to CPU phases. Unmeasured optional phases are null in JSON. Full phase splits, all samples, raw CPU profiles and GC traces accompany this summary.");
  if (result.error) lines.push("", `Error: ${result.error}`);
  return lines.join("\n") + "\n";
}
