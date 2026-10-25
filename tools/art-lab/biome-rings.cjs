// A biome's look at each ring's strength (Ed, 2026-10-25: "Lower phase non-home biome areas can be semi-temperate looking; higher
// phase biomes are more extreme"; the tuning's biomeLooks, rules/lakeLooks.ts biomeStrength): the built game at home on one seed,
// every area in one biome's look (?biome=<key>, art/flora/biomes.js), at full strength (every ring before) and at each ring's, from
// the start's view of the same forest; a picture each (and biome-rings.json, what each is).
//   npm run build && node tools/art-lab/biome-rings.cjs [out] [dist]
// BIOMES (cold,jungle,badlands), STRENGTHS (1,0.55,0.8), SEED (4242), SIZE (640x360).
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/biome-rings", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const BIOMES = (process.env.BIOMES || "cold,jungle,badlands").split(","), STRENGTHS = (process.env.STRENGTHS || "1,0.55,0.8").split(",").map(Number);
const SEED = Number(process.env.SEED || 4242), [W, H] = (process.env.SIZE || "640x360").split("x").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const shots = [];
  let code = 0;
  try {
    for (const b of BIOMES) for (const s of STRENGTHS) {
      const key = s >= 1 ? b : `${b}|${b}|1.00|${s.toFixed(2)}`, file = `${b.replace(/\W+/g, "-")}-${Math.round(s * 100)}.png`;
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      page.on("pageerror", e => { console.error(e.message); code = 1; });
      await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&loadmist=0&island=home&seed=${SEED}&biome=${encodeURIComponent(key)}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
      // (the start's own view, every tree's art drawn)
      await page.waitForFunction(() => !window.witch.view.assets.pending, null, { timeout: 900000, polling: 1000 }).catch(() => {});
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(out, file) });
      shots.push({ biome: b, strength: s, key, file });
      log(file, key);
      await page.close();
    }
    fs.writeFileSync(path.join(out, "biome-rings.json"), JSON.stringify({ seed: SEED, shots }, null, 1));
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server.close(); }
  process.exit(code);
})();
