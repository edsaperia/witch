// Screenshots of named places, for before/after sheets of scenery fixes (Ed's playtest notes): the built game (DIST, default
// dist/) at 1280x720 on a seed, waves off, the witch on the ground (or in the treetops) at each place in turn, the art let in
// and the game paused for the shot. Places:
//   legend:<area>[:n]   the n-th legend clearing (nearest home first) in an area of that type, from just south of its middle
//   area:<area>[:n]     the n-th area of that type's centre (its site), from a little south of it
//   ground:<kind>[:n]   the n-th sports ground or playground of that kind (tennis, football, baseball, basketball, playground)
//   at:<x>,<z>          a spot in metres
// Each may end in @treetop. Writes <out dir>/<place>.png (":" and "," as "-") and prints where each was.
//   npm run build && node tools/smoke/places.cjs <out dir> <seed> <place> [place...]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/places", seed = "123", ...places] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".mp3": "audio/mpeg" };
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
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    for (const place of places) {
      const at = await page.evaluate(place => {
        const g = window.witch.game, m = g.map, [spec, height] = place.split("@"), [what, name, nth = "0"] = spec.split(":"), n = +nth;
        const D = m.dancefloor, byHome = (a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z);
        const id = i => window.witch.areaTypeId(i), typeId = (x, z) => id(m.areaAt(x, z).type);
        let x, z, info = "";
        if (what === "legend") { const k = [...m.legendClearings].filter(q => typeId(q.x, q.z) === name).sort(byHome)[n]; if (!k) return null; x = k.x; z = k.z + k.r * 0.4; info = `clearing r ${k.r.toFixed(1)}`; }
        else if (what === "area") { const cs = [...m.cells].filter(([i, j]) => id(m.typeOf(i, j)) === name).map(([i, j]) => m.siteOf(i, j)).sort(byHome); const s = cs[n]; if (!s) return null; x = s.x; z = s.z + 12; }
        else if (what === "ground") { const q = [...m.grounds].filter(q => q.kind === name).sort(byHome)[n]; if (!q) return null; x = q.x; z = q.z + q.r * 0.3; info = `ground r ${q.r.toFixed(1)}`; }
        else if (what === "at") { [x, z] = name.split(",").map(Number); }
        else return null;
        g.witch = { ...g.witch, x, z, seated: false, mode: height === "treetop" ? "treetop" : "ground", lift: height === "treetop" ? 1 : 0, vx: 0, vz: 0 };
        g.clock.paused = false;
        return { x0: x, z0: z, x: Math.round(x), z: Math.round(z), area: typeId(x, z), info };
      }, place);
      if (!at) { errors.push(`${place}: not on this map`); continue; }
      // While the art comes in, she's kept on the spot and whole (a wild creature could knock her out and send her home meanwhile;
      // paused, the view wouldn't follow her there).
      const hold = ([x, z]) => { const g = window.witch.game, W = g.witches[0]; W.ko = null; W.health.hp = g.tuning.witchHealth.hits; W.health.repairAt = Infinity; if (Math.hypot(g.witch.x - x, g.witch.z - z) > 0.5) g.witch = { ...g.witch, x, z, vx: 0, vz: 0 }; };
      let ready = false;
      for (let t = 0; t < 400 && !ready; t += 2) { await page.evaluate(hold, [at.x0, at.z0]); ready = await page.evaluate(() => { const W = window.witch, g = W.game; return !!W.view.assets.typeArt(g.map.areaAt(g.witch.x, g.witch.z).type); }); if (!ready) await page.waitForTimeout(2000); }
      if (!ready) errors.push(`${place}: its area's art never came`);
      for (let t = 0; t < 8; t += 2) { await page.evaluate(hold, [at.x0, at.z0]); await page.waitForTimeout(2000); } // (the rest of the art round the spot in, the view settled)
      await page.evaluate(() => { window.witch.game.clock.paused = true; });
      await page.waitForTimeout(1500);
      const file = path.join(outDir, `${place.replace(/[:,@]/g, "-")}.png`);
      await page.screenshot({ path: file });
      const { x0, z0, ...shown } = at; console.log(place, JSON.stringify(shown), "->", file);
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
