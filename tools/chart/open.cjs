// The sea chart opened from the treehouse's map table, timed (the chart meshes job, 2026-10-19): the game loaded on a build (DIST,
// default dist/), her stood at the map table and E pressed, then from that press: when the chart's first frame shows, when its
// first island stands, when all of them do, and the long animation frames meanwhile (over 50 ms; the longest and their total).
// Cold first (a fresh browser: nothing kept), then the page loaded again in the same browser (what the cold open kept, kept) and
// opened warm. RUNS=cold,warm by default; SECONDS the most to wait for every island. PROFILE=1: the sampling profiler from E till
// a few seconds after the chart shows, and the functions with the most self time then. QUERY: more of the game's link (e.g.
// prepChart=1: the chart made ahead, as it is outside automation; waited for before E). FREEZE=1: the game's own loop stopped once
// the chart is up (window.witch.manual), as the world frozen behind it will be, so the chart's frames are its own.
//   node tools/chart/open.cjs [out.json]   DIST=dist SEED=123 SECONDS=240 SIZE=1280x720 PROFILE=0 QUERY= FREEZE=0
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), out = process.argv[2] ? path.resolve(process.argv[2]) : null;
const PROFILE = env("PROFILE", "0") === "1", QUERY = env("QUERY", ""), FREEZE = env("FREEZE", "0") === "1", SEED = env("SEED", "123"), SECONDS = Number(env("SECONDS", 240)), [W, H] = env("SIZE", "1280x720").split("x").map(Number), RUNS = env("RUNS", "cold,warm").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}
const wait = ms => new Promise(r => setTimeout(r, ms));

