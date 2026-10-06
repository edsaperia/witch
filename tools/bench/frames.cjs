// The frame benchmark and pixel-match shots (Part B of the refactor: "benchmark first"): serves
// the built game (dist/), loads it in headless Chromium, and drives it frame by frame at a fixed
// 1/60 s (window.witch.frame, the loop standing still) through a few fixed scenes, so the same
// build gives the same pictures. For each scene: a screenshot once the picture has settled (the
// same twice running), and for the timed flights each frame's own work (rules and view, view.ms by
// part). Writes <out>/frames.json and <out>/<scene>.png; tools/bench/compare.cjs compares two outs.
// Run `npm run build` first. Playwright comes from the machine's global install.
//   node tools/bench/frames.cjs [out dir] (default bench-out/)   SEED=123 ONLY=ground,treetop
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const seed = process.env.SEED || "123";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const DT = 1 / 60;

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

// Step `n` frames of fixed length with the controls `c` (an object, or a function of the frame),
// drawing each; returns each frame's own work when `timed`.
async function frames(page, n, c, timed = false) {
  return page.evaluate(async ({ n, c, DT, timed, fn }) => {
    const w = window.witch, f = fn ? new Function("i", `return (${c})(i)`) : () => c, times = [];
    for (let i = 0; i < n; i++) {
      const r = w.frame(f(i), DT);
      if (timed) times.push({ step: r.step, render: r.render, ms: { ...r.ms } });
      if (i % 30 === 29) await new Promise(r => setTimeout(r, 0)); // (let the art workers' results in)
    }
    return times;
  }, { n, c: typeof c === "function" ? c.toString() : c, DT, timed, fn: typeof c === "function" });
}

// Draw the same moment again (no step) until two screenshots running are the same: the view's
// background work (ground tiles, heights ahead, art) and its fades come in over frames and time.
// A few things on screen move by the wall clock, not game time (a nightmare's shaking bubble; the
// page's own animations, like a dream bubble's drifting glow, which are cancelled to their resting
// look while it settles), so
// while it settles the page's clock (performance.now) is the bench's: stepped on in fixed steps
// from the same start until the work and fades are done, then held, so both runs take the same
// moment. (Held, the view's time-budgeted work runs to the end of its queues: slower, but sure.)
async function settle(page, file) {
  await page.evaluate(async () => {
    let t = 1e7;
    for (let k = 0; k < 80; k++) { window.__benchClock(t += 100); window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0); if (k % 10 === 9) await new Promise(r => setTimeout(r, 30)); }
  });
  let prev = null, same = 0, out = { settled: false, tries: 30 };
  for (let i = 0; i < 30; i++) {
    await page.evaluate(async () => { for (let k = 0; k < 4; k++) { window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0); document.getAnimations().forEach(a => a.cancel()); await new Promise(r => setTimeout(r, 30)); } });
    const buf = await page.screenshot({ timeout: 300000 });
    if (process.env.BENCH_DEBUG) fs.writeFileSync(file.replace(/\.png$/, `-try${i}.png`), buf);
    if (prev && buf.equals(prev)) { if (++same >= 2) { out = { settled: true, tries: i + 1 }; break; } } else same = 0;
    prev = buf;
  }
  fs.writeFileSync(file, prev);
  await page.evaluate(() => window.__benchClock(null));
  return out;
}

// The page's clock, which the bench can hold (settle): performance.now as ever until it's set.
const CLOCK = `(() => { const real = performance.now.bind(performance); let held = null; performance.now = () => (held === null ? real() : held); window.__benchClock = v => { held = v; }; })();`;

const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0; };
function summarise(times) {
  const total = times.map(t => t.step + t.render), parts = {};
  for (const t of times) for (const [k, v] of Object.entries(t.ms)) (parts[k] ??= []).push(v);
  const r = x => +x.toFixed(2);
  return {
    frames: times.length,
    total: { median: r(pct(total, 0.5)), p99: r(pct(total, 0.99)), worst: r(Math.max(...total)) },
    rules: { median: r(pct(times.map(t => t.step), 0.5)), p99: r(pct(times.map(t => t.step), 0.99)) },
    view: Object.fromEntries(Object.entries(parts).sort().map(([k, v]) => [k, { median: r(pct(v, 0.5)), p99: r(pct(v, 0.99)) }])),
  };
}

// The scenes: each a fresh page on the seed, the start screen passed, the loop standing still.
const SCENES = [
  { name: "booth", steps: async () => {} },
  { name: "ground", steps: async p => { await frames(p, 120, { ...idle, moveX: 1 }); } },
  { name: "ground-flight", timed: true, steps: async p => frames(p, 600, i => ({ moveX: Math.cos(Math.floor(i / 150) * 1.4), moveZ: -Math.abs(Math.sin(Math.floor(i / 150) * 1.4)), toggleMode: false, zoom: 0 }), true) },
  { name: "treetop", steps: async p => { await frames(p, 60, { ...idle, moveX: 1 }); await frames(p, 1, { ...idle, toggleMode: true }); await frames(p, 240, idle); } },
  { name: "treetop-flight", timed: true, steps: async p => { await frames(p, 60, { ...idle, moveX: 1 }); await frames(p, 1, { ...idle, toggleMode: true }); await frames(p, 240, idle); return frames(p, 600, { ...idle, moveZ: -1, spell: true }, true); } },
  { name: "treetop-out", steps: async p => { await frames(p, 60, { ...idle, moveX: 1 }); await frames(p, 1, { ...idle, toggleMode: true }); await frames(p, 240, idle); for (let k = 0; k < 3; k++) await frames(p, 30, { ...idle, zoom: 1 }); await frames(p, 120, idle); } },
  { name: "waves", steps: async p => { await frames(p, 60, { ...idle, moveX: 1 }); for (let k = 0; k < 4; k++) { await frames(p, 1, { ...idle, nextWave: true }); await frames(p, 300, idle); } } },
];

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const only = process.env.ONLY ? process.env.ONLY.split(",") : null;
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const result = { seed, viewport: "1280x720", scenes: {} }, errors = [];
  for (const s of SCENES) {
    if (only && !only.includes(s.name)) continue;
    const page = await context.newPage();
    await page.addInitScript(CLOCK);
    page.on("pageerror", e => errors.push(`${s.name}: ${e.message}`));
    const t0 = Date.now();
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000 }); // (the cloud's software renderer can take minutes, more when the machine is busy)
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
    // The loop stands still before the start, so every scene starts at game time 0.
    await page.evaluate(() => { window.witch.manual = true; });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
    const times = await s.steps(page);
    const shot = await settle(page, path.join(out, `${s.name}.png`));
    const g = await page.evaluate(() => { const g = window.witch.game, w = g.witch; return { time: +g.clock.time.toFixed(4), x: +w.x.toFixed(3), z: +w.z.toFixed(3), mode: w.mode, wave: g.party.wave }; });
    result.scenes[s.name] = { ...g, shot, secs: Math.round((Date.now() - t0) / 1000), ...(times && times.length ? { work: summarise(times) } : {}) };
    console.log(s.name, JSON.stringify(result.scenes[s.name]));
    await page.close();
  }
  result.errors = errors;
  fs.writeFileSync(path.join(out, "frames.json"), JSON.stringify(result, null, 1));
  await browser.close(); server.close();
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });
