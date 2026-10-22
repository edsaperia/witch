// The Music Studio's check, in headless Chromium on a build (npm run build): the page loads with no script error; the demo
// song plays through the game's engine and is heard (not silent, nothing non-finite); every synth knob moved off its
// default on a copy of a patch still sounds (a phrase looping on it); held keyboard notes start and stop; each drum kind
// plays. node tools/music-studio/check.cjs [dist]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const dist = path.resolve(process.argv[2] ?? "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".ogg": "audio/ogg", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const f = path.join(dist, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(dist) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(0, r));
  const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage(), errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(`http://localhost:${server.address().port}/music-studio.html`);
  await page.waitForFunction(() => window.studio);
  // the level heard over `ms`: the loudest RMS of the master's blocks, and whether anything wasn't finite
  const listen = ms => page.evaluate(ms => new Promise(res => {
    const a = window.studio.meter(), buf = new Float32Array(a.fftSize); let peak = 0, bad = false;
    const t0 = performance.now(), id = setInterval(() => {
      a.getFloatTimeDomainData(buf); let s = 0;
      for (const x of buf) { if (!Number.isFinite(x)) bad = true; s += x * x; }
      peak = Math.max(peak, Math.sqrt(s / buf.length));
      if (performance.now() - t0 > ms) { clearInterval(id); res({ rms: peak, bad }); }
    }, 20);
  }), ms);
  const fails = [];
  const expectSound = (what, r) => { const ok = !r.bad && r.rms > 0.002; console.log(`${ok ? "ok  " : "FAIL"} ${what}: rms ${r.rms.toFixed(4)}${r.bad ? " (non-finite)" : ""}`); if (!ok) fails.push(what); };
  await page.click("#play"); // (the demo loads and plays: a press, so the context may start)
  expectSound("the demo song", await listen(2500));
  await page.click("#play");
  await page.waitForTimeout(1500);
  // every synth knob off its default, one at a time, on a copy of the pad, a phrase looping on it
  const knobs = await page.evaluate(() => {
    const s = window.studio; s.patches.studioCheck = JSON.parse(JSON.stringify(s.patches.pad)); s.select("studioCheck"); s.phrase("stabs");
    return [...document.querySelectorAll("#editor .knob")].length;
  });
  const settings = [
    ["waves", ["sawtooth", "square", "custom"]], ["levels", [1, 0.5, 0.7]], ["semis", [0, 7, 12]], ["harmonics", [1, 0.5, 0.33, 0.25]],
    ["unison", 5], ["detune", 20], ["width", 0.8], ["sub", 0.8], ["noise", 0.3], ["fmRatio", 2], ["fmIndex", 3], ["fmDecay", 0.4], ["fmSustain", 0.2],
    ["bend", 7], ["bendTime", 0.2], ["glide", 0.1], ["attack", 0.05], ["decay", 0.4], ["sustain", 0.7], ["release", 0.5],
    ["filter", "bandpass"], ["cutoff", 900], ["q", 6], ["envAmt", 5000], ["fAttack", 0.1], ["fDecay", 0.5], ["fSustain", 0.3], ["fRelease", 0.6],
    ["filter2", "highpass"], ["cutoff2", 300], ["q2", 2], ["lfoRate", 3], ["lfoDepth", 800], ["lfoWave", "square"],
    ["vibRate", 5], ["vibDepth", 30], ["vibDelay", 0.2], ["tremRate", 6], ["tremDepth", 0.6], ["drive", 0.6], ["hp", 200], ["pan", -0.5], ["reverb", 0.6], ["delay", 0.4], ["duck", true],
  ];
  console.log(`(${knobs} knobs drawn for a synth)`);
  for (const [k, v] of settings) {
    await page.evaluate(([k, v]) => window.studio.setKnob(k, v), [k, v]);
    expectSound(`synth with ${k} = ${JSON.stringify(v)}`, await listen(900));
  }
  await page.evaluate(() => window.studio.phrase("off"));
  await page.waitForTimeout(2500);
  // held notes on the keyboard: heard while held, gone after
  await page.evaluate(() => window.studio.select("strings"));
  await page.keyboard.down("a"); await page.keyboard.down("d");
  expectSound("held keys", await listen(1200));
  await page.keyboard.up("a"); await page.keyboard.up("d");
  await page.waitForTimeout(4000);
  const after = await listen(500);
  const quiet = after.rms < 0.003; console.log(`${quiet ? "ok  " : "FAIL"} released keys fall silent: rms ${after.rms.toFixed(4)}`); if (!quiet) fails.push("release");
  for (const p of ["kick", "hat", "clap", "snare", "cowbell"]) {
    await page.evaluate(p => { window.studio.select(p); window.studio.phrase("hit"); }, p);
    expectSound(`drum ${p}`, await listen(1500));
  }
  await page.evaluate(() => window.studio.phrase("off"));
  for (const e of errors) console.log(`FAIL page: ${e}`);
  await browser.close(); server.close();
  if (errors.length || fails.length) { console.log(`\n${fails.length + errors.length} failed`); process.exit(1); }
  console.log("\nthe Music Studio is fine");
})().catch(e => { console.error(e); process.exit(1); });
