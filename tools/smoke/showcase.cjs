// The overnight showcase's own shots (previews/overnight/): the built game (DIST, default dist/) at 1280×720 on a seed.
//   node tools/smoke/showcase.cjs areas <out dir> [seed]    home, the moor and the fern forest on the ground and from the treetops
//   node tools/smoke/showcase.cjs attacks <out dir> [seed]  a debug arena (?arena=): wild young at her, frames stepped 1/20 s
//   node tools/smoke/showcase.cjs start <out dir> [seed]    the loading screen as it loads, then the creator in her bedroom
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [mode = "areas", outDir = "previews/overnight", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o });
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  const url = q => `http://127.0.0.1:${server.address().port}/?seed=${seed}${q}`;
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    const shot = name => page.screenshot({ path: path.join(outDir, `${name}.png`) });
    const later = async s => page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + s, { timeout: 600000, polling: 500 });
    const play = async q => {
      await page.goto(url(`&creator=0&wave=off${q}`));
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    };
    if (mode === "areas") {
      await play("");
      for (const [name, at] of [["home", null], ["moor", [8, 9]], ["fern-forest", [7, 10]]]) {
        await page.evaluate(at => { const g = window.witch.game, D = g.map.dancefloor, s = at ? g.map.siteOf(at[0], at[1]) : { x: D.x + 6, z: D.z + 40 }; g.witch = { ...g.witch, x: s.x, z: s.z, seated: false, mode: "ground", lift: 0 }; }, at);
        await later(4); await shot(`${name}-ground`);
        await page.evaluate(() => { const w = window.witch; w.manual = true; w.frame({ moveX: 0, moveZ: 0, toggleMode: true, zoom: 0 }, 1 / 60); for (let i = 0; i < 150; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 30, false); w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 30); w.manual = false; });
        await later(3); await shot(`${name}-treetops`);
        await page.evaluate(() => { const w = window.witch; w.manual = true; w.frame({ moveX: 0, moveZ: 0, toggleMode: true, zoom: 0 }, 1 / 60); for (let i = 0; i < 150; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 30, false); w.manual = false; });
      }
    } else if (mode === "attacks") {
      await play(`&arena=${process.env.ARENA || "wolf*2@1,boar*2@1,beetle*2@1"}`);
      await later(2);
      for (let i = 0; i < 48; i++) { await page.evaluate(C => { const w = window.witch; w.manual = true; w.frame(C, 0.05); }, C({})); await shot(`attack-${i}`); }
    } else if (mode === "start") {
      const t0 = Date.now();
      await page.goto(url(""));
      for (let i = 0; i < 6; i++) { await page.waitForTimeout(i ? 4000 : 1500); await shot(`loading-${i}`); console.log(`loading-${i}`, ((Date.now() - t0) / 1000).toFixed(0) + "s"); }
      await page.waitForTimeout(20000); await shot("creator");
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
