// The late game, in the browser (overnight phase 2's baseline: Ed's seed 871136 at wave 28 ran at 37 fps, CPU-bound, 26.6 ms
// of the CPU's own work a frame against 13.4 on the GPU). Serves the built game (dist/), loads it in headless Chromium on
// the seed, brings it to the wave as tools/bench/rules.ts does (the playtest key, then 3 s of play, again and again: the
// rules only, stepped 0.1 s a call without drawing), puts her where Ed was (over the treetops at x, z), and times frames at
// a fixed 1/60 s: hovering, then flying. Per frame: the rules' step and the view's work (view.ms by part), the draw calls and
// what's drawn (view.stats), and the JS heap. Writes <out>/late.json and <out>/late.png. Report only: changes nothing.
//   npm run build && node tools/bench/late.cjs [out dir]   SEED=871136 WAVE=28 AT=1059,1499 FRAMES=600 SIZE=1280x720
//   HEAP=1: the sampling heap profiler from the page's load, so <out>/late-heap.json says where what's still alive at the end
//   was made (by function and file, the biggest first).
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const seed = process.env.SEED || "871136", wave = Number(process.env.WAVE || 28), frames = Number(process.env.FRAMES || 600);
const [ax, az] = (process.env.AT || "1059,1499").split(",").map(Number), [vw, vh] = (process.env.SIZE || "1280x720").split("x").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}
const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0; };
const sum = (o, k) => o.reduce((a, x) => a + (x[k] ?? 0), 0);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port, t0 = Date.now();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-precise-memory-info", "--js-flags=--expose-gc"] });
  const page = await (await browser.newContext({ viewport: { width: vw, height: vh } })).newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  const cdp = process.env.HEAP === "1" ? await page.context().newCDPSession(page) : null;
  if (cdp) { await cdp.send("HeapProfiler.enable"); await cdp.send("HeapProfiler.startSampling", { samplingInterval: 32768 }); }
  await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&creator=0`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000 });
  await page.evaluate(() => { window.witch.manual = true; });
  await page.keyboard.press("Enter");
  console.error(`ready and started in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  // To the wave: the rules only (0.1 s a call, nothing drawn), off the seat first.
  const reached = await page.evaluate(async ({ wave }) => {
    const w = window.witch, g = w.game, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    w.frame({ ...idle, moveX: 1 }, 1 / 60, false);
    let calls = 0;
    while (g.party.wave < wave && !g.over && !g.partyOver && calls < wave * 400) {
      w.frame({ ...idle, nextWave: true }, 1 / 60, false);
      for (let i = 0; i < 30; i++) w.frame(idle, 0.1, false); // (3 s)
      calls += 31;
      if (calls % 310 === 0) await new Promise(r => setTimeout(r, 0));
    }
    return { wave: g.party.wave, over: !!g.over || !!g.partyOver, creatures: g.creatures.length, time: g.clock.time };
  }, { wave });
  console.error(`at wave ${reached.wave} (${reached.creatures} creatures, game time ${reached.time.toFixed(0)} s) in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  // Where Ed was, over the treetops, the art and ground round her given time to come in.
  await page.evaluate(async ({ ax, az }) => {
    const w = window.witch, g = w.game, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    g.witch.x = ax; g.witch.z = az;
    w.frame({ ...idle, toggleMode: true }, 1 / 60, true);
    for (let i = 0; i < 240; i++) { w.frame(idle, 1 / 60, true); if (i % 20 === 19) await new Promise(r => setTimeout(r, 50)); }
  }, { ax, az });
  // Timed: hovering, then flying north (her treetop speed), a frame at a time, drawn.
  const timed = await page.evaluate(async ({ frames }) => {
    const w = window.witch, g = w.game, v = w.view, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, rows = [];
    const heap = () => (performance.memory ? performance.memory.usedJSHeapSize / 2 ** 20 : 0);
    const heap0 = heap();
    for (let i = 0; i < frames; i++) {
      const c = i < frames / 2 ? idle : { ...idle, moveZ: -1 };
      const r = w.frame(c, 1 / 60, true), s = v.stats;
      rows.push({ step: r.step, render: r.render, ms: { ...r.ms }, draws: s.drawCalls, creatures: s.creatures, trees: s.trees, dropped: s.dropped, heap: heap() });
      if (i % 30 === 29) await new Promise(r => setTimeout(r, 0));
    }
    return { rows, heap0, lod: g.lod ? { ...g.lod } : null, creatures: g.creatures.length, wild: g.creatures.filter(c => (c.state ?? "wild") === "wild").length, marching: g.creatures.filter(c => c.siege).length, mode: g.witch.mode };
  }, { frames });
  await page.screenshot({ path: path.join(out, "late.png") });
  if (cdp) {
    // What's still alive, by where it was made: each sampled node's self size, by function and file, and by file alone.
    const { profile } = await cdp.send("HeapProfiler.getSamplingProfile"), byFn = new Map(), byFile = new Map();
    const walk = (n, chain) => {
      const f = n.callFrame, at = `${f.functionName || "(anon)"} ${(f.url || "").split("/").pop()}:${f.lineNumber + 1}`, file = (f.url || "(native)").split("/").pop() || "(native)";
      if (n.selfSize) { byFn.set(at, (byFn.get(at) ?? 0) + n.selfSize); byFile.set(file, (byFile.get(file) ?? 0) + n.selfSize); }
      for (const c of n.children || []) walk(c, chain);
    };
    walk(profile.head, []);
    const mb = m => [...m].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => [k, +(v / 2 ** 20).toFixed(1)]);
    const total = [...byFile.values()].reduce((a, b) => a + b, 0);
    fs.writeFileSync(path.join(out, "late-heap.json"), JSON.stringify({ totalMB: +(total / 2 ** 20).toFixed(1), byFunction: mb(byFn), byFile: mb(byFile) }, null, 1));
    console.error(`heap: ${(total / 2 ** 20).toFixed(0)} MB sampled alive; see late-heap.json`);
  }
  await browser.close(); server.close();
  // The report: per frame, the work (rules + view) at percentiles, the view's parts by their mean, the draws and the heap.
  const rows = timed.rows, work = rows.map(r => r.step + r.render), parts = {};
  for (const r of rows) for (const [k, x] of Object.entries(r.ms || {})) parts[k] = (parts[k] ?? 0) + x / rows.length;
  const report = {
    seed, wave: reached.wave, at: [ax, az], size: `${vw}x${vh}`, frames, creatures: timed.creatures, wild: timed.wild, marching: timed.marching, lod: timed.lod, mode: timed.mode,
    work: { p50: pct(work, 0.5), p95: pct(work, 0.95), p99: pct(work, 0.99), worst: Math.max(...work), over16: work.filter(x => x > 1000 / 60).length, over33: work.filter(x => x > 1000 / 30).length },
    step: { p50: pct(rows.map(r => r.step), 0.5), p95: pct(rows.map(r => r.step), 0.95), worst: Math.max(...rows.map(r => r.step)) },
    render: { p50: pct(rows.map(r => r.render), 0.5), p95: pct(rows.map(r => r.render), 0.95), worst: Math.max(...rows.map(r => r.render)) },
    viewParts: Object.fromEntries(Object.entries(parts).sort((a, b) => b[1] - a[1]).map(([k, x]) => [k, +x.toFixed(3)])),
    draws: { p50: pct(rows.map(r => r.draws), 0.5), max: Math.max(...rows.map(r => r.draws)) },
    drawn: { creatures: pct(rows.map(r => r.creatures), 0.5), trees: pct(rows.map(r => r.trees), 0.5), dropped: sum(rows, "dropped") },
    heapMB: { start: +timed.heap0.toFixed(1), end: +rows[rows.length - 1].heap.toFixed(1), max: +Math.max(...rows.map(r => r.heap)).toFixed(1) },
    errors,
  };
  fs.writeFileSync(path.join(out, "late.json"), JSON.stringify({ report, rows }, null, 1));
  console.log(JSON.stringify(report, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
