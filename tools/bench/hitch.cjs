// The hitch hunt (overnight phase 2: "record long frames on the bench route, attribute and fix them"; Ed's datapoint:
// seed 871136, wave 28, 147 stalls over 100 ms, the worst a 279 ms FrameRequestCallback). Serves the built game
// (dist/), loads it in headless Chromium on a seed, brings it on to a late wave with the wave key (a few seconds of
// play between waves), then flies the bench's ground and treetop paths frame by frame at a fixed 1/60 s, drawing
// each, and records each frame's own work: the rules' step, the view's parts (view.ms), draw calls, and the JS heap.
// Frames are judged by their CPU work without the view's draw part (in the cloud that's the software rasteriser, seconds a
// frame; on Ed's machine it's the GPU's): a hitch is a frame whose CPU work is over HITCH times the run's median and at
// least FLOOR ms. Prints p50/p95/p99/worst, hitches, draw calls and heap, and for the hitches the parts that took the time
// (with every part over a 60 Hz frame counted by part); writes <out>/hitch.json.
// Run `npm run build` first. Playwright comes from the machine's global install.
//   node tools/bench/hitch.cjs [out dir] (default bench-out/)   SEED=871136 WAVE=28 FRAMES=600 HITCH=3 FLOOR=33
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const seed = env("SEED", "871136"), WAVE = Number(env("WAVE", 28)), N = Number(env("FRAMES", 600));
const HITCH = Number(env("HITCH", 3)), FLOOR = Number(env("FLOOR", 33)), DT = 1 / 60;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp" };

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

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

// `n` frames of DT with the controls `c` (an object, or a function of the frame index), drawn when `draw`; each frame's
// work, its parts, draw calls and heap when `timed`. (Between batches the page gets a moment for the art workers.)
async function frames(page, n, c, { timed = false, draw = true, label = "" } = {}) {
  return page.evaluate(async ({ n, c, DT, timed, fn, draw, label }) => {
    const w = window.witch, f = fn ? new Function("i", `return (${c})(i)`) : () => c, rows = [], info = w.view.renderer.info;
    for (let i = 0; i < n; i++) {
      const r = w.frame(f(i), DT, draw);
      if (timed) rows.push({ label, i, step: r.step, render: r.render, ms: { ...r.ms }, calls: info.render.calls, tris: info.render.triangles, heap: performance.memory ? performance.memory.usedJSHeapSize : 0, creatures: w.game.creatures.length, wave: w.game.party.wave, mode: w.game.witch.mode });
      if (i % 30 === 29) await new Promise(r => setTimeout(r, 0));
    }
    return rows;
  }, { n, c: typeof c === "function" ? c.toString() : c, DT, timed, fn: typeof c === "function", draw, label });
}

