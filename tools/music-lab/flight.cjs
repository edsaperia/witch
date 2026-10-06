// The music's continuity through the frames' hitches (Ed's playtest, 2026-10-06: "The music cuts in and out a lot"):
//   node tools/music-lab/flight.cjs [dist dir] [seconds]
// Loads the built game in headless Chromium with sound, casts the party spell, then stops the game's own loop
// (window.witch.manual) and drives the game's music (its own Music and engine, on the real AudioContext) as a real
// machine's frames would: about 60 a second, the game clock losing what passes the rules' MAX_STEP (0.1 s) as the
// rules do, and every 4 s a real stall of the page's main thread (0.15, 0.3, 0.5 or 1.2 s, round and round), for
// `seconds` (default 40). (The cloud's own frames, 1 to 2 s each under software rendering, aren't a machine anyone
// plays on.) It prints the music's continuity (musicEngine.stats: re-anchorings, sixteenths held for a stall,
// seconds left with nothing scheduled) and the music's output heard silent (stretches of 50 ms or more with
// nothing at all), failing if the stalls shorter than what's scheduled ahead (0.6 s) left gaps: more than `GAP`
// seconds in all (default 0.25) besides the 1.2 s stalls' own excess.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const args = process.argv.slice(2), root = path.resolve(args[0] || path.resolve(__dirname, "../../dist")), secs = Number(args[1] || 40), GAP = Number(process.env.GAP || 0.25);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123&spell=auto`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.mouse.click(320, 200);
  await page.waitForFunction(() => window.witch.audio.music && window.witch.audio.ctx?.state === "running", null, { timeout: 60000, polling: 250 });
  const r = await page.evaluate(async secs => {
    const w = window.witch, ctx = w.audio.ctx, game = w.game, live = w.audio.music;
    w.manual = true; // (the game's own loop stopped: its music falls quiet, ours plays)
    try { live.output.disconnect(); } catch { /* not connected */ }
    const Music = live.constructor, style = live.engine.style, m = new Music(ctx, 0.5, style, 123, "");
    const an = ctx.createAnalyser(); an.fftSize = 2048; m.output.connect(an);
    const buf = new Float32Array(an.fftSize);
    const mix = { volume: 1, cutoff: 16000, distort: 0, distance: 0 }, cue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
    const stalls = [0.15, 0.3, 0.5, 1.2];
    let gameT = 0, last = performance.now(), lastStall = performance.now(), k = 0, silent = 0, silentRun = 0, lastHeard = ctx.currentTime, excess = 0;
    const t0 = performance.now();
    while (performance.now() - t0 < secs * 1000) {
      await new Promise(res => setTimeout(res, 16));
      const now = performance.now();
      if (now - lastStall > 4000) { // a real stall of the main thread: a bake, a garbage collection
        const s = stalls[k++ % stalls.length], end = now + s * 1000;
        while (performance.now() < end) { /* busy */ }
        if (s > 0.6) excess += s - 0.6;
        lastStall = performance.now();
      }
      const t = performance.now(), dt = (t - last) / 1000; last = t;
      gameT += Math.min(dt, 0.1); // (as the rules' clock: MAX_STEP)
      m.update(mix, cue, gameT, game.beat, true, game.tuning.music, 1, 0);
      // the output as heard since the last frame (the analyser's last 2048 samples, about 43 ms)
      an.getFloatTimeDomainData(buf);
      let e = 0; for (const v of buf) e += v * v;
      if (Math.sqrt(e / buf.length) < 1e-5) silentRun += ctx.currentTime - lastHeard; else { if (silentRun >= 0.05) silent += silentRun; silentRun = 0; }
      lastHeard = ctx.currentTime;
    }
    return { stats: m.stats, silent: silent + (silentRun >= 0.05 ? silentRun : 0), excess, stalls: k };
  }, secs);
  const s = r.stats, gap = Math.max(0, s.gap - r.excess);
  console.log(`${r.stalls} stalls (0.15, 0.3, 0.5, 1.2 s in turn): the music left ${s.gap.toFixed(2)} s unscheduled (${r.excess.toFixed(2)} s of it the 1.2 s stalls past the 0.6 s scheduled ahead), heard silent ${r.silent.toFixed(2)} s; ${s.resyncs} re-anchorings, ${s.late ?? 0} sixteenths held for a stall`);
  console.log(`${gap <= GAP ? "ok  " : "FAIL"} the stalls shorter than what's scheduled ahead left ${gap.toFixed(2)} s unscheduled`);
  console.log(`${errors.length ? "FAIL" : "ok  "} no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  await browser.close(); server.close();
  process.exit(gap <= GAP && !errors.length ? 0 : 1);
});
