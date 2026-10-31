// The frame benchmark and pixel-match shots (Part B of the refactor: "benchmark first"): serves
// the built game (dist/), loads it in headless Chromium, and drives it frame by frame at a fixed
// 1/60 s (window.witch.frame, the loop standing still) through a few fixed scenes, so the same
// build gives the same pictures. For each scene: a screenshot once the picture has settled (the
// same twice running), and for the timed flights each frame's own work (rules and view, view.ms by
// part). Writes <out>/frames.json and <out>/<scene>.png; tools/bench/compare.cjs compares two outs.
// Run `npm run build` first. Playwright comes from the machine's global install.
//   node tools/bench/frames.cjs [out dir] (default bench-out/)   SEED=123 ONLY=ground,treetop DIST=dist
//   (an ONLY run matches only an ONLY run of the same scenes: the scenes before warm the art caches)
//   QUICK=1 (npm run bench:quick, about 5 minutes): three cheap scenes at 960×540, each loaded with ?quick=1 (only the art
//   it needs): the bedroom (the character creator as it opens), the boot (off the decks, the home ring booting) and a wave
//   fight (a debug arena below the dancefloor, a wave called in). Compare a quick run only with a quick run.
const http = require("http");
const { pageKey } = require("./comparable.cjs");
const { holdSimulation, startingBoundary } = require("./hold-simulation.cjs");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../bench-out"));
const seed = process.env.SEED || "123";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const DT = 1 / 60;
const QUICK = process.env.QUICK === "1";

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
// (Quick: stepped without drawing, as the perf check does: the software renderer's frames are most of the time; the
// settled shot draws.)
// Art asked for in a frame is waited for before the next (the wave-fight flake, 2026-10-21: 927 px apart in one patch on #984,
// #997 and #999, the state the same, passing again on a re-run): the workers draw in real time while the frames step in fixed
// ones, so a creature's rig page landed a chunk of frames earlier or later by the runner's speed, and the rig's own state (its
// gait's clock, its feet planted: render/rig/rig.ts RigBody, made when its page is first in) carried that into the shot. Waited
// for, each set the view needs now (an urgent ask: render/assets.ts) lands the frame after it's asked for, on any machine; the
// scenery drawn ahead isn't waited for (waiting for it too ran the Bench job past its 40 minutes; the settle redraws it anyway).
// Each frame such sets landed on is kept with how many (`landed`, by frame from the scene's start: compare.cjs says when two
// runs' differ).
async function frames(page, n, c, timed = false) {
  const r = await page.evaluate(async ({ n, c, DT, timed, fn, draw }) => {
    const w = window.witch, f = fn ? new Function("i", `return (${c})(i)`) : () => c, times = [], A = w.view.assets;
    const L = (window.__benchLanded ??= { frame: 0, at: [] });
    // While the frames step, the workers take only what the view needs now: with one worker (a 2-core runner) an urgent ask
    // otherwise waited out the scenery bake it was on, a wait at each one (#1006's first runs passed the job's 40 minutes).
    // The scenery asked meanwhile is drawn once the steps are done, and the settle waits for it (settle).
    if (!A.__benchOnlyNow) {
      const send = A.dispatch;
      A.dispatch = function () {
        if (!window.__benchOnlyNow) return send.call(this);
        const all = this.queue, now = all.filter(j => j.home || this.urgentKeys.has(this.key(j)));
        this.queue = now;
        try { send.call(this); } finally { const left = new Set(this.queue); this.queue = all.filter(j => !now.includes(j) || left.has(j)); }
      };
      A.__benchOnlyNow = true;
    }
    window.__benchOnlyNow = true;
    for (let i = 0; i < n; i++) {
      const r = w.frame(f(i), DT, draw);
      if (timed) times.push({ step: r.step, render: r.render, ms: { ...r.ms } });
      const urgent = A.urgentKeys; // (what the view needs now: rig pages and creatures, asked urgent; the scenery drawn ahead isn't waited for)
      if (urgent.size) { const was = urgent.size; await A.whenIdle(true); L.at.push([L.frame, was]); }
      L.frame++;
      if (i % 30 === 29) await new Promise(r => setTimeout(r, 0)); // (the page's other tasks their turn)
    }
    window.__benchOnlyNow = false;
    A.dispatch();
    return times;
  }, { n, c: typeof c === "function" ? c.toString() : c, DT, timed, fn: typeof c === "function", draw: !QUICK });
  return r;
}

