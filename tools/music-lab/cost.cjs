// The music graph's cost (Ed's machine under-runs the audio thread with the music on, not with ?music=off), measured
// two ways, repeatably. Offline, the game's music engine (tools/music-lab/cost.ts, bundled here) is rendered in headless
// Chromium at 48 kHz, each render timed against the audio it makes ("load": 0.25 is a quarter of the audio thread), with
// the count of the nodes it builds a second and the sources sounding at once: every section alone, the costliest
// sections' parts one at a time, and a whole arrangement (boot, then every arc step's waves, siege and party on for the
// second half of each) block by block. Live, the Music Lab (tools/music-lab/dist, built first) plays its pretend run
// through the waves in real time, the browser's audio threads' CPU read from /proc every second (Linux only; every
// Chromium process is read, so run nothing else in Chromium alongside).
// Prints the tables and writes previews/music/cost.json.
//   node tools/music-lab/cost.cjs [sections,parts,run,live]   TOP=4 (sections whose parts are split) LIVE=120 (s)
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path"), os = require("os");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const ROOT = path.resolve(__dirname, "../..");
const want = new Set((process.argv[2] || "sections,parts,run,live").split(","));
const TOP = Number(process.env.TOP || 4), LIVE = Number(process.env.LIVE || 120);
const f1 = x => x.toFixed(1), f2 = x => x.toFixed(2), pad = (s, n) => String(s).padEnd(n), lpad = (s, n) => String(s).padStart(n);
const table = (rows) => {
  console.log(`  ${pad("", 46)} ${lpad("load", 6)} ${lpad("nodes/s", 8)} ${lpad("srcs/s", 7)} ${lpad("peak", 5)} ${lpad("mean", 5)}  top kinds`);
  for (const r of rows) console.log(`  ${pad(r.name.slice(0, 46), 46)} ${lpad(f2(r.load), 6)} ${lpad(f1(r.nodesPerSec), 8)} ${lpad(f1(r.sourcesPerSec), 7)} ${lpad(r.peak, 5)} ${lpad(f1(r.mean), 5)}  ${Object.entries(r.byKind).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ${(v / r.seconds).toFixed(0)}`).join(", ")}`);
};

async function bundle() {
  const { build } = await import(path.join(ROOT, "node_modules/esbuild/lib/main.js"));
  const r = await build({ entryPoints: [path.join(__dirname, "cost.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", absWorkingDir: ROOT });
  const file = path.join(os.tmpdir(), `witch-music-cost-${process.pid}.html`);
  fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><body><script>${r.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")}</script>`);
  return file;
}

// The CPU (utime + stime, in clock ticks) of every Chromium thread whose name says audio (the renderer's AudioOutputDevice,
// its reverbs' convolvers, the audio service's worker). Every Chromium process on the machine is read (the renderer is the
// zygote's, not the browser's child): run nothing else in Chromium alongside.
function audioThreads() {
  const out = {};
  for (const pid of fs.readdirSync("/proc").filter(x => /^\d+$/.test(x))) {
    let cmd = "";
    try { cmd = fs.readFileSync(`/proc/${pid}/cmdline`, "utf8"); } catch { continue; }
    if (!/chrom|headless_shell/i.test(cmd)) continue;
    const type = (cmd.match(/--type=([a-z-]+)/) || [, "browser"])[1];
    let tids = [];
    try { tids = fs.readdirSync(`/proc/${pid}/task`); } catch { continue; }
    for (const tid of tids) {
      try {
        const st = fs.readFileSync(`/proc/${pid}/task/${tid}/stat`, "utf8"), name = st.slice(st.indexOf("(") + 1, st.lastIndexOf(")")), f = st.slice(st.lastIndexOf(")") + 2).split(" ");
        if (/audio|reverb|worklet/i.test(name)) out[`${type} ${name} ${tid}`] = Number(f[11]) + Number(f[12]);
      } catch { /* gone */ }
    }
  }
  return out;
}

(async () => {
  const result = { at: new Date().toISOString() };
  const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const errors = [];
  if (want.has("sections") || want.has("parts") || want.has("run")) {
    const page = await browser.newPage();
    page.on("pageerror", e => errors.push(String(e)));
    await page.goto("file://" + await bundle());
    await page.waitForFunction(() => window.musicCost);
    if (want.has("sections") || want.has("parts")) {
      const s = await page.evaluate(() => window.musicCost.sections(8));
      s.sort((a, b) => b.load - a.load);
      result.sections = s;
      console.log("\nEvery section alone, 8 bars (load: render time over audio time; peak/mean: sources sounding at once):");
      table(s);
      if (want.has("parts")) {
        result.parts = {};
        for (const sec of s.slice(0, TOP)) {
          const p = await page.evaluate(n => window.musicCost.parts(n, 8), sec.name);
          const base = p[0];
          p.slice(1).forEach(r => { r.extra = r.load - base.load; });
          result.parts[sec.name] = p;
          console.log(`\n${sec.name}: its parts alone (the section with none: load ${f2(base.load)}; extra over that):`);
          table([base, ...p.slice(1).sort((a, b) => b.load - a.load)]);
        }
      }
    }
    if (want.has("run")) {
      const r = await page.evaluate(() => window.musicCost.run());
      result.run = r;
      const loads = r.map(x => x.load).sort((a, b) => a - b), q = p => loads[Math.min(loads.length - 1, Math.floor(p * loads.length))];
      console.log(`\nA whole arrangement, block by block (${r.length} blocks of 4 bars, waves every 32 bars, siege and party on for each wave's second half):`);
      console.log(`  load p50 ${f2(q(0.5))}  p95 ${f2(q(0.95))}  worst ${f2(loads[loads.length - 1])};  peak sources ${Math.max(...r.map(x => x.peak))}`);
      const byWave = {};
      for (const b of r) (byWave[b.wave] ??= []).push(b);
      for (const [w, bs] of Object.entries(byWave)) console.log(`  wave ${lpad(w, 2)}: load mean ${f2(bs.reduce((a, b) => a + b.load, 0) / bs.length)} worst ${f2(Math.max(...bs.map(b => b.load)))}  nodes/s ${f1(bs.reduce((a, b) => a + b.nodesPerSec, 0) / bs.length)}  peak sources ${Math.max(...bs.map(b => b.peak))}`);
    }
    await page.close();
  }
  if (want.has("live")) {
    if (process.platform !== "linux") console.log("\nlive: /proc only on Linux; skipped");
    else {
      execFileSync("node", ["tools/music-lab/build.mjs"], { cwd: ROOT, stdio: "inherit" });
      const page = await browser.newPage();
      page.on("pageerror", e => errors.push(String(e)));
      await page.goto("file://" + path.join(ROOT, "tools/music-lab/dist/witch-music-lab.html"));
      await page.waitForTimeout(500);
      await page.click("#play");
      const hz = 100, samples = [];
      const waves = await page.$$eval("#waves button[data-wave]", bs => bs.map(b => Number(b.dataset.wave)));
      let last = audioThreads(), wave = 0;
      for (let s = 1; s <= LIVE; s++) {
        await page.waitForTimeout(1000);
        if (waves.length && s % Math.max(1, Math.floor(LIVE / (waves.length + 1))) === 0 && wave < waves.length) { await page.click(`#waves button[data-wave="${waves[wave]}"]`); wave++; }
        const now = audioThreads(), row = { s, wave: wave ? waves[wave - 1] : 0, section: await page.textContent("#s-section").catch(() => "") };
        for (const [k, v] of Object.entries(now)) if (last[k] !== undefined) row[k] = (v - last[k]) / hz * 100;
        last = now; samples.push(row);
      }
      result.live = samples;
      const keys = [...new Set(samples.flatMap(r => Object.keys(r).filter(k => !["s", "wave", "section"].includes(k))))];
      console.log(`\nLive in the Music Lab, ${LIVE} s, jumping through the waves: each audio thread's CPU (% of a core) a second:`);
      for (const k of keys) { const xs = samples.map(r => r[k] ?? 0).sort((a, b) => a - b); console.log(`  ${pad(k, 44)} mean ${f1(xs.reduce((a, b) => a + b, 0) / xs.length)}%  p95 ${f1(xs[Math.floor(xs.length * 0.95)])}%  worst ${f1(xs[xs.length - 1])}%`); }
      const top = keys.sort((a, b) => samples.reduce((s, r) => s + (r[b] ?? 0), 0) - samples.reduce((s, r) => s + (r[a] ?? 0), 0))[0];
      if (top) { const byW = {}; for (const r of samples) (byW[r.wave] ??= []).push(r[top] ?? 0); console.log(`  ${top} by wave: ${Object.entries(byW).map(([w, xs]) => `${w}: ${f1(xs.reduce((a, b) => a + b, 0) / xs.length)}%`).join("  ")}`); }
      await page.close();
    }
  }
  await browser.close();
  fs.mkdirSync(path.join(ROOT, "previews/music"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "previews/music/cost.json"), JSON.stringify(result, null, 1));
  console.log("\nwrote previews/music/cost.json");
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
