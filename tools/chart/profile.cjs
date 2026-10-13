// The sea chart's cost on the page's thread as its islands arrive (the map coastlines job, 2026-10-13): opens chart.html on a
// build (DIST, default dist/; WORLD, default 0) with nothing kept (a fresh browser), lets the islands come for SECONDS under the
// sampling profiler, times each `reshape` (an island's meshes made on the page) from outside, and reports the long animation
// frames, the self time of the chart's functions and the reshapes' sizes. MINI=1 opens the game instead and stands her at the
// decks (the map table's miniature).
//   node tools/chart/profile.cjs [out dir]   DIST=dist WORLD=0 SECONDS=70 SIZE=960x600
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const WORLD = env("WORLD", "0"), SECONDS = Number(env("SECONDS", 70)), [W, H] = env("SIZE", "960x600").split("x").map(Number), MINI = env("MINI", "0") === "1";
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
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-precise-memory-info"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = []; page.on("pageerror", e => errors.push(String(e))); page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  const t0 = Date.now(), lap = what => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s] ${what}`);
  await page.addInitScript(() => {
    window.__loaf = []; window.__reshapes = [];
    try { new PerformanceObserver(list => { for (const e of list.getEntries()) window.__loaf.push({ ms: Math.round(e.duration), at: Math.round(e.startTime), scripts: (e.scripts ?? []).slice().sort((a, b) => b.duration - a.duration).slice(0, 2).map(s => `${Math.round(s.duration)} ms ${s.invoker ?? ""} ${s.sourceFunctionName || "?"}`) }); }).observe({ type: "long-animation-frame", buffered: false }); } catch {}
  });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 500 });
  if (MINI) {
    await page.goto(`http://127.0.0.1:${port}/?seed=123&creator=0&spell=auto&world=${WORLD}`);
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 180000 });
  } else {
    await page.goto(`http://127.0.0.1:${port}/chart.html?world=${WORLD}`);
    await page.waitForFunction(() => window.chart?.chart, null, { timeout: 180000 });
    // (each reshape timed from outside: the island's meshes made on the page)
    await page.evaluate(() => { const c = window.chart.chart, f = c.reshape.bind(c); c.reshape = (id, o) => { const t = performance.now(); f(id, o); window.__reshapes.push({ id, ms: Math.round((performance.now() - t) * 10) / 10, cols: o.ground?.cols, rows: o.ground?.rows, at: Math.round(performance.now()) }); }; });
  }
  lap("ready; profiling");
  await cdp.send("Profiler.start");
  await wait(SECONDS * 1000);
  const { profile } = await cdp.send("Profiler.stop");
  const loaf = await page.evaluate(() => window.__loaf), reshapes = await page.evaluate(() => window.__reshapes);
  const heap = await page.evaluate(() => Math.round((performance.memory?.usedJSHeapSize ?? 0) / 1e6));
  const nodes = new Map(profile.nodes.map(n => [n.id, n])), parent = new Map();
  for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
  const key = n => `${n.callFrame.functionName || "(anonymous)"} ${(n.callFrame.url || "").split("/").pop()}:${n.callFrame.lineNumber + 1}`;
  const self = new Map(), incl = new Map(), WATCH = ["reshape", "island", "computeVertexNormals", "moonFrame", "frame", "apply", "drain", "render", "(garbage collector)", "(program)", "(idle)", "ExtrudeGeometry", "ShapeGeometry", "onmessage", "update"];
  let total = 0;
  for (let i = 0; i < profile.samples.length; i++) {
    const dt = (profile.timeDeltas[i] ?? 0) / 1000, n = nodes.get(profile.samples[i]); if (!n) continue; total += dt;
    self.set(key(n), (self.get(key(n)) ?? 0) + dt);
    const stack = new Set(); let p = n.id; while (p !== undefined) { const q = nodes.get(p); if (q) stack.add(q.callFrame.functionName); p = parent.get(p); }
    for (const s of WATCH) if (stack.has(s)) incl.set(s, (incl.get(s) ?? 0) + dt);
  }
  const ms = reshapes.map(r => r.ms).sort((a, b) => a - b), sum = ms.reduce((a, b) => a + b, 0);
  const report = { seconds: SECONDS, world: WORLD, mini: MINI, totalMs: Math.round(total), heapMb: heap, errors: errors.slice(0, 6), reshapes: { n: ms.length, totalMs: Math.round(sum), median: ms[ms.length >> 1] ?? 0, worst: ms[ms.length - 1] ?? 0, list: reshapes }, loaf: loaf.slice(0, 40), incl: Object.fromEntries([...incl].map(([k, v]) => [k, Math.round(v)])), selfTop: [...self].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => [k, Math.round(v)]) };
  fs.writeFileSync(path.join(out, "chart-profile.json"), JSON.stringify(report, null, 1));
  console.log(`profile ${report.totalMs} ms; heap ${heap} MB; reshapes ${report.reshapes.n}: ${report.reshapes.totalMs} ms in all, median ${report.reshapes.median} ms, worst ${report.reshapes.worst} ms`);
  console.log("inclusive ms:", report.incl);
  console.log("self time, top 20:"); for (const [k, v] of report.selfTop.slice(0, 20)) console.log(`  ${String(v).padStart(6)} ms  ${k}`);
  console.log(`long animation frames: ${loaf.length}, over 100 ms: ${loaf.filter(l => l.ms >= 100).length}`); for (const l of loaf.slice(0, 10)) console.log(`  ${l.ms} ms: ${l.scripts.join(" | ")}`);
  if (errors.length) console.log("errors:", errors.slice(0, 3));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
