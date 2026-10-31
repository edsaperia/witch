// Offline attribution of an existing CDP CPU profile. Never launches a browser.
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join, basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { decode } from "@jridgewell/sourcemap-codec";
export function attributeCpu(profile, windows, describe = frame => ({ key: frame.functionName, frame })) {
  if (profile.samples.length !== profile.timeDeltas.length) throw Error("Incomplete CPU samples");
  const nodes = new Map(profile.nodes.map(n => [n.id, n])), parents = new Map();
  for (const n of profile.nodes) for (const child of n.children ?? []) parents.set(child, n.id);
  const descriptions = new Map(profile.nodes.map(n => [n.id, describe(n.callFrame)]));
  const groups = new Map(), ordered = [...windows].sort((a, b) => a.start - b.start);
  let time = profile.startTime, coveredUntil = time, negativeDeltas = 0;
  for (let i = 0; i < profile.samples.length; i++) {
    const delta = profile.timeDeltas[i]; if (!Number.isFinite(delta)) throw Error("Invalid CPU sample delta"); time += delta;
    if (delta <= 0) { negativeDeltas++; continue; }
    const start = Math.max(time - delta, coveredUntil); coveredUntil = Math.max(coveredUntil, time);
    let lo = 0, hi = ordered.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (ordered[mid].end <= start) lo = mid + 1; else hi = mid; }
    for (let j = lo; j < ordered.length && ordered[j].start < time; j++) {
      const w = ordered[j], ms = Math.max(0, Math.min(time, w.end) - Math.max(start, w.start)) / 1000;
      if (!ms) continue;
      const group = groups.get(w.group) ?? { sampledMs: 0, self: new Map(), inclusive: new Map(), houseChildren: new Map() };
      groups.set(w.group, group); group.sampledMs += ms;
      const stack = []; let id = profile.samples[i];
      while (nodes.has(id)) { stack.push(descriptions.get(id)); id = parents.get(id); }
      const leaf = stack[0];
      const add = (table, d) => { const row = table.get(d.key) ?? { ...d, ms: 0 }; row.ms += ms; table.set(d.key, row); };
      add(group.self, leaf);
      const seen = new Set(); for (const d of stack) if (!seen.has(d.key)) { seen.add(d.key); add(group.inclusive, d); }
      if (stack.some(d => d.source?.endsWith("src/render/houseRooms.ts") && d.snippet?.startsWith("update("))) add(group.houseChildren, leaf);
    }
  }
  const rows = table => [...table.values()].sort((a, b) => b.ms - a.ms);
  return { negativeDeltas, groups: Object.fromEntries([...groups].map(([name, g]) => [name, { sampledMs: g.sampledMs, self: rows(g.self), inclusive: rows(g.inclusive), houseChildren: rows(g.houseChildren) }])) };
}
export function sourceDescriber(assets) {
  const maps = new Map();
  return frame => {
    let file = ""; try { file = basename(new URL(frame.url).pathname); } catch { /* native/evaluate frame */ }
    if (file && !maps.has(file)) {
      const path = join(assets, file + ".map");
      if (!existsSync(path) && /^main-.*\.js$/.test(file)) throw Error(`Exact profile source map missing: ${file}`);
      maps.set(file, existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null);
      const map = maps.get(file); if (map) map.decoded = decode(map.mappings);
    }
    const map = maps.get(file), segments = map?.decoded[frame.lineNumber] ?? [];
    let lo = 0, hi = segments.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (segments[mid][0] <= frame.columnNumber) lo = mid + 1; else hi = mid; }
    const segment = segments[lo - 1];
    if (segment?.length >= 4) {
      const source = map.sources[segment[1]].replace(/^(\.\.\/)+/, ""), line = segment[2] + 1;
      map.lines ??= new Map(); if (!map.lines.has(segment[1])) map.lines.set(segment[1], map.sourcesContent?.[segment[1]]?.split(/\r?\n/));
      const snippet = map.lines.get(segment[1])?.[segment[2]]?.trim().slice(0, 180);
      return { key: `${source}:${line}:${segment[3]}:${frame.functionName}`, source, line, column: segment[3], name: frame.functionName, snippet };
    }
    return { key: `${file || "native/eval"}:${frame.lineNumber}:${frame.columnNumber}:${frame.functionName}`, name: frame.functionName, file, line: frame.lineNumber + 1 };
  };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [summaryPath, profilePath, assets, output, config = "as-built", repeat = "1"] = process.argv.slice(2);
  const summary = JSON.parse(readFileSync(summaryPath, "utf8")), profile = JSON.parse(readFileSync(profilePath, "utf8"));
  const run = summary.runs.find(r => r.config === config && r.repeat === Number(repeat)); if (!run) throw Error("Run not found");
  const windows = run.rows.map(r => ({ start: (r.start + run.gc.offset) * 1000, end: (r.start + r.wall + run.gc.offset) * 1000,
    group: r.section === 0 ? "seat-exit" : r.frame <= 12 ? "route1to12" : r.frame <= 30 ? "route13to30" : "routeAfter30" }));
  windows.unshift({ start: profile.startTime, end: windows[0].start, group: "boot-before-walk" });
  const result = { config, repeat: Number(repeat), sourceSha: run.sha, method: "CPU sample interval overlap in microseconds, reported ms. Self and inclusive are separate; never add them. Negative deltas keep clock alignment but add no weight; already-covered interval overlaps are skipped. Sampled wall attribution is not exact function duration or GPU time.", ...attributeCpu(profile, windows, sourceDescriber(assets)) };
  writeFileSync(output, JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify({ sourceSha: result.sourceSha, negativeDeltas: result.negativeDeltas, groups: Object.fromEntries(Object.entries(result.groups).map(([k,g])=>[k,{sampledMs:g.sampledMs,topSelf:g.self.slice(0,8),houseChildren:g.houseChildren.slice(0,8)}])) }, null, 2));
}
