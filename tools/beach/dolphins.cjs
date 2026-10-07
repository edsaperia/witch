// The east coast's dolphins in play (render/dolphins.ts; Ed, 2026-10-07): the built game (DIST, default dist/) at 1280×720,
// her set down on the sand of the east coast facing the sea, then 24 s stepped a fixed 1/30 s, lying down to stargaze half
// way (STARGAZE=0 to stay standing). Saves the frames with a leap on screen as dolphins-<k>.png and dolphins.gif.
// COAST=west films the west coast's kraken instead (render/kraken.ts), its slot clock shortened so one rises in the film
// (kraken-<k>.png, kraken.gif). NEAR=1 brings them close to her (to see the drawing, whatever the camera).
//   npm run build && node tools/beach/dolphins.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews", seed = "123"] = process.argv.slice(2), west = process.env.COAST === "west", near = process.env.NEAR === "1", name = west ? "kraken" : "dolphins";
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), tmp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-dolphins-"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    // onto the east coast's sand, a little in from the edge
    const at = await page.evaluate(([west, near]) => { const g = window.witch.game, c = g.map.bounds.circle, x = west ? c.x - c.r + 20 : c.x + c.r - 20; if (west) g.tuning.beach = { ...g.tuning.beach, kraken: { every: 26, chance: 1, head: 1, ...(near ? { far: [25, 30] } : {}) } }; else if (near) g.tuning.beach = { ...g.tuning.beach, dolphins: { ahead: [5, 10], out: [8, 12], every: [3, 4] } }; g.witch = { ...g.witch, x, z: c.z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 };  return { x, z: c.z, r: c.r }; }, [west, near]);
    console.log(west ? "on the west coast" : "on the east coast", JSON.stringify(at));
    const step = (o, n = 1) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 30); return window.witch.view.beachView.on; }, [o, n]);
    console.log("beach shown", await step({}, 60));
    await page.waitForTimeout(3000);
    let n = 0;
    for (let i = 0; i < 720; i++) {
      const gaze = process.env.STARGAZE !== "0" && i > 240 && i < 300; // (flying on out against the edge lies her down)
      await step(gaze ? { moveX: west ? -1 : 1 } : {});
      if (i % 3 === 0) { await page.screenshot({ path: path.join(tmp, `f${String(n).padStart(4, "0")}.png`) }); n++; }
    }
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "10", "-i", path.join(tmp, "f%04d.png"), "-vf", "scale=640:-1:flags=neighbor,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none", path.join(outDir, `${name}.gif`)]);
    for (const k of [20, 60, 100, 140, 180, 220]) if (k < n) fs.copyFileSync(path.join(tmp, `f${String(k).padStart(4, "0")}.png`), path.join(outDir, `${name}-${k}.png`));
    console.log("frames", n);
  } finally { await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
