// The music's check (in CI after the quick smoke test, and before every push that touches the music):
//   node tools/music-lab/check.cjs
// 1. builds the Music Lab (tools/music-lab/build.mjs) into one self-contained page;
// 2. opens it in headless Chromium with every request outside the page refused: no script errors;
// 3. renders every section of the style offline (OfflineAudioContext), a build into a wave under
//    siege, and the game's mix far off and damaged: none silent, NaN or clipping;
// 4. plays it live for a few seconds: the engine schedules and the sections show.
const { execFileSync } = require("child_process");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const ROOT = path.resolve(__dirname, "../..");
let failed = 0;
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
  const r = await page.evaluate(() => window.musicLabCheck());
  for (const x of r.results) console.log(`     ${x.name.padEnd(40)} rms ${x.rms.toFixed(3)}  peak ${x.peak.toFixed(2)}`);
  ok(r.ok, `every section renders offline, none silent, NaN or clipping${r.ok ? "" : ": " + r.errors.join("; ")}`);
  ok(r.results.length >= 10, `${r.results.length} renders`);
  // live: play for a few seconds, jump to a wave, check what's playing changes on a block line
  await page.click("#play");
  await page.waitForTimeout(2500);
  const s1 = await page.textContent("#s-section");
  ok(!!s1 && s1 !== "–", `plays live (now: ${s1})`);
  await page.click('#waves button[data-wave="7"]');
  await page.waitForTimeout(9000);
  const w = await page.textContent("#s-wave");
  ok(/^7 /.test(w || ""), `jumping to wave 7 plays its music within a block (now: ${w})`);
  ok(errors.length === 0, `no errors while playing${errors.length ? ": " + errors.join(" | ") : ""}`);
  await browser.close();
  if (failed) { console.log(`${failed} failed`); process.exit(1); }
  console.log("all ok");
})().catch(e => { console.error(e); process.exit(1); });
