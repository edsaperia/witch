// The biome looks in play, a MOCK (art/flora/biomes.js, ?biome=): the built game at one spot, every area's trees in each biome's
// look, shot on foot and from the treetops. node tools/biomes/shots.cjs [dist] [out dir] [biomes;...] (AT=x,z, SEED=)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const ALL = "temperate;cold;mountains and glaciers;volcanic;badlands;hot;mangrove swamp;jungle;cold rainforest";
const [dir = "dist", outDir = "previews/biomes/ingame", list = ALL] = process.argv.slice(2), root = path.resolve(dir);
const seed = process.env.SEED || "1", AREA = +(process.env.AREA || 0); // AREA: which wild area (the nth playable from home)
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const errors = [];
  for (const biome of list.split(";")) {
    const name = biome.replace(/ /g, "-"), { BIOME_LOOKS } = await import(path.resolve("art/flora/biomes.js")), J = BIOME_LOOKS[biome]?.jitter ?? 1, LJ = require(path.resolve("config/tuning.json")).leafJitter;
    // (the look's share of the per-tree leaf jitter: in the game a per-area scale, here the island's tuning, ?set=)
    const q = biome === "temperate" ? "" : `&biome=${encodeURIComponent(biome)}&set=${encodeURIComponent(`leafJitter.autumn=${+(LJ.autumn * J).toFixed(3)};leafJitter.hue=${+(LJ.hue * J).toFixed(2)}`)}`;
    const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(`${biome}: ${e.message}`));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=auto${q}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); const b = w.game.witch; return { x: Math.round(b.x), z: Math.round(b.z), mode: b.mode }; }, [n, o]);
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    const spot = await page.evaluate(k => { // (in the woods: a wild area's soundsystem spot, 35 m on toward its edge)
      const g = window.witch.game, m = g.map, c0 = m.centreCell, cells = m.cells.filter(c => m.playable(c[0], c[1]) && !(c[0] === c0[0] && c[1] === c0[1]));
      const c = cells[k % cells.length], s = m.soundsystemSpot(c[0], c[1]), x = s.x + 22, z = s.z + 28;
      g.witch = { ...g.witch, x, z, seated: false, perch: undefined, vx: 0, vz: 0, mode: "ground", lift: 0 };
      return { x: Math.round(x), z: Math.round(z), area: m.typeOf(c[0], c[1]) };
    }, AREA);
    console.log(biome, JSON.stringify(spot), JSON.stringify(await step(120)));
    await page.waitForTimeout(2500); await step(2);
    await page.screenshot({ path: path.join(outDir, `${name}-ground.png`) });
    await step(1, { toggleMode: true }); await step(200); await page.waitForTimeout(2500); await step(2);
    await page.screenshot({ path: path.join(outDir, `${name}-treetops.png`) });
    await browser.close();
  }
  console.log(errors.length ? "errors:\n" + errors.slice(0, 6).join("\n") : "no page errors");
  server.close(); process.exit(errors.length ? 1 : 0);
});
