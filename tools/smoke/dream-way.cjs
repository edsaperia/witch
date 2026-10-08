// A dreaming legend's pointer (render/leash.ts drawDreams, render/compass.ts; Ed, 2026-10-06): the built game (DIST, default
// dist/) at 1600×900 on a seed, the witch on the ground by two sleeping legends in turn, first outside its clearing (its dream
// bubble, its arrow and its way in words) then inside (the circle's panel naming its boon too), and once walked off to
// one side, 25 m (the arrow and the words kept up). Fails on a page error or a bubble with no way shown. Writes <out dir>/*.png.
//   npm run build && node tools/smoke/dream-way.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/dream-way", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const picks = await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor;
      const ls = g.creatures.filter(c => c.boss && !c.gone && c.quest && c.quest.done === undefined).sort((a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z));
      const out = [], seen = new Set(); for (const c of ls) { if (seen.has(c.quest.species)) continue; seen.add(c.quest.species); out.push(c.id); if (out.length === 2) break; }
      return out;
    });
    // stand her at (dx, dz) metres from legend id, let the camera come and the art load, then hold still for the shot
    const stand = async (id, dx, dz, name, wait = 6000) => {
      await page.evaluate(([id, dx, dz]) => { const g = window.witch.game, c = g.creatures[id]; c.legendState = "asleep"; g.witch = { ...g.witch, x: c.x + dx, z: c.z + dz, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 }; g.clock.paused = false; }, [id, dx, dz]);
      await page.waitForTimeout(wait);
      await page.evaluate(() => { window.witch.game.clock.paused = true; });
      await page.waitForTimeout(800);
      const seen = await page.evaluate(() => [...document.querySelectorAll(".dream-way")].filter(e => e.style.display !== "none").map(e => { const r = e.getBoundingClientRect(); return { way: e.textContent, on: r.x >= 0 && r.y >= 0 && r.right <= innerWidth && r.bottom <= innerHeight }; }));
      const info = await page.evaluate(id => { const c = window.witch.game.creatures[id]; return `${c.species} dreams of ${c.quest.species}`; }, id);
      console.log(name, info, JSON.stringify(seen));
      if (!seen.some(s => s.way && s.on)) errors.push(`${name}: no way shown under the dream bubble`);
      await page.screenshot({ path: path.join(outDir, `${name}.png`) });
    };
    for (const [n, id] of picks.entries()) {
      await stand(id, 6, 26, `legend${n + 1}-near`, n ? 6000 : 25000);
      await stand(id, 2, 6, `legend${n + 1}-circle`);
    }
    await stand(picks[0], -25, 30, "legend1-moved", 8000);
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
