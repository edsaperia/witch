// Scenery's shadows from her glow (Ed, 2026-10-12: "Scenery (temples etc) should also cast them", "Runestones and soundsystems should
// also cast shadows": render/view/scenery.ts, render/view/home.ts, render/soundsystemGen.ts): the built game (DIST, default dist/) at
// 1280×800, stepped at a fixed 1/60 s, her on foot just east of a scene's piece, a set piece, a decor piece, a runestone and a
// soundsystem (the first wave brought on), each shot with them (<name>-on.png) and without (<name>-off.png, shadows.trunks.scenery off), coloured (<name>-coloured.png, the tint and glowing casters' shade), without the taper (<name>-untapered.png) and black (<name>-black.png), and where
// they all lie (<name>-debug.png, magenta); and a decor piece by a campfire, her across the fire from it.
// Fails on a page error.
//   npm run build && node tools/shadows/scenery-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/scenery-shadows", seed = "123", only] = process.argv.slice(2); // (only: a subject name's start, to shoot just those)
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
    await page.evaluate(() => { window.witch.manual = true; window.__hp = JSON.stringify(window.witch.game.witches[0].health); }); // (topped up at each spot: a fight nearby would knock her out and home)
    // the first wave, for a soundsystem
    await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C);
    await step(600);
    out.subjects = await page.evaluate(() => {
      const g = window.witch.game, d = g.map.dancefloor, near = (l, f) => l.filter(f ?? (() => true)).sort((a, b) => Math.hypot(a.x - d.x, a.z - d.z) - Math.hypot(b.x - d.x, b.z - d.z))[0];
      const s = [];
      const sc = near(g.map.scenes, q => Math.hypot(q.x - d.x, q.z - d.z) > 40); if (sc) s.push({ name: "scene-" + sc.id, x: sc.x, z: sc.z, r: sc.r });
      const sp = near([...g.forest.setPiecesNear(d.x, d.z, 600)], q => Math.hypot(q.x - d.x, q.z - d.z) > 40); if (sp) s.push({ name: "setpiece", x: sp.x, z: sp.z, r: 5 });
      const dc = near([...g.forest.decorNear(d.x, d.z, 600)], q => q.family === "ruins" || q.family === "ruin"); if (dc) s.push({ name: "decor-" + dc.family, x: dc.x, z: dc.z, r: 2 });
      for (const [, a] of g.party.areas) if (a.soundsystem && a.cell) { s.push({ name: "soundsystem", x: a.soundsystem.x, z: a.soundsystem.z, r: 3 }); break; }
      const ss = s.find(q => q.name === "soundsystem"), hc = g.map.cellSafe(d.x, d.z).cell;
      for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1]]) { const p = g.map.soundsystemSpot(hc[0] + dx, hc[1] + dy); if (p && (!ss || Math.hypot(p.x - ss.x, p.z - ss.z) > 5) && !g.party.areas.has(`${hc[0] + dx},${hc[1] + dy}`)) { s.push({ name: "runestone", x: p.x, z: p.z, r: 1.5 }); break; } }
      // scenery by a lit campfire (they burn only in areas the party has reached: render/view/lights.ts), her across the fire from
      // it, her glow's shadows off for the shot (glowReach 0): lit by the fire alone
      const lit = c => g.party.areas.has(`${c[0]},${c[1]}`);
      const fires = g.forest.lightsNear(d.x, d.z, 1500).filter(l => l.kind === "campfire" && lit(g.map.cellSafe(l.x, l.z).cell)).sort((a, b) => Math.hypot(a.x - d.x, a.z - d.z) - Math.hypot(b.x - d.x, b.z - d.z));
      for (const f of fires) {
        const near = [...g.forest.decorNear(f.x, f.z, 20), ...g.forest.setPiecesNear(f.x, f.z, 20), ...g.map.scenes.filter(q => Math.hypot(q.x - f.x, q.z - f.z) < 25)].filter(q => Math.hypot(q.x - f.x, q.z - f.z) > 4);
        const r = near[0];
        if (r) { const dx = f.x - r.x, dz = f.z - r.z, k = Math.hypot(dx, dz); s.push({ name: "campfire-" + (r.family ?? r.id ?? "setpiece"), x: r.x, z: r.z, r: 0, at: { x: f.x + (dx / k) * 3, z: f.z + (dz / k) * 3 }, fireOnly: true }); break; }
      }
      // none with scenery by it: the nearest lit one and its trees, their shadows coloured too (tintTrees as tint) for the shot
      if (!s.some(q => q.fireOnly) && fires.length) { const f = fires[0]; s.push({ name: "campfire-trees", x: f.x, z: f.z, r: 0, at: { x: f.x + 2, z: f.z + 3 }, fireOnly: true, trees: true }); }
      return s;
    });
    for (const s of out.subjects.filter(q => !only || q.name.startsWith(only))) {
      for (const on of ["coloured", "untapered", "black", false, "debug"]) {
        await page.evaluate(([s, on]) => { const g = window.witch.game; const T = g.tuning.shadows.trunks; if (!window.__reach) window.__reach = T.glowReach; T.glowReach = s.fireOnly ? 0 : window.__reach; T.scenery = !!on; T.mode = on === "debug" ? "debug" : "soft"; Object.assign(T, on === "black" ? { tint: 0, tintTrees: 0, glowLight: 0 } : { tint: 0.6, tintTrees: s.trees ? 0.6 : 0, glowLight: 0.7 }); if (!window.__taper) window.__taper = T.sceneryTaper; T.sceneryTaper = on === "untapered" ? 0 : window.__taper; g.witch = { ...g.witch, x: s.x + 80, z: s.z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined }; }, [s, on]);
        await step(20);
        await page.evaluate(s => { const g = window.witch.game; const W = g.witches[0]; W.health = JSON.parse(window.__hp); W.ko = null; g.witch = { ...g.witch, x: s.at ? s.at.x : s.x + s.r + 5, z: s.at ? s.at.z : s.z + 1, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined }; }, s);
        await step(90);
        await page.screenshot({ path: path.join(outDir, `${s.name}-${on || "off"}.png`) });
      }
    }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
