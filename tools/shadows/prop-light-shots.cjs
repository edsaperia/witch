// Shadows from the soundsystems' and runestones' own light (Ed, 2026-10-13: "the light that soundsystems and runestones produce" should
// make other things, trees, cast shadows; render/trunkShadows.ts, render/view.ts ForestLight.shadow): the built game (DIST, default
// dist/) at 1280×800, stepped at a fixed 1/60 s, her on foot just south of the nearest soundsystem (the first wave brought on) and of the
// runestone nearest home, her own glow's shadows off (glowReach 0) so the shadows are the soundsystem's or the stone's alone; each shot
// as it is (<name>.png) and where they lie (<name>-debug.png, magenta), with a tree of the area's own placed 7 m west of it (its
// clearing keeps the trees 24 m and more away: drawing only, one of the area's trees copied there, its two halves and its shadow, as the
// scenery's rebuilt). Fails on a page error.
//   npm run build && node tools/shadows/prop-light-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/prop-light-shadows", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, C]);
    await page.evaluate(() => { window.witch.manual = true; window.__hp = JSON.stringify(window.witch.game.witches[0].health); });
    await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C); // (the first wave, for a soundsystem)
    await step(600);
    out.subjects = await page.evaluate(() => {
      const g = window.witch.game, d = g.map.dancefloor, s = [];
      for (const [, a] of g.party.areas) if (a.soundsystem && a.cell) { s.push({ name: "soundsystem", x: a.soundsystem.x, z: a.soundsystem.z }); break; }
      // the runestone nearest home (render/view/home.ts: the stones standing where the party goes next)
      const ms = (window.witch.view.markerCache.list || []).slice().sort((a, b) => Math.hypot(a.x - d.x, a.z - d.z) - Math.hypot(b.x - d.x, b.z - d.z));
      if (ms[0]) s.push({ name: "runestone", x: ms[0].x, z: ms[0].z });
      return s;
    });
    // a tree placed by the subject: the scenery's next rebuild copies the tallest ordinary tree (under 10 m across) of the area's 40 nearest that spot there (its sprite's halves in the
    // area's batch and its trunk's shadow), so the soundsystem's or the stone's light has a tree to throw a shadow from
    await page.evaluate(() => {
      const v = window.witch.view, any = m => m.values().next().value, TS = Object.getPrototypeOf(any(v.trunkShadowBatches)), SB = Object.getPrototypeOf(any(v.typeBatches));
      const ts = TS.set, sb = SB.set;
      TS.set = function (list) { const P = window.__place; if (P && this === v.trunkShadowBatches.get(P.type) && list.length) { const near = [...list].sort((p, q) => Math.hypot(p.x - P.x, p.z - P.z) - Math.hypot(q.x - P.x, q.z - P.z)).slice(0, 40), src = near.reduce((m, t) => !t.scenery && t.w < 10 && (m.scenery || m.w >= 10 || t.h > m.h) ? t : m, near[0]); P.src = { x: src.x, z: src.z }; list = [...list, { ...src, x: P.x, z: P.z }]; } return ts.call(this, list); };
      SB.set = function (items) { const P = window.__place; if (P && P.src && this === v.typeBatches.get(P.type)) { const dx = P.x - P.src.x, dz = P.z - P.src.z; items = [...items, ...items.filter(i => Math.abs(i.x - P.src.x) < 1.5 && Math.abs(i.z - P.src.z) < 1.5).map(i => ({ ...i, x: i.x + dx, z: i.z + dz }))]; } return sb.call(this, items); };
    });
    for (const s of out.subjects) for (const debug of [false, true]) {
      await page.evaluate(s => { const g = window.witch.game, c = g.map.cellSafe(s.x, s.z).cell; window.__place = { type: g.map.typeOf(c[0], c[1]), x: s.x - 7, z: s.z }; }, s);
      await page.evaluate(([s, debug]) => { const g = window.witch.game, T = g.tuning.shadows.trunks; T.glowReach = 0; T.mode = debug ? "debug" : "soft"; g.witch = { ...g.witch, x: s.x + 80, z: s.z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined }; }, [s, debug]);
      await step(20);
      await page.evaluate(s => { const g = window.witch.game, W = g.witches[0]; W.health = JSON.parse(window.__hp); W.ko = null; g.witch = { ...g.witch, x: s.x + 3, z: s.z + 7, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined }; }, s);
      await step(90);
      await page.screenshot({ path: path.join(outDir, `${s.name}${debug ? "-debug" : ""}.png`) });
    }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