// Draw the same moment again (no step) until two screenshots running are the same: the view's
// background work (ground tiles, heights ahead, art) and its fades come in over frames and time.
// A few things on screen move by the wall clock, not game time (a nightmare's shaking bubble; the
// page's own animations, like a dream bubble's drifting glow, which are cancelled to their resting
// look while it settles), so
// while it settles the page's clock (performance.now) is the bench's: stepped on in fixed steps
// from the same start until the work and fades are done, then held, so both runs take the same
// moment. (Held, the view's time-budgeted work runs to the end of its queues: slower, but sure.)
async function settle(page, file, frozen = false) {
  await page.evaluate(() => window.witch.view?.assets?.whenIdle()); // (every set asked for in, the scenery the steps held back too: the same art in every run's shot)
  if (!frozen) await page.evaluate(async () => {
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
  if (!frozen) await page.evaluate(() => window.__benchClock(null));
  return out;
}

// The art workers (render/assets.ts: one a core but the page's, hardwareConcurrency - 1): the bench tells the page of one core
// more than it has, so the pool takes every core. The page only waits while the art is drawn (its frames stand still), and a
// 2-vCPU runner's one worker made the art the scenes wait for most of a run past the Bench job's 40 minutes (#1007, #1008,
// 2026-10-21: boot 972 s against 139 s on a 4-vCPU one). The pool's size changes when sets land, never what's drawn: the
// scenes wait for all of it (pending, then the steps' urgent waits, then the settle). BENCH_CORES=<n> to try another.
const ARTCORES = Number(process.env.BENCH_CORES || require("os").availableParallelism() + 1);
// The art jobs' log (BENCH_LAPS): each worker job's kind, id and time from sent to back, so a slower art wait shows whether it
// was more art or the same art slower (the boot's doubling, 2026-10-23: the same jobs, each slower, the CPU going elsewhere).
const JOBS = () => {
  window.__benchJobs = []; const W = window.Worker;
  window.Worker = class extends W {
    constructor(...a) { super(...a); this.addEventListener("message", e => { const j = e.data?.job; if (j && this.__t) window.__benchJobs.push({ kind: j.kind, id: String(j.id), ms: Math.round(performance.now() - this.__t) }); this.__t = 0; }); }
    postMessage(m, ...r) { if (m && m.kind) this.__t = performance.now(); return super.postMessage(m, ...r); }
  };
};
const WORKERS = n => { const real = navigator.hardwareConcurrency; Object.defineProperty(Navigator.prototype, "hardwareConcurrency", { get: () => n, configurable: true }); window.__benchCores = { real, told: n }; };

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

// The quick scenes (QUICK=1): each its own query (the bedroom keeps the creator; the others skip it, as the smoke run does).
const QUICK_SCENES = [
  { name: "boot", query: "&quick=1&creator=0", steps: async p => { await frames(p, 60, { ...idle, moveX: 1 }); await frames(p, 240, idle); } },
  { name: "wave-fight", query: "&quick=1&creator=0&arena=wolf*3@2,boar*2@1", steps: async p => { await frames(p, 30, { ...idle, moveZ: 1 }); await frames(p, 1, { ...idle, nextWave: true }); await frames(p, 300, i => ({ moveX: Math.cos(i / 40), moveZ: Math.sin(i / 40), toggleMode: false, zoom: 0 })); } },
  // (the creator runs its own animation on the page's clock: held still from the first moment, so it shows that moment)
  { name: "bedroom", query: "&quick=1", creator: true, frozen: true },
];

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const only = process.env.ONLY ? process.env.ONLY.split(",") : null;
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const [vw, vh] = QUICK ? [960, 540] : [1280, 720];
  const context = await browser.newContext({ viewport: { width: vw, height: vh } });
  const result = { seed, viewport: `${vw}x${vh}`, quick: QUICK, scenes: {} }, errors = [];
  for (const s of QUICK ? QUICK_SCENES : SCENES) {
    if (only && !only.includes(s.name)) continue;
    const page = await context.newPage();
    await page.addInitScript(holdSimulation);
    await page.addInitScript(CLOCK);
    await page.addInitScript(WORKERS, ARTCORES);
    if (process.env.BENCH_LAPS) await page.addInitScript(JOBS);
    if (s.frozen) await page.addInitScript("window.__benchClock(1e7);");
    page.on("pageerror", e => errors.push(`${s.name}: ${e.message}`));
    const t0 = Date.now();
    // (?loadmist=0: the loading mist, render/loadingMist.ts, shows what the art workers haven't drawn yet, by their timing, not the
    // game's; off as ?quick=1 has it, so two runs of a build still match. An older build ignores it.)
    await page.goto(`http://127.0.0.1:${port}/?opening=old&seed=${seed}${s.query ?? ""}&loadmist=0`);
    // Shared CI artifacts carry their real build label; the separately built base can say dev.
    // Compare gameplay pixels, excluding only the two identity stamps; pageKey still records the real build.
    await page.addStyleTag({ content: "#version, #creator-version { visibility: hidden !important; }" });
    const lap = what => { if (process.env.BENCH_LAPS) console.log(`  ${s.name} ${what} ${Math.round((Date.now() - t0) / 1000)} s`); };
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000 }); // (the cloud's software renderer can take minutes, more when the machine is busy)
    lap("ready");
    if (process.env.BENCH_LAPS) { const c = await page.evaluate(() => window.__benchCores); console.log(`  ${s.name} cores: the machine's ${require("os").availableParallelism()}, the page's ${c?.real}, told ${c?.told}`); }
    // The loop has stood still since installHooks, before readiness on old and direct-play builds: left running, the page
    // redraws its scene on the software renderer every frame meanwhile, and on CI's 4 cores that took most of the CPU from the
    // art workers (#1024 made those frames dearer and the boot's art wait doubled, 12 to 13 minutes: every long bench past the
    // job's 40 minutes, 2026-10-23). Nothing the scenes draw changes: the shots wait for all the art either way.
    await page.evaluate(() => { window.witch.manual = true; });
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
    lap("art");
    if (process.env.BENCH_LAPS) {
      // (the art drawn by now, by kind: jobs and the seconds they took, and the five longest)
      const jobs = await page.evaluate(() => window.__benchJobs ?? []), by = {};
      for (const j of jobs) { const b = (by[j.kind] ??= { n: 0, s: 0 }); b.n++; b.s += j.ms / 1000; }
      const kinds = Object.entries(by).sort((a, b) => b[1].s - a[1].s).map(([k, b]) => `${k} ${b.n}/${Math.round(b.s)}s`).join(", ");
      const top = [...jobs].sort((a, b) => b.ms - a.ms).slice(0, 5).map(j => `${j.kind}:${j.id.slice(0, 24)} ${Math.round(j.ms / 1000)}s`).join(", ");
      console.log(`  ${s.name} art jobs ${jobs.length}: ${kinds}; longest ${top}`);
    }
    if (s.creator) {
      // The bedroom: the character creator as it opens, the game behind it not yet started.
      await page.evaluate(() => { window.witch.manual = true; });
      const start = await page.evaluate(startingBoundary, { paused: true });
      const shot = await settle(page, path.join(out, `${s.name}.png`), !!s.frozen);
      result.scenes[s.name] = { creator: await page.evaluate(() => !!window.__creator?.open), start, shot, secs: Math.round((Date.now() - t0) / 1000) };
      console.log(s.name, JSON.stringify(result.scenes[s.name]));
      await page.close();
      continue;
    }
    // The init script holds the loop before readiness, so every scene starts at game time 0. The treehouse deck's map table off: its live
    // miniature chart (render/mapTable.ts) draws islands a worker makes in real time, so whether they're in by the shot is a race
    // (two runs of one build differed by 3584 px in the boot scene, #758); with its view gone it's never made or shown.
    await page.evaluate(() => { window.witch.manual = true; const v = window.witch.view; if (v.mapTable) { v.mapTable.drop(); v.mapTable.mesh.visible = false; v.mapTable = null; } });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
    // Old builds reveal/swap art on Enter; direct-play builds do so at readiness. Both
    // must finish that same requested work before the first controlled simulation step.
    await page.evaluate(() => window.witch.view.assets.whenIdle());
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
    const start = await page.evaluate(startingBoundary);
    // (the party spell cast long since, so she isn't held at the decks: every scene a run under way, the same each time)
    await page.evaluate(() => { const p = window.witch.game.party; if (p.spellAt === null) p.spellAt = -100; });
    lap("started");
    // (the run's comparability key, from its first scene: tools/bench/comparable.cjs; compare.cjs refuses two runs whose keys differ in more than the build)
    if (!("key" in result)) result.key = await pageKey(page, { scene: (QUICK ? QUICK_SCENES : SCENES).map(q => q.name).join(","), spot: QUICK ? "bench:quick scenes" : "bench scenes" });
    const times = await s.steps(page);
    lap("stepped");
    const shot = await settle(page, path.join(out, `${s.name}.png`));
    const g = await page.evaluate(() => { const g = window.witch.game, w = g.witch; return { time: +g.clock.time.toFixed(4), x: +w.x.toFixed(3), z: +w.z.toFixed(3), mode: w.mode, seated: !!w.seated, wave: g.party.wave }; });
    const landed = await page.evaluate(() => window.__benchLanded?.at ?? []);
    result.scenes[s.name] = { ...g, start, shot, landed, secs: Math.round((Date.now() - t0) / 1000), ...(times && times.length ? { work: summarise(times) } : {}) };
    console.log(s.name, JSON.stringify(result.scenes[s.name]));
    await page.close();
  }
  result.errors = errors;
  fs.writeFileSync(path.join(out, "frames.json"), JSON.stringify(result, null, 1));
  await browser.close(); server.close();
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });
