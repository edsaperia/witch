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
//   node tools/bench/stalls.cjs [out dir]   DIST=dist-prof SEED=2267 X=2673 Z=2484 ZOOM=3 SECONDS=60 SIZE=640x360 WARM=8 RUN_MS=50 NODRAW=1
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist-prof"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const SEED = env("SEED", "2267"), X = Number(env("X", 2673)), Z = Number(env("Z", 2484)), ZOOM = Number(env("ZOOM", 3));
const SECONDS = Number(env("SECONDS", 60)), WARM = Number(env("WARM", 8)), RUN_MS = Number(env("RUN_MS", 50));
const [W, H] = env("SIZE", "640x360").split("x").map(Number), NODRAW = env("NODRAW", "1") !== "0";
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
  lap("ready");
  if (NODRAW) await page.evaluate(() => { const r = window.witch.view.renderer; r.render = () => {}; });
  // The long animation frames (Chrome 123+): their length and the scripts that took the most.
  await page.evaluate(() => {
    window.__loaf = [];
    try { new PerformanceObserver(list => { for (const e of list.getEntries()) window.__loaf.push({ ms: Math.round(e.duration), at: Math.round(e.startTime), scripts: (e.scripts ?? []).slice().sort((a, b) => b.duration - a.duration).slice(0, 3).map(s => `${Math.round(s.duration)} ms ${s.invoker ?? ""} ${s.sourceFunctionName || "?"} ${(s.sourceURL ?? "").split("/").pop()}:${s.sourceCharPosition ?? ""}`) }); }).observe({ type: "long-animation-frame", buffered: false }); } catch {}
  });
  // Off the decks and to the spot, in the treetops, at the zoom.
  await page.keyboard.press("Space"); await wait(800);
  await page.evaluate(({ X, Z, ZOOM }) => { const g = window.witch.game, w = g.witch; w.x = X; w.z = Z; w.vx = w.vz = 0; g.camera.zoomStep = ZOOM; }, { X, Z, ZOOM });
  // Up into the treetops: Space only while she's on the ground (pressed again mid-rise it brings her back down), then wait.
  for (let i = 0; i < 40; i++) { const mode = await page.evaluate(() => window.witch.game.witch.mode); if (mode === "treetop") break; if (mode === "ground") await page.keyboard.press("Space"); await wait(500); }
  const where = await page.evaluate(() => { const g = window.witch.game, w = g.witch, a = g.map.areaAt(w.x, w.z); return { mode: w.mode, x: Math.round(w.x), z: Math.round(w.z), area: g.map.typeOf ? a.type : a.type, zoom: g.camera.zoomStep, wave: g.party.wave, t: Math.round(g.clock.time) }; });
  lap(`at the spot: ${JSON.stringify(where)}; settling ${WARM} s`);
  await wait(WARM * 1000);
  stalls.length = 0;
  await page.evaluate(() => { window.__loaf.length = 0; });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 500 }); await cdp.send("Profiler.start");
  const heap0 = await page.evaluate(() => performance.memory?.usedJSHeapSize ?? 0), tg0 = await page.evaluate(() => window.witch.game.clock.time);
  lap(`profiling ${SECONDS} s`);
  await wait(SECONDS * 1000);
  const { profile } = await cdp.send("Profiler.stop");
  const tg1 = await page.evaluate(() => window.witch.game.clock.time), heap1 = await page.evaluate(() => performance.memory?.usedJSHeapSize ?? 0);
  const loaf = await page.evaluate(() => window.__loaf), overlay = await page.evaluate(() => { const g = window.witch.game, v = window.witch.view; return { creatures: g.creatures.length, stats: v.stats ? { trees: v.stats.trees, bushes: v.stats.bushes, draws: v.stats.draws ?? v.stats.calls } : null }; });
  lap(`done: ${(tg1 - tg0).toFixed(1)} s of game time; ${stalls.length} stalls logged by the game; ${loaf.length} long animation frames`);
  fs.writeFileSync(path.join(out, "stalls.cpuprofile"), JSON.stringify(profile));
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
  const report = {
    spot: where, seconds: SECONDS, gameSeconds: Math.round((tg1 - tg0) * 10) / 10, totalMs: Math.round(total / 1000), idleMs: Math.round(idle), gcMs: Math.round(gc), programMs: Math.round(program),
    heapMb: [Math.round(heap0 / 1e6), Math.round(heap1 / 1e6)], overlay, errors: errors.slice(0, 10), stalls: stalls.slice(0, 30), loaf: loaf.slice(0, 40),
    systems: Object.fromEntries([...incl].map(([k, v]) => [k, Math.round(v)])), selfTop: top.map(([k, v]) => [k, Math.round(v)]),
    chainsTop: [...chains].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => [k, Math.round(v)]),
    runs: runs.sort((a, b) => b.ms - a.ms).slice(0, 25).map(r => ({ ms: Math.round(r.ms), made: [...r.top].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ${Math.round(v)}`) })),
  };
  fs.writeFileSync(path.join(out, "stalls.json"), JSON.stringify(report, null, 1));
  console.log(`profile ${report.totalMs} ms: idle ${report.idleMs}, program ${report.programMs}, gc ${report.gcMs}; heap ${report.heapMb.join(" -> ")} MB`);
  console.log("by subsystem (inclusive ms):", report.systems);
  console.log("self time, top 25:"); for (const [k, v] of top.slice(0, 25)) console.log(`  ${String(v).padStart(6)} ms  ${k}`);
  console.log("call chains, top 25 (ms):"); for (const [k, v] of report.chainsTop.slice(0, 25)) console.log(`  ${String(v).padStart(6)} ms  ${k}`);
  console.log(`runs of JavaScript over ${RUN_MS} ms: ${runs.length}`); for (const r of report.runs.slice(0, 12)) console.log(`  ${String(r.ms).padStart(5)} ms  ${r.made.join("; ")}`);
  console.log(`long animation frames: ${loaf.length}`); for (const l of loaf.slice(0, 12)) console.log(`  ${l.ms} ms: ${l.scripts.join(" | ")}`);
  console.log("the game's stall log:"); for (const s of stalls.slice(0, 12)) console.log("  " + s.slice(0, 200));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