const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0; };
const r1 = x => Math.round(x * 10) / 10;

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-precise-memory-info", "--js-flags=--expose-gc"] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage(), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const t0 = Date.now(), lap = what => console.log(`  ${what} ${Math.round((Date.now() - t0) / 1000)} s`);
  await page.goto(`http://127.0.0.1:${port}/?seed=${seed}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000 });
  await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
  await page.evaluate(() => { window.witch.manual = true; });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
  await page.evaluate(() => { const p = window.witch.game.party; if (p.spellAt === null) p.spellAt = -100; });
  lap("started");
  // On to the late wave: off the seat, then a wave every 3 s of play (undrawn but for every tenth frame, so the art
  // for what the waves bring is asked for), her health held so she plays on.
  await frames(page, 60, { ...idle, moveX: 1 }, { draw: true });
  while ((await page.evaluate(() => window.witch.game.party.wave)) < WAVE) {
    await page.evaluate(() => { const w = window.witch.game.witches?.[0]; if (w?.health) w.health.hp = w.health.max ?? 1e6; });
    await frames(page, 1, { ...idle, nextWave: true });
    await frames(page, 180, i => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }), { draw: false });
    await frames(page, 10, { ...idle }, { draw: true });
    if (await page.evaluate(() => !!window.witch.game.over)) break;
  }
  await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
  lap(`at wave ${await page.evaluate(() => window.witch.game.party.wave)}`);
  // The bench route: a ground flight turning every 150 frames, then up to the treetops and a straight treetop flight,
  // then a wave called in mid-flight (the wave's new soundsystem, sieges and art).
  const rows = [];
  rows.push(...await frames(page, N, i => ({ moveX: Math.cos(Math.floor(i / 150) * 1.4), moveZ: -Math.abs(Math.sin(Math.floor(i / 150) * 1.4)), toggleMode: false, zoom: 0 }), { timed: true, label: "ground" }));
  await frames(page, 1, { ...idle, toggleMode: true });
  rows.push(...await frames(page, 240, idle, { timed: true, label: "rise" }));
  rows.push(...await frames(page, N, { ...idle, moveZ: -1 }, { timed: true, label: "treetop" }));
  rows.push(...await frames(page, 1, { ...idle, nextWave: true }, { timed: true, label: "wave" }));
  rows.push(...await frames(page, 300, { ...idle, moveX: 1 }, { timed: true, label: "after-wave" }));
  lap("flown");
  const cpu = r => r.step + r.render - (r.ms.draw ?? 0), work = rows.map(cpu), med = pct(work, 0.5), cut = Math.max(FLOOR, med * HITCH);
  const hitches = rows.filter(r => cpu(r) >= cut).map(r => {
    const parts = Object.entries(r.ms).filter(([k, v]) => k !== "draw" && v > 1).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ${r1(v)}`);
    return { at: `${r.label}#${r.i}`, ms: r1(cpu(r)), step: r1(r.step), parts, calls: r.calls, creatures: r.creatures, wave: r.wave };
  });
  // Which parts the hitches spent their time on, over all of them; and each part's frames over a 60 Hz frame on its own.
  const blame = {}, spikes = {};
  for (const r of rows.filter(r => cpu(r) >= cut)) { blame.rules = (blame.rules ?? 0) + r.step; for (const [k, v] of Object.entries(r.ms)) if (k !== "draw") blame[k] = (blame[k] ?? 0) + v; }
  for (const r of rows) for (const [k, v] of [["rules", r.step], ...Object.entries(r.ms)]) if (k !== "draw" && v > 16.7) { const s = (spikes[k] ??= { frames: 0, worst: 0 }); s.frames++; s.worst = r1(Math.max(s.worst, v)); }
  const heap = rows.map(r => r.heap).filter(Boolean);
  const summary = {
    seed, wave: rows.length ? rows[rows.length - 1].wave : null, frames: rows.length, creatures: rows.length ? rows[rows.length - 1].creatures : null,
    cpu: { p50: r1(med), p95: r1(pct(work, 0.95)), p99: r1(pct(work, 0.99)), worst: r1(Math.max(...work)) },
    rules: { p50: r1(pct(rows.map(r => r.step), 0.5)), p99: r1(pct(rows.map(r => r.step), 0.99)), worst: r1(Math.max(...rows.map(r => r.step))) },
    over: { "16.7": work.filter(x => x > 16.7).length, "33": work.filter(x => x > 33).length, "100": work.filter(x => x > 100).length }, spikes,
    hitch: { cut: r1(cut), count: hitches.length, blame: Object.fromEntries(Object.entries(blame).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => [k, r1(v)])) },
    calls: { p50: pct(rows.map(r => r.calls), 0.5), max: Math.max(...rows.map(r => r.calls)) },
    heapMB: heap.length ? { start: r1(heap[0] / 2 ** 20), end: r1(heap[heap.length - 1] / 2 ** 20), max: r1(Math.max(...heap) / 2 ** 20) } : null,
    parts: Object.fromEntries([...new Set(rows.flatMap(r => Object.keys(r.ms)))].sort().map(k => [k, { p50: r1(pct(rows.map(r => r.ms[k] ?? 0), 0.5)), p99: r1(pct(rows.map(r => r.ms[k] ?? 0), 0.99)) }])),
  };
  fs.writeFileSync(path.join(out, "hitch.json"), JSON.stringify({ summary, hitches, rows, errors }, null, 1));
  console.log(JSON.stringify(summary, null, 1));
  for (const h of hitches.slice(0, 40)) console.log(`${h.at}: ${h.ms} ms (rules ${h.step}) ${h.parts.join(", ")} · ${h.calls} calls, ${h.creatures} creatures, wave ${h.wave}`);
  await browser.close(); server.close();
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });
