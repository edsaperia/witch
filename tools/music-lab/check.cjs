// The music's check (in CI after the quick smoke test, and before every push that touches the music):
//   node tools/music-lab/check.cjs
// 1. builds the Music Lab (tools/music-lab/build.mjs) into one self-contained page;
// 2. opens it in headless Chromium with every request outside the page refused: no script errors;
// 3. renders every section of the style offline (OfflineAudioContext), a build into a wave under
//    siege, and the game's mix far off and damaged: none silent, NaN or clipping;
// 4. a sail without reloading the page (docs/plans/sail-without-reload.md, C5), frame by frame offline: night A at wave 2,
//    a quiet gap, then the engine's timeline anchored afresh and night B's seed and style booting up: no NaN or clipping,
//    A gone before B's first note, B not silent, and B's beat within 50 ms of its game time after 10 s (and, without
//    newTimeline, far out: the measure works);
// 5. plays it live for a few seconds: the engine schedules and the sections show.
const { execFileSync } = require("child_process");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const ROOT = path.resolve(__dirname, "../..");
let failed = 0;
const t0 = Date.now(), secs = () => ((Date.now() - t0) / 1000).toFixed(0);
const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) failed++; };

(async () => {
  execFileSync("node", ["tools/music-lab/build.mjs"], { cwd: ROOT, stdio: "inherit" });
  const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  const errors = [], fetched = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.route("**/*", r => { const u = r.request().url(); if (u.startsWith("file:")) return r.continue(); fetched.push(u); return r.abort(); });
  await page.goto("file://" + path.join(ROOT, "tools/music-lab/dist/witch-music-lab.html"));
  await page.waitForTimeout(300);
  ok(errors.length === 0, `the lab opens with no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
  ok(fetched.length === 0, `the lab fetches nothing${fetched.length ? ": " + fetched.join(", ") : ""}`);
  const tr = Date.now(), r = await page.evaluate(() => window.musicLabCheck());
  console.log(`     (rendered in ${((Date.now() - tr) / 1000).toFixed(0)} s)`);
  for (const x of r.results) console.log(`     ${x.name.padEnd(40)} rms ${x.rms.toFixed(3)}  peak ${x.peak.toFixed(2)}`);
  ok(r.ok, `every section renders offline, none silent, NaN or clipping${r.ok ? "" : ": " + r.errors.join("; ")}`);
  ok(r.results.length >= 10, `${r.results.length} renders`);
  {
    const ts = Date.now(), [sail, stale] = await page.evaluate(() => Promise.all([window.musicLabSail(true), window.musicLabSail(false)]));
    console.log(`     (sailed in ${((Date.now() - ts) / 1000).toFixed(0)} s)`);
    const f = x => `rms ${x.rms.toFixed(3)}  peak ${x.peak.toFixed(2)}`;
    for (const k of ["a", "gapEnd", "b", "whole"]) console.log(`     sail: ${k.padEnd(34)} ${f(sail[k])}`);
    const late = o => o.offsets.filter(x => x.game >= 10), worst = o => Math.max(0, ...late(o).map(x => Math.abs(x.ms)));
    ok(Number.isFinite(sail.whole.peak) && Number.isFinite(sail.whole.rms) && sail.whole.peak <= 1.2, `the sail renders no NaN or clipping (peak ${sail.whole.peak.toFixed(2)})`);
    ok(sail.a.rms > 0.003, `night A plays before the sail (rms ${sail.a.rms.toFixed(3)})`);
    ok(sail.gapEnd.peak < 1e-3, `night A's music is gone before night B's first note (peak ${sail.gapEnd.peak.toExponential(1)})`);
    ok(sail.b.rms > 0.003, `night B's boot is heard (rms ${sail.b.rms.toFixed(3)})`);
    ok(late(sail).length > 0 && worst(sail) < 50, `night B's beat within 50 ms of its game time after 10 s (worst ${worst(sail).toFixed(1)} ms over ${late(sail).length} sixteenths)`);
    ok(worst(stale) > 1000, `without newTimeline it would be far out (${(worst(stale) / 1000).toFixed(1)} s): the measure works`);
  }
  // live: play for a few seconds, jump to a wave, check what's playing changes on a block line
  // (each waits only until it shows, up to its old fixed wait)
  await page.click("#play");
  await page.waitForFunction(() => { const t = document.querySelector("#s-section")?.textContent; return !!t && t !== "–"; }, null, { timeout: 2500, polling: 100 }).catch(() => {});
  const s1 = await page.textContent("#s-section");
  ok(!!s1 && s1 !== "–", `plays live (now: ${s1})`);
  await page.click('#waves button[data-wave="7"]');
  await page.waitForFunction(() => /^7 /.test(document.querySelector("#s-wave")?.textContent || ""), null, { timeout: 9000, polling: 100 }).catch(() => {});
  const w = await page.textContent("#s-wave");
  ok(/^7 /.test(w || ""), `jumping to wave 7 plays its music within a block (now: ${w})`);
  ok(errors.length === 0, `no errors while playing${errors.length ? ": " + errors.join(" | ") : ""}`);
  await browser.close();
  if (failed) { console.log(`${failed} failed`); process.exit(1); }
  console.log(`all ok in ${secs()} s`);
})().catch(e => { console.error(e); process.exit(1); });
