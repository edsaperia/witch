// The live audio check (Ed, round 13: "the music stops after about two minutes ... it crackles a
// little and then goes quiet"): plays the built game (dist/) in headless Chromium for MINUTES
// minutes (default 6) with its real AudioContext, the audio graph instrumented: the nodes made by
// kind, the sources playing (started, not yet ended), the context's state and time, the output's
// peak and rms (a tap on everything reaching the speakers), and any non-finite value set on a
// param, sampled every second. The bot starts, flies about, throws 💌s (1), lands and rises, and
// brings a wave on every WAVE_EVERY seconds (N). Writes previews/sfx/live.json; fails on a page
// error, a context not running, the output silent for 5 s or more while the music should play,
// or the sources playing growing without bound.
// Run `npm run build` first, then `node tools/sfx/live.cjs` (MINUTES=10 for the long run).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(__dirname, "../../dist"), MINUTES = +(process.env.MINUTES || 6), WAVE_EVERY = +(process.env.WAVE_EVERY || 45);
const QUERY = process.env.QUERY || "creator=0&seed=123&quick=1&debug";
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
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

// In the page, before the game: count what the audio graph makes and plays, tap the output.
const INSTRUMENT = () => {
  const A = (window.__audio = { made: {}, started: 0, ended: 0, bad: [], ctx: null, tap: null });
  const Orig = window.AudioContext;
  window.AudioContext = class extends Orig {
    constructor(...a) {
      super(...a);
      A.ctx = this;
      const an = this.createAnalyser(); an.fftSize = 2048; A.tap = an; A.buf = new Float32Array(an.fftSize);
      A.peak = 0; A.sq = 0; A.n = 0;
      // keep a running peak and rms of the output, read every second
      const poll = () => { an.getFloatTimeDomainData(A.buf); for (const x of A.buf) { const v = Math.abs(x); if (!(v <= A.peak)) A.peak = Number.isFinite(v) ? Math.max(A.peak, v) : Infinity; A.sq += x * x; A.n++; } };
      A.timer = setInterval(poll, 40);
    }
  };
  const proto = BaseAudioContext.prototype;
  for (const k of Object.getOwnPropertyNames(proto)) if (k.startsWith("create") && typeof proto[k] === "function") {
    const f = proto[k];
    proto[k] = function (...a) {
      const n = f.apply(this, a);
      if (this === A.ctx) A.made[k] = (A.made[k] ?? 0) + 1;
      return n;
    };
  }
  for (const C of [AudioScheduledSourceNode]) {
    const start = C.prototype.start;
    C.prototype.start = function (...a) { if (this.context === A.ctx) { A.started++; this.addEventListener("ended", () => A.ended++, { once: true }); } return start.apply(this, a); };
  }
  const connect = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (dest, ...a) {
    if (A.ctx && dest === A.ctx.destination && A.tap && this !== A.tap) connect.call(this, A.tap);
    return connect.call(this, dest, ...a);
  };
  const P = AudioParam.prototype, note = (what, v) => { if (A.bad.length < 50) A.bad.push(`${what}(${v}) ${new Error().stack.split("\n").slice(2, 4).join(" | ")}`); };
  for (const m of ["setValueAtTime", "linearRampToValueAtTime", "exponentialRampToValueAtTime", "setTargetAtTime"]) {
    const f = P[m];
    P[m] = function (v, ...a) { if (!Number.isFinite(v) || a.some(x => !Number.isFinite(x))) note(m, [v, ...a].join(",")); return f.call(this, v, ...a); };
  }
  const d = Object.getOwnPropertyDescriptor(P, "value");
  Object.defineProperty(P, "value", { ...d, set(v) { if (!Number.isFinite(v)) note("value=", v); d.set.call(this, v); } });
};

