// The starfield mock (Ed, 2026-10-22: "Let's redo the starfield ... the occasional nebula. The telescope should be able to tilt up
// and down so you can look at the stars. Instead of a crystal ball, the hint should be written in the stars as a constellation seen
// through the telescope in the direction of the item!"): the built game (DIST, default dist/) with ?stars=v2 (render/sky.ts: stars
// by direction, a Milky Way band, a few nebulae) and as it is, seed 123, 1280×800, stepped at a fixed 1/60 s. The game's own sky
// over the treetops (today's and the mock's), then the telescope tilted up (render/view/camera.ts placeTelescope, its pitch set
// here) at tonight's trunk's bearing from the treehouse and two others, each with an example find's constellation (the Sunglasses,
// the Cape, the Backpack: its shape traced in stars at 35° up), stars alone and with faint lines; and one low in the north, to show
// it with the naked eye. Each shot the whole page as <out>/<name>.png, with the frame's cost (render ms, draw calls) in shots.json.
//   npm run build && node tools/stars/mock-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/stars", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
// The finds' shapes, in degrees across the sky (x right, y up), and the lines joining their stars.
const SHAPES = {
  sunglasses: { pts: [[-6, 1], [-2, 1], [-2.5, -2], [-5.5, -2], [2, 1], [6, 1], [5.5, -2], [2.5, -2], [-8.5, 2], [8.5, 2]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [1, 4], [0, 8], [5, 9]] },
  cape: { pts: [[-2, 5], [2, 5], [-3.5, 3.5], [3.5, 3.5], [-6, -5], [-2, -6], [2, -6], [6, -5]], lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 7], [4, 5], [5, 6], [6, 7]] },
  backpack: { pts: [[-3.5, 4], [3.5, 4], [4, -5], [-4, -5], [-3.5, 1], [3.5, 1], [0, 6.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [0, 6], [6, 1]] },
};
const placed = (shape, bearing, elevation, b = 0.95) => SHAPES[shape].pts.map(([x, y]) => ({ bearing: bearing + x / Math.cos(((elevation + y) * Math.PI) / 180), elevation: elevation + y, b }));
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { seed, shots: [] };
  try {
    for (const v2 of [false, true]) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      page.on("pageerror", e => errors.push(e.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0${v2 ? "&stars=v2" : ""}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
      const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
      const step = n => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, C]);
      const cost = () => page.evaluate(c => { let ms = 0; for (let k = 0; k < 20; k++) ms += window.witch.frame(c, 1 / 60, true).render; const i = window.witch.view.renderer.info.render; return { renderMs: Math.round(ms / 2) / 10, calls: i.calls }; }, C);
      const shot = async (name, extra = {}) => { out.shots.push({ name, v2, ...extra, ...(await cost()) }); await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); };
      await page.evaluate(() => { window.witch.manual = true; });
      for (let w = 0; w < 2; w++) { await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C); await step(240); }
      // Over the treetops, a little south of the dancefloor, flying north (the game's sky over the bend).
      await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor; g.witch = { ...g.witch, x: d.x, z: d.z + 120, vx: 0, vz: 0, mode: "treetop", lift: 1, seated: false, perch: undefined }; });
      await step(150);
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 1000 }).catch(() => {});
      await step(4);
      await shot(v2 ? "game-sky-new" : "game-sky-today");
      if (!v2) { await page.close(); continue; }
      // A constellation low in the north: as it would read with the naked eye, from the game's own camera.
      await page.evaluate(([cons, lines]) => window.witch.view.sky.constellation(cons, lines, 0.3), [placed("cape", 6, 12), SHAPES.cape.lines]);
      await step(4);
      await shot("game-sky-cape-naked-eye");
      // Tonight's trunk's bearing from the treehouse (rules/finds.ts wayTo), and two others.
      const trunk = await page.evaluate(() => { const g = window.witch.game, t = g.trunk, h = g.map.treehouse; return t ? { item: t.item, bearing: ((Math.atan2(t.x - h.x, -(t.z - h.z)) * 180) / Math.PI + 360) % 360 } : null; });
      out.trunk = trunk;
      const b0 = trunk ? Math.round(trunk.bearing) : 200;
      const SETS = [["sunglasses", b0], ["cape", (b0 + 120) % 360], ["backpack", (b0 + 240) % 360]];
      await page.evaluate(() => window.witch.telescope.look(0, 0));
      const tele = (heading, pitch, fov) => page.evaluate(([h, p, f]) => { window.witch.telescope.look(h, Math.log(40 / f) / Math.log(5)); window.witch.view.telescope = { heading: h, fov: f, pitch: p }; }, [heading, pitch, fov]);
      for (const [shape, bearing] of SETS) {
        await page.evaluate(([cons, lines]) => window.witch.view.sky.constellation(cons, lines, 0), [placed(shape, bearing, 35), SHAPES[shape].lines]);
        await tele(bearing, -30, 40);
        await step(60);
        await shot(`tele-${shape}-stars`, { bearing, pitch: -30, fov: 40 });
        await page.evaluate(([cons, lines]) => window.witch.view.sky.constellation(cons, lines, 0.32), [placed(shape, bearing, 35), SHAPES[shape].lines]);
        await step(4);
        await shot(`tele-${shape}-lines`, { bearing, pitch: -30, fov: 40 });
      }
      // The sky without one, tilted up: wide, near the zenith, and zoomed in (the finer stars).
      await page.evaluate(() => window.witch.view.sky.constellation([], [], 0));
      // (the nebulae stand at bearings 140°, 2° and 225°, 19°, 31° and 40° up: render/sky.ts; the Milky Way crosses near the zenith)
      await tele(140, -19, 40); await step(30); await shot("tele-sky-nebula", { bearing: 140, pitch: -19, fov: 40 });
      await tele(225, -40, 40); await step(30); await shot("tele-sky-nebula2", { bearing: 225, pitch: -40, fov: 40 });
      await tele(60, -80, 40); await step(30); await shot("tele-sky-zenith", { pitch: -80, fov: 40 });
      await tele(310, -45, 40); await step(30); await shot("tele-sky-up45", { bearing: 310, pitch: -45, fov: 40 });
      await tele(310, -45, 10); await step(30); await shot("tele-sky-zoom", { bearing: 310, pitch: -45, fov: 10 });
      await tele(b0, -8, 40); await step(60); await shot("tele-horizon", { pitch: -8, fov: 40 });
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(outDir, "shots.json"), JSON.stringify({ ...out, errors }, null, 1));
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
