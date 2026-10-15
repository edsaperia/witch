// The stack above her hat (render/leash/stack.ts; Ed, 2026-10-15: "more visible: more opacity, and never obscured by scenery"):
// the built game (DIST, default dist/) at 1280×720 on a seed; on home's ground she stands with three sigils on her stack just
// behind a tree (the tree a few metres nearer the camera, so its trunk and crown cover her head), and the same frame is shot as
// before (stack.over off, bright 1, backing 0) and as now (the tuning's), at each distance behind the tree (GAPS=2,4,6).
//   npm run build && node tools/leash/stack-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/stack-visible", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const gaps = (process.env.GAPS || "2,4,6").split(",").map(Number);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    console.log(await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor;
      // a tree on home's ground, away from the dancefloor's clearing: she'll stand just north of it (further from the camera)
      let tree = null;
      for (let r = 40; r < 120 && !tree; r += 10) { const ts = g.forest.treesNear(D.x, D.z + r, 20); if (ts.length) tree = ts[0]; }
      const x = tree.x, z = tree.z - 3;
      g.witch = { ...g.witch, x, z, seated: false, mode: "ground", lift: 0 }; const w = g.witch;
      const near = g.creatures.filter(c => !c.gone && !c.boss && c.level >= 1 && c.level < 3 && !c.leashed).sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)).slice(0, 3);
      near.forEach((c, i) => { const px = x - 6 + i * 6, pz = z - 4; Object.assign(c, { x: px, z: pz, tx: px, tz: pz, leashed: true, state: "leashed", enraged: false, siege: undefined, fight: undefined }); g.leash.stack.push(c.id); });
      g.byArea = null;
      window.__tree = tree;
      return `tree at ${tree.x.toFixed(1)}, ${tree.z.toFixed(1)}; leashed ${near.map(c => `${c.species}${c.level}`).join(" ")}`;
    }));
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const place = gap => page.evaluate(gap => { const g = window.witch.game, T = window.__tree; g.witch = { ...g.witch, x: T.x, z: T.z - gap, vx: 0, vz: 0 }; }, gap);
    const set = (over, bright, backing) => page.evaluate(([o, b, k]) => { const S = window.witch.game.tuning.stack; S.over = o; S.bright = b; S.backing = k; }, [over, bright, backing]);
    const clip = { x: 640 - 260, y: 360 - 330, width: 520, height: 440 };
    for (let i = 0; i < 60; i++) await step({}); // (the stack settles, the camera too)
    for (const gap of gaps) {
      await place(gap);
      for (let i = 0; i < 50; i++) await step({});
      await set(false, 1, 0);
      for (let i = 0; i < 4; i++) await step({});
      await page.screenshot({ path: path.join(outDir, `gap${gap}-before.png`), clip });
      await set(true, 1.6, 0.6);
      for (let i = 0; i < 4; i++) await step({});
      await page.screenshot({ path: path.join(outDir, `gap${gap}-after.png`), clip });
    }
    await page.screenshot({ path: path.join(outDir, "screen.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