async function main() {
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: +(process.env.W || 320), height: +(process.env.H || 180) } }), errors = [];
  page.on("pageerror", e => errors.push(`page error: ${e.message}`));
  page.on("console", m => { if (m.type() === "error") errors.push(`console error: ${m.text()}`); });
  await page.addInitScript(INSTRUMENT);
  await page.goto(`http://127.0.0.1:${port}/?${QUERY}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 240000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => window.__audio.ctx && !window.witch.game.clock.paused, null, { timeout: 60000 });
  log("started");
  const samples = [], keys = ["KeyD", "KeyS", "KeyA", "KeyW"];
  let last = { started: 0, ended: 0 }, k = 0, nextWave = WAVE_EVERY;
  for (let s = 0; s < MINUTES * 60; s++) {
    // the bot: a new heading every 4 s, 💌s at the mouse, now and then up to the treetops and back
    if (s % 4 === 0) { await page.keyboard.up(keys[k % 4]).catch(() => {}); k++; await page.keyboard.down(keys[k % 4]); }
    if (s % 2 === 0) await page.keyboard.press("Digit1"); // (a 💌; not the mouse: a click can land on the page's buttons, some of which reload it)
    if (s % 37 === 20 || s % 37 === 28) await page.keyboard.press("KeyQ");
    if (s >= nextWave) { await page.keyboard.press("KeyN"); nextWave += WAVE_EVERY; }
    await page.waitForTimeout(1000);
    const x = await page.evaluate(() => {
      const A = window.__audio, g = window.witch.game, rms = A.n ? Math.sqrt(A.sq / A.n) : 0, peak = A.peak;
      A.peak = 0; A.sq = 0; A.n = 0;
      const made = Object.values(A.made).reduce((a, b) => a + b, 0);
      const M = window.witch.audio?.music, E = M?.engine, mix = M && window.witch.lastMix;
      const music = M ? { gain: +M.master.gain.value.toFixed(3), section: E?.current?.plan.section, bar: E?.current?.bar, next: E?.nextStep, anchor: E ? +E.anchor.toFixed(2) : undefined } : null;
      const home = g.combat?.sounds.get("home");
      return { music, hurtSpeakers: g.speakers.filter(x => x !== "playing").length, home: home ? +(home.hp / home.max).toFixed(2) : null, paused: g.clock.paused, ko: !!g.witches[0]?.ko, state: A.ctx.state, at: +A.ctx.currentTime.toFixed(1), game: +g.clock.time.toFixed(1), wave: g.party.wave, made, started: A.started, ended: A.ended, playing: A.started - A.ended, peak: +peak.toFixed(3), rms: +rms.toFixed(4), bad: A.bad.length, creatures: g.creatures.filter(c => !c.gone).length };
    });
    samples.push({ s, ...x, newSources: x.started - last.started });
    last = x;
    if (s % 10 === 0 || x.state !== "running" || x.rms < 1e-4) log(JSON.stringify(samples[samples.length - 1]));
  }
  const detail = await page.evaluate(() => ({ made: window.__audio.made, bad: window.__audio.bad }));
  await browser.close(); server.close();
  fs.mkdirSync(path.resolve(__dirname, "../../previews/sfx"), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, "../../previews/sfx/live.json"), JSON.stringify({ samples, ...detail, errors }, null, 1));
  let failed = 0;
  const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };
  ok(errors.length === 0, `no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  ok(samples.every(x => x.state === "running"), `the context runs throughout (${[...new Set(samples.map(x => x.state))].join(", ")})`);
  let quiet = 0, worst = 0;
  for (const x of samples.slice(5)) { quiet = x.rms < 1e-4 ? quiet + 1 : 0; worst = Math.max(worst, quiet); }
  ok(worst < 5, `never silent 5 s or more (longest ${worst} s; quietest rms ${Math.min(...samples.slice(5).map(x => x.rms))})`);
  ok(samples.every(x => x.peak < 1.5 && Number.isFinite(x.peak)), `no blow-ups (loudest peak ${Math.max(...samples.map(x => x.peak))})`);
  const half = samples.slice(Math.floor(samples.length / 2)), maxPlaying = Math.max(...samples.map(x => x.playing));
  ok(maxPlaying < 2000, `sources playing stay bounded (at most ${maxPlaying}; at the end ${samples[samples.length - 1].playing})`);
  ok(detail.bad.length === 0, `no non-finite param values${detail.bad.length ? ": " + detail.bad.slice(0, 3).join(" || ") : ""}`);
  console.log("made:", JSON.stringify(detail.made));
  process.exit(failed ? 1 : 0);
}
main().catch(e => { console.error(e); process.exit(1); });
