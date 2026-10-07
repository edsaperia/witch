// The DJ booth in play (Ed, 2026-10-06: "The witch should have a 'DJing' animation for when she's standing behind the decks"):
// the built game (DIST, default dist/) at 1280×720 on a seed, waiting for the party spell behind her decks, frames stepped by
// hand a fixed 1/30 s. Saves opening.png (the opening shot), gameplay.png (the same at the ordinary ground zoom: the camera's
// intro held at 0), their crops round her ×3 (opening-crop.png, gameplay-crop.png) and, unless NOGIF=1, booth.gif (4 s of
// the opening shot, cropped round the booth).
//   npm run build && node tools/dj/booth.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/dj", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), tmp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-dj-"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=wait`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.party.spellAt === null && !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(8000); // (the treehouse's art in)
    const step = (intro, n = 1) => page.evaluate(([intro, n]) => {
      const w = window.witch, g = w.game; w.manual = true;
      for (let i = 0; i < n; i++) { if (intro !== null) g.camera.intro = intro; w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 30); }
      // her place on screen (CSS pixels), to crop round
      const v = w.view, b = v.witchBase, p = v.camera.position.clone().set(b.x, b.y + 1, b.z).project(v.camera);
      return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight };
    }, [intro, n]);
    const crop = (src, dst, at, w, h, k) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-vf", `crop=${w}:${h}:${Math.max(0, Math.min(1280 - w, Math.round(at.x - w / 2)))}:${Math.max(0, Math.min(720 - h, Math.round(at.y - h * 0.6)))},scale=iw*${k}:ih*${k}:flags=neighbor`, dst]);
    let at = await step(null, 30);
    await page.screenshot({ path: path.join(outDir, "opening.png") });
    crop(path.join(outDir, "opening.png"), path.join(outDir, "opening-crop.png"), at, 320, 200, 3);
    if (!process.env.NOGIF) {
      for (let i = 0; i < 120; i++) { at = await step(null); await page.screenshot({ path: path.join(tmp, `f${String(i).padStart(3, "0")}.png`) }); }
      const x = Math.max(0, Math.min(1280 - 320, Math.round(at.x - 160))), y = Math.max(0, Math.min(720 - 200, Math.round(at.y - 120)));
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "30", "-i", path.join(tmp, "f%03d.png"), "-vf", `crop=320:200:${x}:${y},scale=iw*2:ih*2:flags=neighbor,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none`, path.join(outDir, "booth.gif")]);
    }
    at = await step(0, 45);
    await page.screenshot({ path: path.join(outDir, "gameplay.png") });
    crop(path.join(outDir, "gameplay.png"), path.join(outDir, "gameplay-crop.png"), at, 240, 150, 4);
    console.log("saved to", outDir);
  } finally { await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
