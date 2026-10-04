// Measure the music (not in CI; for tuning the sound): builds the Music Lab, renders every section
// offline in headless Chromium, and prints each one's loudness, peak, bands and centroid and each
// part's own loudness; saves a spectrogram per section.
//   node tools/music-lab/analyse.cjs [out dir] [section,section…]
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const ROOT = path.resolve(__dirname, "../.."), OUT = path.resolve(process.argv[2] || path.join(ROOT, "tools/music-lab/out"));
const only = process.argv[3] ? process.argv[3].split(",") : undefined;
const BAND_NAMES = ["sub", "bass", "lowmid", "mid", "high", "air"];

(async () => {
  execFileSync("node", ["tools/music-lab/build.mjs"], { cwd: ROOT, stdio: "inherit" });
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  page.on("pageerror", e => console.error("page error:", e));
  await page.goto("file://" + path.join(ROOT, "tools/music-lab/dist/witch-music-lab.html"));
  const r = await page.evaluate(o => window.musicLabAnalyse(o), { sections: only });
  const f = (x, w = 6) => x.toFixed(1).padStart(w);
  console.log("section".padEnd(12) + "  rms   peak  " + BAND_NAMES.map(b => b.padStart(6)).join("") + "  centroid  parts (loudest 50 ms, dB)");
  for (const [name, { all, parts }] of Object.entries(r)) {
    console.log(name.padEnd(12) + f(all.rms) + f(all.peak) + "  " + all.bands.map(b => f(b)).join("") + f(all.centroid, 9) + "  " + Object.entries(parts).map(([p, v]) => `${p} ${v.toFixed(0)}`).join(", "));
    if (all.png) fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(all.png.split(",")[1], "base64"));
  }
  fs.writeFileSync(path.join(OUT, "analysis.json"), JSON.stringify(r, (k, v) => (k === "png" ? undefined : v), 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
