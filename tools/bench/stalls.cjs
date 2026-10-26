// The stall hunt at a spot (the coordinator, 2026-10-13, from Ed's overlay on v3492: seed 2267, Old pinewood, treetop mode at
// 2673, 2484, zoom 3, 56 s into wave 0: 24 stalls over 100 ms, 18% of frames over 20 ms, the last an 85 ms FrameRequestCallback
// with step 0.6 and draw 3: the time was in work the frame doesn't time). Serves a build (DIST, best unminified: npx vite build
// --minify false --outDir dist-prof, so the functions have names), loads it on the seed, puts her at the spot in the treetops at
// the zoom, and lets the game's own loop run free (hud, playtest, audio and all, as Ed's did) for SECONDS of wall time under
// Chromium's sampling CPU profiler. Then says where the JavaScript's time went: self time by function (url:line), inclusive
// time of the subsystems (the rules' step, the view's render, the scenery rebuild, the art results arriving, the hud's overlay,
// the sound, the garbage collector), the browser's long animation frames (their scripts), and the long runs of JavaScript
// (RUN_MS or more without idling): what a stall is made of. In the cloud the draws go to a software GL in the GPU process and
// the main thread waits on them (that shows as "(program)"), so judge the JavaScript, not the frame times. Writes
// <out>/stalls.cpuprofile and <out>/stalls.json. Playwright comes from the machine's global install.
// NODRAW=1 (the default) makes the renderer's draw a no-op, so the loop runs at the display's 60 Hz as on Ed's machine and a
// wall second is a game second (the draw's own JavaScript, a few ms a frame on his machine, is measured by hitch.cjs instead);
// NODRAW=0 draws, at a frame a second in the cloud.
// HEAP=1 also records Chromium's sampling heap profiler over the same run (every allocation by function, sampled every
// HEAP_EVERY bytes) and reports the top allocators: KB a frame (over the game seconds at 60 Hz) and their share, with url:line,
// self (the function that made the object) and by named chain (<out>/stalls.heapprofile): the churn behind the collector's time.
// HEAP=live counts only what is still alive at the end (the allocations the collector couldn't free): the heap's growth, by
// function. Either way the heap is sampled every quarter second (heapCurve: seconds, MB) and its floors (the least seen in each
// 5 s: what's live, under the garbage) reported first to last.
//   node tools/bench/stalls.cjs [out dir]   DIST=dist-prof SEED=2267 X=2673 Z=2484 ZOOM=3 SECONDS=60 SIZE=640x360 WARM=8 RUN_MS=50 NODRAW=1 HEAP=0 HEAP_EVERY=4096
const http = require("http");
const { pageKey } = require("./comparable.cjs"); // (the result's comparability key: tools/bench/comparable.cjs)
let KEY = null;
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist-prof"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const SEED = env("SEED", "2267"), X = Number(env("X", 2673)), Z = Number(env("Z", 2484)), ZOOM = Number(env("ZOOM", 3));
const MODE = env("MODE", "treetop"), WAVES = Number(env("WAVES", 0)); // (MODE=ground: on foot at the spot; WAVES=N: N waves brought on first, as N does)
// LAND=1 (Ed, 2026-10-14: "profile a wave landing"): the next wave brought on LAND_AT seconds into the profile, and the seconds
// round it accounted for second by second: the page's own work by kind, the art sets the workers sent (and their time), the
// textures uploaded, the sound's own work, the music's continuity and the audio clock (outputMeter.ts ClockWatch).
const LAND = env("LAND", "0") !== "0", LAND_AT = Number(env("LAND_AT", 8));
const SECONDS = Number(env("SECONDS", 60)), WARM = Number(env("WARM", 8)), RUN_MS = Number(env("RUN_MS", 50));
const [W, H] = env("SIZE", "640x360").split("x").map(Number), NODRAW = env("NODRAW", "1") !== "0";
const HEAP = env("HEAP", "0") !== "0", HEAP_LIVE = env("HEAP", "0") === "live", HEAP_EVERY = Number(env("HEAP_EVERY", 4096));
const SNAP = env("SNAP", "0") !== "0"; // (a heap snapshot at the start and the end: <out>/start.heapsnapshot, end.heapsnapshot; tools/bench/heapdiff.cjs says what grew)
/** A heap snapshot written to `file` (its chunks as the profiler sends them). */
async function snapshot(cdp, file) {
  const chunks = [], on = e => chunks.push(e.chunk);
  cdp.on("HeapProfiler.addHeapSnapshotChunk", on);
  await cdp.send("HeapProfiler.collectGarbage");
  await cdp.send("HeapProfiler.takeHeapSnapshot", { reportProgress: false, captureNumericValue: false });
  cdp.off("HeapProfiler.addHeapSnapshotChunk", on);
  fs.writeFileSync(file, chunks.join(""));
}
const COUNT = env("COUNT", "0") !== "0"; // (count the live objects by kind at the start and the end, and collect the garbage at the end: what the heap's growth is made of)
const KINDS = ["Object", "Array", "Function", "Map", "Set", "Float32Array", "Float64Array", "Int32Array", "Uint16Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "ImageData", "Promise", "String"];
/** How many objects of each kind are alive now (Runtime.queryObjects on the kind's prototype), after a full collection. */
async function countKinds(cdp) {
  await cdp.send("HeapProfiler.collectGarbage");
  const out = {};
  for (const k of KINDS) {
    const { result: proto } = await cdp.send("Runtime.evaluate", { expression: `${k}.prototype` });
    const { objects } = await cdp.send("Runtime.queryObjects", { prototypeObjectId: proto.objectId });
    const { result: n } = await cdp.send("Runtime.callFunctionOn", { objectId: objects.objectId, functionDeclaration: "function () { return this.length; }", returnByValue: true });
    out[k] = n.value;
    await cdp.send("Runtime.releaseObject", { objectId: objects.objectId }); await cdp.send("Runtime.releaseObject", { objectId: proto.objectId });
  }
  const { usedSize } = await cdp.send("Runtime.getHeapUsage");
  out.heapMb = Math.round(usedSize / 1e6);
  return out;
}
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const { server, port } = await serve();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required", "--enable-precise-memory-info"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const stalls = [], errors = [];
  page.on("console", m => { const t = m.text(); if (t.startsWith("stall:")) stalls.push(t); if (m.type() === "error") errors.push(t); });
  page.on("pageerror", e => errors.push(String(e)));
  const t0 = Date.now(), lap = what => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s] ${what}`);
  await page.goto(`http://127.0.0.1:${port}/?seed=${SEED}&creator=0&spell=auto`);
  await page.waitForFunction(() => window.witch?.ready, null, { timeout: 180000 });
  KEY ??= await pageKey(page, { spot: `stalls.cjs at ${X},${Z} zoom ${ZOOM}` });
  lap("ready");
  // (NODRAW: the draw a no-op, but any texture not yet on the GPU is still uploaded, as the first draw that used it would: the
  // atlases let their pixels go once uploaded (render/atlas.ts), and the upload is the page's own work too)
  if (NODRAW) await page.evaluate(() => { const r = window.witch.view.renderer; r.render = scene => { scene.traverse(o => { const u = o.material && o.material.uniforms; if (!u) return; for (const k in u) { const v = u[k].value; if (v && v.isTexture && v.image && v.image.data && v.version > 0 && !v.__up) { v.__up = v.version; r.initTexture(v); } } }); }; });
  // The long animation frames (Chrome 123+): their length and the scripts that took the most.
  await page.evaluate(() => {
    window.__loaf = [];
    try { new PerformanceObserver(list => { for (const e of list.getEntries()) window.__loaf.push({ ms: Math.round(e.duration), at: Math.round(e.startTime), scripts: (e.scripts ?? []).slice().sort((a, b) => b.duration - a.duration).slice(0, 3).map(s => `${Math.round(s.duration)} ms ${s.invoker ?? ""} ${s.sourceFunctionName || "?"} ${(s.sourceURL ?? "").split("/").pop()}:${s.sourceCharPosition ?? ""}`) }); }).observe({ type: "long-animation-frame", buffered: false }); } catch {}
  });
  // Off the decks and to the spot, in the treetops, at the zoom.
  await page.keyboard.press("Space"); await wait(800);
  await page.evaluate(({ X, Z, ZOOM }) => { const g = window.witch.game, w = g.witch; w.x = X; w.z = Z; w.vx = w.vz = 0; g.camera.zoomStep = ZOOM; }, { X, Z, ZOOM });
  // Up into the treetops: Space only while she's on the ground (pressed again mid-rise it brings her back down), then wait.
  if (MODE === "treetop") for (let i = 0; i < 40; i++) { const mode = await page.evaluate(() => window.witch.game.witch.mode); if (mode === "treetop") break; if (mode === "ground") await page.keyboard.press("Space"); await wait(500); }
  for (let i = 0; i < WAVES; i++) { await page.keyboard.press("KeyN"); await wait(400); }
  const where = await page.evaluate(() => { const g = window.witch.game, w = g.witch, a = g.map.areaAt(w.x, w.z); return { mode: w.mode, x: Math.round(w.x), z: Math.round(w.z), area: g.map.typeOf ? a.type : a.type, zoom: g.camera.zoomStep, wave: g.party.wave, t: Math.round(g.clock.time) }; });
  lap(`at the spot: ${JSON.stringify(where)}; settling ${WARM} s`);
  await wait(WARM * 1000);
  stalls.length = 0;
  // The frames themselves: the gap between one animation frame and the next, from a requestAnimationFrame loop of the
  // probe's own beside the game's (over 20 ms a dropped frame at 60 Hz, over 50 and 100 ms a hitch).
  await page.evaluate(() => { window.__loaf.length = 0; window.__gaps = []; let last = performance.now(); const tick = t => { window.__gaps.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 500 }); await cdp.send("Profiler.start");
  if (HEAP) { await cdp.send("HeapProfiler.enable"); await cdp.send("HeapProfiler.startSampling", { samplingInterval: HEAP_EVERY, includeObjectsCollectedByMajorGC: !HEAP_LIVE, includeObjectsCollectedByMinorGC: !HEAP_LIVE }); }
  await page.evaluate(() => { window.__heap = []; const t0 = performance.now(); window.__heapTimer = setInterval(() => window.__heap.push([Math.round(performance.now() - t0) / 1000, Math.round((performance.memory?.usedJSHeapSize ?? 0) / 1e5) / 10]), 250); });
  if (SNAP) { await cdp.send("HeapProfiler.enable"); await snapshot(cdp, path.join(out, "start.heapsnapshot")); lap("snapshot at the start"); }
  const counts0 = COUNT ? await countKinds(cdp) : null;
  const heap0 = await page.evaluate(() => performance.memory?.usedJSHeapSize ?? 0), tg0 = await page.evaluate(() => window.witch.game.clock.time);
  lap(`profiling ${SECONDS} s`);
  if (LAND) {
    await page.evaluate(() => {
      const v = window.witch.view, A = window.witch.audio, cw = A.meter?.clockWatch, ms = () => A.music?.stats ?? {};
      window.__land = { t0: performance.now(), at: null, rows: [], art0: v.assets.timings.length };
      window.__landTimer = setInterval(() => {
        const m = ms(), r = v.renderer.info.memory;
        window.__land.rows.push({ t: performance.now(), pending: v.assets.pending, queue: v.assets.queue?.length ?? -1, busy: (v.assets.workers ?? []).filter(w => w.busy).length, textures: r.textures, audioMs: v.ms?.audio ?? 0,
          slow: cw?.slow ?? null, fast: cw?.fast ?? null, drift: cw?.drift ?? null, underruns: cw?.underruns ?? null, resyncs: m.resyncs ?? null, gap: m.gap ?? null, late: m.late ?? null, ahead: m.ahead ?? null, game: window.witch.game.clock.time, wave: window.witch.game.party.wave });
      }, 250);
    });
    await wait(LAND_AT * 1000);
    await page.evaluate(() => { window.__land.at = performance.now(); });
    await page.keyboard.press("KeyN");
    lap(`N pressed (the wave lands)`);
    await wait((SECONDS - LAND_AT) * 1000);
  } else await wait(SECONDS * 1000);
  const { profile } = await cdp.send("Profiler.stop");
  const heapProfile = HEAP ? (await cdp.send("HeapProfiler.stopSampling")).profile : null;
  const tg1 = await page.evaluate(() => window.witch.game.clock.time), heap1 = await page.evaluate(() => performance.memory?.usedJSHeapSize ?? 0);
  const counts1 = COUNT ? await countKinds(cdp) : null; // (after a full collection: what grew is kept, not garbage)
  if (SNAP) { await snapshot(cdp, path.join(out, "end.heapsnapshot")); lap("snapshot at the end"); }
  const gaps = await page.evaluate(() => { const g = window.__gaps.slice(1); window.__gaps = []; return g; });
  const heapCurve = await page.evaluate(() => { clearInterval(window.__heapTimer); return window.__heap; });
  const heapFloors = []; for (let w = 0; w * 5 < SECONDS; w++) { const inWin = heapCurve.filter(([t]) => t >= w * 5 && t < (w + 1) * 5).map(([, mb]) => mb); if (inWin.length) heapFloors.push(Math.min(...inWin)); }
  const loaf = await page.evaluate(() => window.__loaf), overlay = await page.evaluate(() => { const g = window.witch.game, v = window.witch.view; return { creatures: g.creatures.length, stats: v.stats ? { trees: v.stats.trees, bushes: v.stats.bushes, draws: v.stats.draws ?? v.stats.calls } : null }; });
  lap(`done: ${(tg1 - tg0).toFixed(1)} s of game time; ${stalls.length} stalls logged by the game; ${loaf.length} long animation frames`);
  fs.writeFileSync(path.join(out, "stalls.cpuprofile"), JSON.stringify(profile));
  if (LAND) {
    const L = await page.evaluate(() => { clearInterval(window.__landTimer); const v = window.witch.view; return { ...window.__land, art: v.assets.timings.slice(window.__land.art0), wave: window.witch.game.party.wave }; });
    // the profile's samples by second from the landing: the page's work by kind (script, program, gc; idle left out)
    const nodes = new Map(profile.nodes.map(n => [n.id, n])), kindOf = n => { const f = n.callFrame.functionName; return f === "(idle)" ? "idle" : f === "(garbage collector)" ? "gc" : f === "(program)" ? "program" : "script"; };
    // (the profile's clock is its own: its startTime is when Profiler.start answered, about when the sampler began; the landing is LAND_AT s in)
    const secs = new Map(); let t = profile.startTime; const land = profile.startTime + (L.at - L.t0) * 1000;
    for (let i = 0; i < profile.samples.length; i++) { t += profile.timeDeltas[i] ?? 0; const k = Math.floor((t - land) / 1e6); const b = secs.get(k) ?? (secs.set(k, { script: 0, program: 0, gc: 0, idle: 0 }), secs.get(k)); b[kindOf(nodes.get(profile.samples[i]))] += (profile.timeDeltas[i] ?? 0) / 1000; }
    const rowsBy = k => L.rows.filter(r => Math.floor((r.t - L.at) / 1000) === k), artBy = k => L.art.filter(a => Math.floor((a.at - L.at) / 1000) === k), loafBy = k => loaf.filter(e => Math.floor((e.at - (L.at - performance.timeOrigin)) / 1000) === k);
    const lines = [`the landing: wave ${L.wave} brought on at ${LAND_AT} s; second by second from it (page ms: script / program / gc; art sets in: n, worker ms, cached; textures +; audio: the sound's own ms a frame, resyncs +, under-runs +, drift ms; long frames ms):`];
    let lastRow = null;
    const ks = [...new Set([...secs.keys(), ...L.rows.map(r => Math.floor((r.t - L.at) / 1000))])].filter(k => k >= -LAND_AT && k <= SECONDS - LAND_AT).sort((a, b) => a - b);
    for (const k of ks) {
      const b = secs.get(k) ?? { script: 0, program: 0, gc: 0 }, rows = rowsBy(k), last = rows[rows.length - 1] ?? lastRow, first = lastRow ?? rows[0], art = artBy(k), lf = loafBy(k);
      const d = (key) => (last && first && last[key] != null && first[key] != null ? last[key] - first[key] : 0);
      lines.push(`  ${String(k).padStart(4)} s  page ${Math.round(b.script).toString().padStart(4)} / ${Math.round(b.program).toString().padStart(3)} / ${Math.round(b.gc).toString().padStart(3)} ms  art ${art.length} sets ${Math.round(art.reduce((a, x) => a + x.ms, 0))} ms ${art.filter(a => a.cached).length} cached, pending ${last?.pending ?? "?"}, busy ${last?.busy ?? "?"}  tex +${d("textures")}  audio ${last ? last.audioMs.toFixed(1) : "?"} ms, resyncs +${d("resyncs")}, under-runs +${d("underruns")}, drift ${last?.drift ?? "?"}  long frames ${lf.reduce((a, e) => a + e.ms, 0)} ms (${lf.length})`);
      if (rows.length) lastRow = rows[rows.length - 1];
    }
    lines.push(`  art sets in the window: ${L.art.map(a => `${a.set} ${Math.round(a.ms)} ms${a.cached ? " (cached)" : ""} @${((a.at - L.at) / 1000).toFixed(1)} s`).join("; ") || "none"}`);
    console.log(lines.join("\n"));
    fs.writeFileSync(path.join(out, "landing.json"), JSON.stringify(L, null, 1));
  }
  if (heapProfile) fs.writeFileSync(path.join(out, "stalls.heapprofile"), JSON.stringify(heapProfile));
  // The profile, read: self time a function, inclusive time a subsystem, runs of JavaScript.
  const nodes = new Map(profile.nodes.map(n => [n.id, n])), parent = new Map();
  for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
  const key = n => `${n.callFrame.functionName || "(anonymous)"} ${(n.callFrame.url || "").split("/").pop()}:${n.callFrame.lineNumber + 1}`;
  const self = new Map(), incl = new Map(), total = profile.endTime - profile.startTime;
  const SYSTEMS = ["stepGame", "render", "refresh", "rebuild", "receive", "overlay", "update", "sound", "castShadow", "prefetchWave", "frame", "onmessage", "(garbage collector)", "(program)", "(idle)"];
  // A sample's chain: the named functions from the root down (no anonymous ones), at most CHAIN deep, as "a>b>c".
  const CHAIN = 7, chainOf = n => { const names = []; let p = n.id; while (p !== undefined) { const q = nodes.get(p); if (q) { const f = q.callFrame.functionName; if (f && f !== "(root)" && !f.startsWith("(anonymous")) names.push(f); } p = parent.get(p); } return names.reverse().slice(0, CHAIN).join(">") || key(n); };
  const chains = new Map();
  let idle = 0, gc = 0, program = 0;
  const runs = []; let run = null;
  for (let i = 0; i < profile.samples.length; i++) {
    const dt = (profile.timeDeltas[i] ?? 0) / 1000, n = nodes.get(profile.samples[i]);
    if (!n) continue;
    const name = n.callFrame.functionName;
    self.set(key(n), (self.get(key(n)) ?? 0) + dt);
    if (name !== "(idle)") { const ch = chainOf(n); chains.set(ch, (chains.get(ch) ?? 0) + dt); }
    const stack = new Set(); let p = n.id; while (p !== undefined) { const q = nodes.get(p); if (q) stack.add(q.callFrame.functionName); p = parent.get(p); }
    for (const s of SYSTEMS) if (stack.has(s)) incl.set(s, (incl.get(s) ?? 0) + dt);
    if (name === "(idle)") { idle += dt; if (run && run.ms >= RUN_MS) runs.push(run); run = null; continue; }
    if (name === "(garbage collector)") gc += dt; if (name === "(program)") program += dt;
    if (!run) run = { ms: 0, top: new Map() };
    run.ms += dt; const top = chainOf(n); run.top.set(top, (run.top.get(top) ?? 0) + dt);
  }
  if (run && run.ms >= RUN_MS) runs.push(run);
  const top = [...self].sort((a, b) => b[1] - a[1]).slice(0, 40);
  const sorted = gaps.slice().sort((a, b) => a - b), pct = q => Math.round(sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))] ?? 0);
  const frames = { n: gaps.length, over20: gaps.filter(g => g >= 20).length, over50: gaps.filter(g => g >= 50).length, over100: gaps.filter(g => g >= 100).length, p50: pct(0.5), p99: pct(0.99), worst: Math.round(sorted[sorted.length - 1] ?? 0) };
  const report = {
    spot: where, seconds: SECONDS, gameSeconds: Math.round((tg1 - tg0) * 10) / 10, totalMs: Math.round(total / 1000), idleMs: Math.round(idle), gcMs: Math.round(gc), programMs: Math.round(program), frames,
    heapMb: [Math.round(heap0 / 1e6), Math.round(heap1 / 1e6)], heapFloors, heapCurve, counts: counts0 && counts1 ? { before: counts0, after: counts1 } : undefined, overlay, errors: errors.slice(0, 10), stalls: stalls.slice(0, 30), loaf: loaf.slice(0, 40),
    systems: Object.fromEntries([...incl].map(([k, v]) => [k, Math.round(v)])), selfTop: top.map(([k, v]) => [k, Math.round(v)]),
    chainsTop: [...chains].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => [k, Math.round(v)]),
    runs: runs.sort((a, b) => b.ms - a.ms).slice(0, 25).map(r => ({ ms: Math.round(r.ms), made: [...r.top].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ${Math.round(v)}`) })),
  };
  // The allocations (HEAP=1): self bytes by function, and by named chain, over the game's frames.
  if (heapProfile) {
    const frames = Math.max(1, (tg1 - tg0) * 60), bySelf = new Map(), byChain = new Map(); let bytes = 0;
    const walk = (n, chain) => {
      const f = n.callFrame, name = f.functionName || "(anonymous)", k = `${name} ${(f.url || "").split("/").pop()}:${f.lineNumber + 1}`;
      const named = name !== "(root)" && !name.startsWith("(anonymous") ? [...chain, name].slice(-CHAIN) : chain;
      bySelf.set(k, (bySelf.get(k) ?? 0) + n.selfSize); bytes += n.selfSize;
      if (n.selfSize) { const c = named.join(">") || k; byChain.set(c, (byChain.get(c) ?? 0) + n.selfSize); }
      for (const ch of n.children ?? []) walk(ch, named);
    };
    walk(heapProfile.head, []);
    const kbf = v => Math.round((v / frames / 1024) * 100) / 100;
    report.alloc = { kbPerFrame: kbf(bytes), frames: Math.round(frames), every: HEAP_EVERY,
      selfTop: [...bySelf].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => [k, kbf(v), Math.round((1000 * v) / bytes) / 10]),
      chainsTop: [...byChain].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => [k, kbf(v), Math.round((1000 * v) / bytes) / 10]) };
  }
  fs.writeFileSync(path.join(out, "stalls.json"), JSON.stringify({ key: KEY, ...report }, null, 1));
  console.log(`profile ${report.totalMs} ms: idle ${report.idleMs}, program ${report.programMs}, gc ${report.gcMs}; heap ${report.heapMb.join(" -> ")} MB`);
  console.log(`heap floors (MB, the least seen each 5 s): ${heapFloors.join(" ")}`);
  if (counts0 && counts1) { console.log(`live objects after a full collection, start -> end (heap ${counts0.heapMb} -> ${counts1.heapMb} MB):`); for (const k of Object.keys(counts1)) if (k !== "heapMb") console.log(`  ${k.padEnd(18)} ${String(counts0[k]).padStart(9)} -> ${String(counts1[k]).padStart(9)}  (${counts1[k] - counts0[k] >= 0 ? "+" : ""}${counts1[k] - counts0[k]})`); }
  console.log(`frames: ${frames.n}, over 20 ms ${frames.over20} (${Math.round((100 * frames.over20) / Math.max(1, frames.n))}%), over 50 ms ${frames.over50}, over 100 ms ${frames.over100}; p50 ${frames.p50} ms, p99 ${frames.p99} ms, worst ${frames.worst} ms`);
  console.log("by subsystem (inclusive ms):", report.systems);
  console.log("self time, top 25:"); for (const [k, v] of top.slice(0, 25)) console.log(`  ${String(v).padStart(6)} ms  ${k}`);
  console.log("call chains, top 25 (ms):"); for (const [k, v] of report.chainsTop.slice(0, 25)) console.log(`  ${String(v).padStart(6)} ms  ${k}`);
  console.log(`runs of JavaScript over ${RUN_MS} ms: ${runs.length}`); for (const r of report.runs.slice(0, 12)) console.log(`  ${String(r.ms).padStart(5)} ms  ${r.made.join("; ")}`);
  console.log(`long animation frames: ${loaf.length}`); for (const l of loaf.slice(0, 12)) console.log(`  ${l.ms} ms: ${l.scripts.join(" | ")}`);
  console.log("the game's stall log:"); for (const s of stalls.slice(0, 12)) console.log("  " + s.slice(0, 200));
  if (report.alloc) {
    console.log(`${HEAP_LIVE ? "kept (still alive at the end)" : "allocated"}: ${report.alloc.kbPerFrame} KB a frame over ${report.alloc.frames} frames (sampled every ${HEAP_EVERY} bytes)`);
    console.log("allocators, self, top 30 (KB a frame, share):"); for (const [k, v, p] of report.alloc.selfTop.slice(0, 30)) console.log(`  ${String(v).padStart(8)}  ${String(p).padStart(5)}%  ${k}`);
    console.log("allocators by chain, top 25:"); for (const [k, v, p] of report.alloc.chainsTop.slice(0, 25)) console.log(`  ${String(v).padStart(8)}  ${String(p).padStart(5)}%  ${k}`);
  }
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
