// Sigils in runs (Ed, 2026-10-15: "Pick up and place in runs"; rules/leash.ts LeashState.run): the built game (DIST, default
// dist/) at 960x540 on home's open ground, six creatures on her stack; she presses the sigil button and walks east holding it
// (a sigil goes down in each empty hex she enters), lets go, presses on the last and walks back holding (each comes up again).
// Frames every few game steps, a gif of the two runs (ffmpeg) and the first and last frame as PNGs. Fails on a page error, or
// if the run didn't put all six down and pick them all up.
//   npm run build && node tools/leash/runs-gif.cjs <out dir> [seed]   (ZOOM=2: zoomed out two steps first)
const http = require("http"), fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/leash-runs", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const frames = path.join(outDir, "frames"); fs.mkdirSync(frames, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = []; let out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
    page.on("pageerror", e => errors.push(e.message));
    if (process.env.DEBUG) page.on("console", m => console.log("console:", m.text().slice(0, 200)));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    console.log(await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor, x = D.x + 22, z = D.z + 30; // (home's open ground, south-east of the floor: she walks east over it)
      g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0, perch: undefined }; const w = g.witch;
      const near = g.creatures.filter(c => !c.gone && !c.boss && !c.partyLegend && c.level < 3 && !c.leashed).sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)).slice(0, 6);
      near.forEach((c, i) => { const px = x - 10 + i * 4, pz = z - 6; Object.assign(c, { x: px, z: pz, tx: px, tz: pz, leashed: true, state: "leashed", enraged: false, siege: undefined, fight: undefined, circle: undefined }); g.leash.stack.push(c.id); });
      g.byArea = null;
      return `leashed ${near.map(c => `${c.species}${c.level}`).join(" ")}`;
    }));
    const step = (o, dt = 1 / 30) => page.evaluate(([o, dt]) => { const w = window.witch; w.manual = true; w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, dt); }, [o, dt]);
    const state = () => page.evaluate(() => { const s = window.witch.game.leash; return { placed: s.placed.length, stack: s.stack.length, run: s.run?.kind ?? null }; });
    let n = 0; const shoot = async () => page.screenshot({ path: path.join(frames, `f${String(n++).padStart(3, "0")}.png`) });
    const ZOOM = Number(process.env.ZOOM || 0); // (zoom out this many steps first: the row of hexes in view)
    for (let i = 0; i < 20; i++) await step({ zoom: i < ZOOM ? 1 : 0 }); // (settle: her party gathers)
    await shoot();
    // The placing run: press, then walk east holding for about 3.5 s of game time (seven cells at her walking pace).
    const EVERY = 6;
    page.setDefaultTimeout(300000); // (the software renderer: a screenshot can take a while)
    for (let i = 0; i < 105; i++) { await step({ moveX: 1, place: i === 0, sigilHeld: true }); if (i % EVERY === 0) await shoot(); }
    const afterPlace = await state();
    for (let i = 0; i < 15; i++) { await step({}); if (i % 5 === 0) await shoot(); } // (let go, stand)
    // The pick-up run: walk back west till she's in the last sigil's cell, press there (that one comes up), then on west holding.
    const overLast = () => page.evaluate(() => { const g = window.witch.game, s = g.leash, H = g.tuning.leash.hex, p = s.placed[s.placed.length - 1]; const q = (x, z) => { const fr = z / (H.size * Math.sqrt(3) / 2), fq = x / H.size - fr / 2; return [Math.round(fq), Math.round(fr)].join(","); }; return q(g.witch.x, g.witch.z) === q(p.x, p.z); });
    for (let i = 0; i < 90 && !(await overLast()); i++) { await step({ moveX: -1 }); if (i % EVERY === 0) await shoot(); }
    for (let i = 0; i < 110; i++) { await step({ moveX: -1, place: i === 0, sigilHeld: true }); if (i % EVERY === 0) await shoot(); }
    const afterPick = await state();
    for (let i = 0; i < 10; i++) { await step({}); if (i % 5 === 0) await shoot(); }
    out = { afterPlace, afterPick, frames: n };
    fs.copyFileSync(path.join(frames, "f000.png"), path.join(outDir, "before.png"));
    fs.copyFileSync(path.join(frames, `f${String(n - 1).padStart(3, "0")}.png`), path.join(outDir, "after.png"));
    const mid = fs.readdirSync(frames).sort()[Math.round(n * 0.45)]; fs.copyFileSync(path.join(frames, mid), path.join(outDir, "placed.png"));
    try {
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "8", "-i", path.join(frames, "f%03d.png"), "-vf", "fps=8,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96[p];[s1][p]paletteuse=dither=bayer", path.join(outDir, "runs.gif")]);
      out.gif = path.join(outDir, "runs.gif");
    } catch (e) { out.gif = `ffmpeg failed: ${e.message.split("\n")[0]}`; }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length || !out.afterPlace || out.afterPlace.placed < 6 || out.afterPick.stack < 6) process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
