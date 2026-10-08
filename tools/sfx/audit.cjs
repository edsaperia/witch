// The sound's CPU audit (the overnight programme's phase 2: "an audio CPU audit (voices, nodes)"):
//   node tools/sfx/audit.cjs [dist dir] [game seconds] [out.json]
// Loads the built game (best built unminified, so the callers have names: npx vite build --minify false --outDir <dir>)
// in headless Chromium with sound, in a big debug arena on seed 871136 (ARENA=, default a late-game crowd), casts the
// spell and starts the sound, then drives it a frame at a time (window.witch.manual): the rules' step without the
// picture, then the sound's own work for that frame (window.witch.soundFrame: the music's cue, the mix, the music and
// the cues), paced to real time so the audio clock keeps up, while she circles through the crowd throwing 💌s.
// It counts every audio node made (by kind, and by the function that made it, from a sample of call stacks), the
// sources sounding at once (started and not yet ended), and times the sound's work per frame (median, p95, p99, worst).
// The numbers are this machine's (and noisy run to run in the cloud's software renderer): compare a before and an
// after on the same one, and a microbenchmark for any one method.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const args = process.argv.slice(2), root = path.resolve(args[0] || path.resolve(__dirname, "../../dist")), secs = Number(args[1] || 30), out = args[2];
const ARENA = process.env.ARENA || "wolf*14@2,boar*12@2,beetle*12@1,owl*10@2,fox*12@1,bat*10@1";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
// Counting every node the page makes, and the sources sounding (installed before the game's own scripts run).
const COUNT = () => {
  const A = (window.__audit = { made: {}, callers: {}, live: 0, peak: 0, started: 0, sampleEvery: 7, n: 0 });
  const proto = BaseAudioContext.prototype;
  for (const name of Object.getOwnPropertyNames(proto)) {
    if (!/^create[A-Z]/.test(name) || typeof proto[name] !== "function") continue;
    const f = proto[name];
    proto[name] = function (...a) {
      A.made[name] = (A.made[name] || 0) + 1;
      if (++A.n % A.sampleEvery === 0) {
        const lines = (new Error().stack || "").split("\n"), fn = l => { const m = (l || "").match(/at (?:new )?([\w$.<>]+)/); return m ? m[1] : "?"; };
        let who = fn(lines[2]), k = 3;
        while (k < lines.length && /^(SfxKit|Babble)\./.test(fn(lines[k - 1])) && /^(SfxKit|Babble)\./.test(fn(lines[k]))) k++; // (up to the first caller outside the kit and the babble)
        if (k < lines.length) who += " < " + fn(lines[k]);
        A.callers[who] = (A.callers[who] || 0) + A.sampleEvery;
      }
      return f.apply(this, a);
    };
  }
  const start = AudioScheduledSourceNode.prototype.start;
  AudioScheduledSourceNode.prototype.start = function (...a) {
    A.started++; A.live++; if (A.live > A.peak) A.peak = A.live;
    this.addEventListener("ended", () => { A.live--; }, { once: true });
    return start.apply(this, a);
  };
};
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.addInitScript(COUNT);
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=871136&creator=0&arena=${encodeURIComponent(ARENA)}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.mouse.click(320, 200);
  await page.waitForFunction(() => window.witch.audio.ctx?.state === "running" && window.witch.audio.sfx, null, { timeout: 60000, polling: 250 });
  await page.waitForTimeout(1500); // (a moment idle, as the start screen gives the game: what it builds ahead, it builds then)
  const r = await page.evaluate(async secs => {
    const w = window.witch, A = window.__audit, g = w.game;
    w.manual = true;
    // (off her decks and into the crowd first: the home speakers boot, the music plays)
    for (let i = 0; i < 240; i++) w.frame({ moveX: 0, moveZ: i < 60 ? 1 : 0, zoom: 0 }, 1 / 60, false);
    const base = { made: { ...A.made }, started: A.started }, ms = [], part = { music: [], cues: [] };
    // (each part's own time: the music's update and the cues', wrapped on their instances)
    const time = (obj, name, into) => { const f = obj && obj[name]; if (!f) return; obj[name] = function (...a) { const t = performance.now(); try { return f.apply(this, a); } finally { into.push(performance.now() - t); } }; };
    time(w.audio.music, "update", part.music); time(w.audio.cues, "update", part.cues);
    // (and every sound effect's own method: its total and its worst, to find what makes the spikes)
    const each = {};
    const sfx = w.audio.sfx;
    for (let o = Object.getPrototypeOf(sfx); o && o !== Object.prototype; o = Object.getPrototypeOf(o))
      for (const name of Object.getOwnPropertyNames(o)) {
        const f = sfx[name];
        if (name === "constructor" || typeof f !== "function" || Object.prototype.hasOwnProperty.call(sfx, name)) continue;
        sfx[name] = function (...a) { const t = performance.now(); try { return f.apply(this, a); } finally { const d = performance.now() - t, e = (each[name] ??= { calls: 0, ms: 0, worst: 0 }); e.calls++; e.ms += d; e.worst = Math.max(e.worst, d); } };
      }
    const t0 = performance.now(), g0 = g.clock.time;
    let i = 0;
    while (g.clock.time - g0 < secs) {
      const a = i / 180, c = { moveX: Math.cos(a), moveZ: Math.sin(a), zoom: 0, fire: i % 40 < 24, aimX: Math.cos(a + 1.6), aimZ: Math.sin(a + 1.6) };
      w.frame(c, 1 / 60, false);
      const s0 = performance.now(); w.soundFrame(); ms.push(performance.now() - s0);
      i++;
      // paced to real time: the audio clock runs at its own speed
      const ahead = (g.clock.time - g0) * 1000 - (performance.now() - t0);
      if (ahead > 4) await new Promise(res => setTimeout(res, ahead));
    }
    const span = g.clock.time - g0, made = {};
    for (const k of Object.keys(A.made)) { const d = A.made[k] - (base.made[k] || 0); if (d) made[k] = d; }
    const total = Object.values(made).reduce((a, b) => a + b, 0);
    const stats = xs => { const v = xs.slice().sort((a, b) => a - b), at = p => v.length ? +v[Math.min(v.length - 1, Math.floor(p * v.length))].toFixed(3) : 0; return { median: at(0.5), p95: at(0.95), p99: at(0.99), worst: v.length ? +v[v.length - 1].toFixed(3) : 0 }; };
    ms.sort((a, b) => a - b);
    const q = p => +ms[Math.min(ms.length - 1, Math.floor(p * ms.length))].toFixed(3);
    const creatures = g.creatures.filter(c => Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60).length;
    return { gameSeconds: +span.toFixed(1), frames: ms.length, creaturesNear: creatures, nodesPerSecond: Math.round(total / span), made, startedPerSecond: Math.round((A.started - base.started) / span), peakSounding: A.peak, soundingAtEnd: A.live,
      soundMs: { median: q(0.5), p95: q(0.95), p99: q(0.99), worst: +ms[ms.length - 1].toFixed(3) },
      musicMs: stats(part.music), cuesMs: stats(part.cues),
      sfxMethods: Object.entries(each).map(([k, e]) => [k, e.calls, +e.ms.toFixed(1), +e.worst.toFixed(2)]).sort((a, b) => b[2] - a[2]).slice(0, 12),
      callers: Object.entries(A.callers).sort((a, b) => b[1] - a[1]).slice(0, 15),
      heapMB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null };
  }, secs);
  console.log(JSON.stringify(r, null, 1));
  if (out) fs.writeFileSync(out, JSON.stringify(r, null, 1));
  console.log(`${errors.length ? "FAIL" : "ok  "} no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  await browser.close(); server.close();
  process.exit(errors.length ? 1 : 0);
});