/** In the page from the start: every long animation frame, and each frame's time with how many islands stand on the chart. */
function instrument() {
  window.__loaf = []; window.__frames = [];
  try { new PerformanceObserver(list => { for (const e of list.getEntries()) window.__loaf.push({ at: e.startTime, ms: e.duration, top: (e.scripts ?? []).slice().sort((a, b) => b.duration - a.duration).slice(0, 2).map(s => `${Math.round(s.duration)} ms ${s.invoker ?? ""} ${s.sourceFunctionName || "?"}`) }); }).observe({ type: "long-animation-frame", buffered: false }); } catch { /* no LoAF */ }
  const tick = () => {
    const c = window.chart?.chart, isles = c ? [...c.isles.values()] : null;
    window.__frames.push({ at: performance.now(), shown: !!document.getElementById("chart-overlay") && !!c && c.now > 0, isles: isles ? isles.length : 0, up: isles ? isles.filter(i => i.pick && i.rose === undefined).length : 0, landed: isles ? isles.filter(i => i.pick).length : 0 });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

async function openOnce(page, port, label) {
  await page.goto(`http://127.0.0.1:${port}/?seed=${SEED}&creator=0&spell=auto${QUERY ? `&${QUERY}` : ""}`);
  await page.waitForFunction(() => window.witch?.ready, null, { timeout: 300000 });
  await page.keyboard.press("Enter"); // (past the start screen)
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
  await page.waitForFunction(() => !/prepChart=1/.test(location.search) || performance.getEntriesByName("witch:chart-prepared").length > 0, null, { timeout: 180000 });
  await wait(1500);
  // up from the decks, stood by the map table in the deck's middle
  await page.evaluate(() => {
    const g = window.witch.game, T = g.tuning.treehouse.house, { x, z } = g.map.treehouse;
    g.witch = { ...g.witch, x: x + T.table + Math.min(0.5, T.tableUse * 0.5), z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: true };
  });
  await wait(1000);
  const t0 = await page.evaluate(() => { window.__loaf.length = 0; window.__frames.length = 0; return performance.now(); });
  const cdp = PROFILE ? await page.context().newCDPSession(page) : null;
  if (cdp) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 1000 }); await cdp.send("Profiler.start"); }
  // (held till the chart's overlay is up: a frame here can be most of a second, and a press between two reads is missed)
  await page.keyboard.down("e");
  for (let i = 0; i < 50 && !(await page.evaluate(() => !!document.getElementById("chart-overlay"))); i++) await wait(100);
  await page.keyboard.up("e");
  if (FREEZE) await page.evaluate(() => { window.witch.manual = true; });
  if (!(await page.evaluate(() => !!document.getElementById("chart-overlay")))) {
    const w = await page.evaluate(() => { const g = window.witch.game, w = g.witch; return { x: w.x, z: w.z, mode: w.mode, perch: w.perch, seated: w.seated, th: g.map.treehouse }; });
    console.log("the chart didn't open:", JSON.stringify(w));
  }
  const deadline = Date.now() + SECONDS * 1000;
  let last = null, profile = null, shownAt = 0;
  while (Date.now() < deadline) {
    await wait(1000);
    last = await page.evaluate(() => window.__frames.at(-1) ?? null).catch(() => null);
    if (cdp && !profile && last?.shown && !shownAt) shownAt = Date.now();
    if (cdp && !profile && shownAt && Date.now() - shownAt > 4000) profile = (await cdp.send("Profiler.stop")).profile;
    if (last && last.isles && last.up >= last.isles) break;
  }
  if (cdp && !profile) profile = (await cdp.send("Profiler.stop")).profile;
  await wait(1500);
  const { frames, loaf } = await page.evaluate(() => ({ frames: window.__frames, loaf: window.__loaf }));
  const after = frames.filter(f => f.at >= t0), first = (p) => { const f = after.find(p); return f ? +((f.at - t0) / 1000).toFixed(2) : null; };
  const longs = loaf.filter(l => l.at >= t0 - 50);
  const gaps = after.slice(1).map((f, i) => f.at - after[i].at).sort((a, b) => a - b);
  const r = {
    run: label, islands: last?.isles ?? 0,
    shown: first(f => f.shown), firstIsland: first(f => f.landed > 0), allIslands: last && last.up >= last.isles ? first(f => f.isles && f.up >= f.isles) : null,
    longTasks: longs.length, longestMs: Math.round(Math.max(0, ...longs.map(l => l.ms))), longTotalS: +(longs.reduce((s, l) => s + l.ms, 0) / 1000).toFixed(1),
    frameP50: Math.round(gaps[Math.floor(gaps.length * 0.5)] ?? 0), frameP95: Math.round(gaps[Math.floor(gaps.length * 0.95)] ?? 0),
    worst: longs.slice().sort((a, b) => b.ms - a.ms).slice(0, 4).map(l => `${Math.round(l.ms)} ms at ${((l.at - t0) / 1000).toFixed(1)} s: ${l.top.join("; ")}`),
  };
  if (profile) { // (self time by function, the top 25)
    const self = new Map(), dt = profile.timeDeltas, byId = new Map(profile.nodes.map(n => [n.id, n]));
    profile.samples.forEach((id, i) => { const n = byId.get(id), f = n.callFrame, k = `${f.functionName || "(anon)"} ${(f.url || "").split("/").pop()}:${f.lineNumber + 1}`; self.set(k, (self.get(k) ?? 0) + (dt[i] ?? 0) / 1000); });
    r.profile = [...self].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, ms]) => `${Math.round(ms)} ms ${k}`);
  }
  console.log(JSON.stringify(r, null, 1));
  return r;
}

(async () => {
  const { server, port } = await serve();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const context = await browser.newContext({ viewport: { width: W, height: H } }); // (one context: what the cold open kept, the warm one finds)
  await context.addInitScript(instrument);
  const page = await context.newPage();
  const errors = []; page.on("pageerror", e => errors.push(String(e)));
  const results = [];
  for (const run of RUNS) results.push(await openOnce(page, port, run));
  if (errors.length) console.log("page errors:", errors.slice(0, 5));
  if (out) fs.writeFileSync(out, JSON.stringify(results, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
