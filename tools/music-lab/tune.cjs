// The singer's tuning check (Ed's singer review, 2026-10-14): node tools/music-lab/tune.cjs [section] [seed] [bars] [wave]
// (default breakdown, 7, 16, 2). The game's engine renders the sung line alone (the game's singer, as the game plays it) over
// a breakdown in headless Chromium, dry; each sung note it scheduled is pitch-tracked over its middle and compared with the
// note asked for. Fails if any note's centre is more than TOL cents off its note, or wobbles more than TOL cents within it (both
// with its vibrato averaged out over VIB seconds, since Chimera's singer: a vibrato isn't out of tune; the raw figures reported), or
// if the line leaves the alto (MIDI 55 to 67 in the home key); then renders again through the voice effects and reports the
// same, for the record (a hall smears a tracker, so that run never fails). --voice=<patch> renders another sung patch (the game's
// chimeraVoice by default; recordedVoice the old singer, altoSampled the alto set, altoTract the vocal-tract worklet). --save=<dir>
// also writes the A/B's mp3s there (Ed's singer swap, 2026-11-08): <voice>-sung.mp3, the line alone through its effects, and
// <voice>-mix.mp3, in the music as the game plays it. Nothing here touches the game.
const { build } = require("esbuild");
const { readFileSync, readdirSync, writeFileSync, mkdirSync, unlinkSync } = require("node:fs");
const { execFileSync } = require("node:child_process");
const { createServer } = require("node:http");
const { join, resolve } = require("node:path");

const root = resolve(__dirname, "../..");
const args = process.argv.slice(2), voiceArg = args.find(a => a.startsWith("--voice="))?.slice(8), saveArg = args.find(a => a.startsWith("--save="))?.slice(7), rest = args.filter(a => !a.startsWith("--"));
const [section = "breakdown", seed = "7", bars = "16", wave = "2"] = rest, voice = voiceArg || JSON.parse(readFileSync(join(root, "config/music-style.json"), "utf8")).form.sung.patch;
const TOL = 20, LOW = 55, HIGH = 67, VIB = 0.2;
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
  const samples = Object.fromEntries(["voices", "alto", "chimera"].flatMap(d => readdirSync(join(root, "samples", d)).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples", d, f)).toString("base64")])));
  const base = { wave: +wave, seed: +seed, bars: +bars, section, samples, wash: false, voice };
  console.log(`the singer: ${voice}`);
  /** A render to <dir>/<voice>-<what>.mp3 (16-bit WAV through ffmpeg, then gone). */
  const save = (r, what) => {
    mkdirSync(resolve(saveArg), { recursive: true });
    const pcm = Buffer.from(r.pcm, "base64"), head = Buffer.alloc(44), w = resolve(saveArg, `${voice}-${what}.wav`);
    head.write("RIFF", 0); head.writeUInt32LE(36 + pcm.length, 4); head.write("WAVEfmt ", 8); head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20); head.writeUInt16LE(1, 22);
    head.writeUInt32LE(r.rate, 24); head.writeUInt32LE(r.rate * 2, 28); head.writeUInt16LE(2, 32); head.writeUInt16LE(16, 34); head.write("data", 36); head.writeUInt32LE(pcm.length, 40);
    writeFileSync(w, Buffer.concat([head, pcm]));
    const mp3 = w.replace(/\.wav$/, ".mp3");
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", w, "-c:a", "libmp3lame", "-q:a", "2", mp3]); unlinkSync(w);
    console.log(`     wrote ${mp3}`);
  };
  for (const fx of [false, true]) {
    const r = await page.evaluate(o => window.tuneRender(o), { ...base, fx });
    if (saveArg && fx) save(r, "sung");
    const label = fx ? "through the voice effects" : "dry";
    ok(r.kind === "tract" ? true : r.recorded, `${label}: ${r.kind === "tract" ? "the vocal-tract worklet sings" : "the recording loaded (the engine sings the recorded voice)"}`);
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
      // (the drift: the track averaged over a vibrato's cycle, VIB s, so a voice's own vibrato, Chimera's 30 cents, isn't counted
      // as out of tune; what's left is the note wandering off its pitch. Its centre the same way.)
      const k = Math.max(1, Math.round(VIB * r.rate / 512)), sm = m.length > k ? m.slice(0, m.length - k + 1).map((_, i) => m.slice(i, i + k).reduce((a, b) => a + b, 0) / k) : [mean];
      const sMean = sm.reduce((a, b) => a + b, 0) / sm.length, drift = Math.sqrt(sm.reduce((a, b) => a + (b - sMean) ** 2, 0) / sm.length) * 100;
      rows.push({ midi: n.midi, got: c, off, wobble, centre: (sMean - n.midi) * 100, drift });
    }
    const tracked = rows.filter(r => !Number.isNaN(r.off)), worstOff = Math.max(...tracked.map(r => Math.abs(r.off))), worstWobble = Math.max(...tracked.map(r => r.wobble));
    const worstCentre = Math.max(...tracked.map(r => Math.abs(r.centre))), worstDrift = Math.max(...tracked.map(r => r.drift));
    console.log(`     ${label}: ${tracked.length}/${rows.length} notes tracked; off its note median ${median(tracked.map(r => Math.abs(r.off))).toFixed(0)} cents, worst ${worstOff.toFixed(0)}; wobble median ${median(tracked.map(r => r.wobble)).toFixed(0)} cents, worst ${worstWobble.toFixed(0)}`);
    console.log(`     ${label}, its vibrato averaged out (${VIB} s): centre off its note median ${median(tracked.map(r => Math.abs(r.centre))).toFixed(0)} cents, worst ${worstCentre.toFixed(0)}; drift median ${median(tracked.map(r => r.drift)).toFixed(0)} cents, worst ${worstDrift.toFixed(0)}`);
    console.log(`     notes (midi asked → tracked, cents off): ` + rows.slice(0, 16).map(r => `${r.midi}→${Number.isNaN(r.got) ? "?" : r.got.toFixed(2)} (${Number.isNaN(r.off) ? "?" : r.off.toFixed(0)})`).join("  "));
    const lowest = Math.min(...leads.map(n => n.midi)), highest = Math.max(...leads.map(n => n.midi));
    ok(lowest >= LOW && highest <= HIGH, `${label}: the alto's range, MIDI ${lowest} to ${highest} (G3 ${LOW} to G4 ${HIGH})`);
    if (!fx) {
      ok(tracked.length >= Math.ceil(rows.length * 0.8), `${label}: ${tracked.length} of ${rows.length} notes tracked`);
      ok(worstCentre <= TOL, `${label}: every note within ${TOL} cents of its note, its vibrato averaged out (worst ${worstCentre.toFixed(0)})`);
      ok(worstDrift <= TOL, `${label}: every note steady within ${TOL} cents, its vibrato averaged out (worst ${worstDrift.toFixed(0)})`);
    }
  }
  if (saveArg) {
    const r = await page.evaluate(o => window.tuneRender(o), { ...base, fx: true, wash: true, mix: true });
    ok(r.nan === 0 && r.peak > 0.005, `in the music: sounds, no NaN (peak ${r.peak.toFixed(3)})`);
    save(r, "mix");
  }
  await browser.close(); server.close();
  ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
