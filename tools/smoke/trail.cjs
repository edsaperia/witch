// Her flight trail (render/trail.ts; Ed, 2026-10-06: "a fading-out glow, similar to the leylines ... 5 m on the ground and 20 m
// on the treetops ... the same as the current area colour"): the built game (DIST, default dist/) at 1280×720 on a seed, frames
// stepped by hand a fixed 1/30 s. On the ground: up to speed, a long curve, a stop (the trail shrinking away); then up to the
// treetops: a fast curve across areas (its colour turning), boosting, a stop. Writes ground.gif and treetops.gif (and stills).
//   npm run build && node tools/smoke/trail.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/trail", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), tmp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-trail-"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off${process.env.Q ? "&" + process.env.Q : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { const g = window.witch.game, D = g.map.dancefloor; g.witch = { ...g.witch, x: D.x + 40, z: D.z + 30, seated: false, mode: "ground", lift: 0 }; });
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 });
    const step = (o, dt = 1 / 30) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const clip = { x: 240, y: 135, width: 800, height: 450 };
    const film = async (name, moves) => {
      const dir = path.join(tmp, name); fs.mkdirSync(dir);
      let n = 0;
      for (const [o, frames] of moves) for (let i = 0; i < frames; i++) {
        await step(typeof o === "function" ? o(i) : o);
        await page.screenshot({ path: path.join(dir, `f${String(n++).padStart(3, "0")}.png`), clip });
      }
      const info = await page.evaluate(() => { const w = window.witch.game.witch; return { x: Math.round(w.x), z: Math.round(w.z), lift: +(w.lift ?? 0).toFixed(2), speed: +Math.hypot(w.vx, w.vz).toFixed(1) }; });
      console.log(name, n, "frames", JSON.stringify(info));
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "30", "-i", path.join(dir, "f%03d.png"), "-vf", "fps=15,scale=560:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle", path.join(outDir, `${name}.gif`)]);
      return dir;
    };
    // on the ground: up to speed east, a long curve round to the south, then a stop
    const g = await film("ground", [[{ moveX: 1 }, 30], [i => ({ moveX: Math.cos(i / 40 * Math.PI / 2), moveZ: Math.sin(i / 40 * Math.PI / 2) }), 40], [{}, 30]]);
    fs.copyFileSync(path.join(g, "f050.png"), path.join(outDir, "ground.png"));
    // up to the treetops, then fast: a wide curve across areas (boosting as it holds), then a stop
    await step({ toggleMode: true });
    for (let i = 0; i < 45; i++) await step({});
    const t = await film("treetops", [[{ moveX: 1 }, 45], [i => ({ moveX: Math.cos(i / 60 * Math.PI * .75), moveZ: -Math.sin(i / 60 * Math.PI * .75) }), 60], [{}, 45]]);
    fs.copyFileSync(path.join(t, "f080.png"), path.join(outDir, "treetops.png"));
  } finally { await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
