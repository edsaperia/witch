// The singer's tuning check (Ed's singer review, 2026-10-14): node tools/music-lab/tune.cjs [section] [seed] [bars] [wave]
// (default breakdown, 7, 16, 2). The game's engine renders the sung line alone (the recorded voice, as the game plays it) over
// a breakdown in headless Chromium, dry; each sung note it scheduled is pitch-tracked over its middle and compared with the
// note asked for. Fails if any note's centre is more than TOL cents off its note, or wobbles more than TOL cents within it, or
// if the line leaves the alto (MIDI 55 to 67 in the home key); then renders again through the voice effects and reports the
// same, for the record (a hall smears a tracker, so that run never fails). Nothing here touches the game.
const { build } = require("esbuild");
const { readFileSync, readdirSync } = require("node:fs");
const { createServer } = require("node:http");
const { join, resolve } = require("node:path");

const root = resolve(__dirname, "../..");
const [section = "breakdown", seed = "7", bars = "16", wave = "2"] = process.argv.slice(2);
const TOL = 20, LOW = 55, HIGH = 67;
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };

/** The pitch of each frame of mono 16-bit PCM (Hz, 0 unvoiced): an autocorrelation peak between fmin and fmax, refined. */
function track(pcm, rate, win = 2048, hop = 512, fmin = 150, fmax = 500) {
  const out = [], lo = Math.floor(rate / fmax), hi = Math.ceil(rate / fmin);
  for (let i = 0; i + win <= pcm.length; i += hop) {
    let e = 0; for (let k = 0; k < win; k++) e += pcm[i + k] * pcm[i + k];
    e = Math.sqrt(e / win) / 32768;
    if (e < 0.004) { out.push({ t: i / rate, f: 0 }); continue; }
    let r0 = 0; for (let k = 0; k < win; k++) r0 += pcm[i + k] * pcm[i + k];
    const ac = new Float64Array(hi + 2);
    for (let lag = lo - 1; lag <= hi + 1; lag++) { let s = 0; for (let k = 0; k + lag < win; k++) s += pcm[i + k] * pcm[i + k + lag]; ac[lag] = s / r0; }
    let best = lo, bv = -1;
    for (let lag = lo; lag <= hi; lag++) if (ac[lag] > bv) { bv = ac[lag]; best = lag; }
    if (bv < 0.5) { out.push({ t: i / rate, f: 0 }); continue; }
    const a = ac[best - 1], b = ac[best], c = ac[best + 1], d = a - 2 * b + c, off = d ? 0.5 * (a - c) / d : 0;
    out.push({ t: i / rate, f: rate / (best + off) });
  }
  return out;
}
const midi = f => 69 + 12 * Math.log2(f / 440);
const median = a => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : NaN; };

(async () => {
  const code = (await build({ entryPoints: [resolve(__dirname, "tune.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
  const server = createServer((q, r) => { r.writeHead(200, { "content-type": "text/html" }); r.end("<!doctype html><meta charset=utf-8><body></body>"); });
  await new Promise(r => server.listen(0, r));
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage(), errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(`http://localhost:${server.address().port}/`);
  await page.addScriptTag({ content: code });
  const samples = Object.fromEntries(readdirSync(join(root, "samples/voices")).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples/voices", f)).toString("base64")]));
  const base = { wave: +wave, seed: +seed, bars: +bars, section, samples, wash: false };
  for (const fx of [false, true]) {
    const r = await page.evaluate(o => window.tuneRender(o), { ...base, fx });
    const label = fx ? "through the voice effects" : "dry";
    ok(r.recorded, `${label}: the recording loaded (the engine sings the recorded voice)`);
    ok(r.nan === 0 && r.peak > 0.005, `${label}: sounds, no NaN (peak ${r.peak.toFixed(3)})`);
    const pcm = new Int16Array(Buffer.from(r.pcm, "base64").buffer), tr = track(pcm, r.rate);
    const leads = r.notes.filter(n => !n.double);
    ok(leads.length >= 6, `${label}: ${leads.length} sung notes over ${bars} bars of ${section}`);
    const rows = [];
    for (const n of leads) {
      const from = n.at + n.dur * 0.25, to = n.at + n.dur * 0.75; // (the middle: past the swell in, before the fade)
      const m = tr.filter(p => p.t >= from && p.t <= to && p.f > 0).map(p => midi(p.f));
      if (m.length < 3) { rows.push({ midi: n.midi, got: NaN, off: NaN, wobble: NaN }); continue; }
      const c = median(m), off = (c - n.midi) * 100, mean = m.reduce((a, b) => a + b, 0) / m.length, wobble = Math.sqrt(m.reduce((a, b) => a + (b - mean) ** 2, 0) / m.length) * 100;
      rows.push({ midi: n.midi, got: c, off, wobble });
    }
    const tracked = rows.filter(r => !Number.isNaN(r.off)), worstOff = Math.max(...tracked.map(r => Math.abs(r.off))), worstWobble = Math.max(...tracked.map(r => r.wobble));
    console.log(`     ${label}: ${tracked.length}/${rows.length} notes tracked; off its note median ${median(tracked.map(r => Math.abs(r.off))).toFixed(0)} cents, worst ${worstOff.toFixed(0)}; wobble median ${median(tracked.map(r => r.wobble)).toFixed(0)} cents, worst ${worstWobble.toFixed(0)}`);
    console.log(`     notes (midi asked → tracked, cents off): ` + rows.slice(0, 16).map(r => `${r.midi}→${Number.isNaN(r.got) ? "?" : r.got.toFixed(2)} (${Number.isNaN(r.off) ? "?" : r.off.toFixed(0)})`).join("  "));
    const lowest = Math.min(...leads.map(n => n.midi)), highest = Math.max(...leads.map(n => n.midi));
    ok(lowest >= LOW && highest <= HIGH, `${label}: the alto's range, MIDI ${lowest} to ${highest} (G3 ${LOW} to G4 ${HIGH})`);
    if (!fx) {
      ok(tracked.length >= Math.ceil(rows.length * 0.8), `${label}: ${tracked.length} of ${rows.length} notes tracked`);
      ok(worstOff <= TOL, `${label}: every note within ${TOL} cents of its note (worst ${worstOff.toFixed(0)})`);
      ok(worstWobble <= TOL, `${label}: every note steady within ${TOL} cents (worst ${worstWobble.toFixed(0)})`);
    }
  }
  await browser.close(); server.close();
  ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
