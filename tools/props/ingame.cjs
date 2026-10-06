// In-game screenshots of the prop generator (art/props/; adapted from #112's tools/art-iterations/ingame.cjs): serves the built
// game (dist/), loads it in headless Chromium at 1280x720 with extra query parameters (e.g. "props=gen&style=ref&px=4"), starts, puts the witch on the ground in the nearest area of the given type
// (a little off its middle, so its trees and clearing both show), lets the creatures come out, and saves a
// screenshot on the ground and one from the treetops.
//   npm run build && node tools/props/ingame.cjs <area> <out dir> [query] [seed]   (the shots are ingame-ground.png and ingame-treetops.png)
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const shrink = f => { try { execFileSync("convert", [f, "-colors", "256", "-define", "png:compression-level=9", f]); } catch { /* ImageMagick missing: kept as taken */ } };
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const [area, outDir, query = "", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}

(async () => {
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  try {
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&wave=off${query ? "&" + query : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    const spot = await page.evaluate(area => {
      const W = window.witch, g = W.game, m = g.map;
      let best = null;
      for (let cy = -12; cy <= 12; cy++) for (let cx = -12; cx <= 12; cx++) {
        let t; try { t = m.typeOf(cx, cy); } catch { continue; }
        if (t === undefined || W.areaTypeId(t) !== area) continue;
        const s = m.siteOf(cx, cy), d = Math.hypot(s.x - g.witch.x, s.z - g.witch.z);
        if (!best || d < best.d) best = { ...s, d, cx, cy };
      }
      if (!best) return null;
      g.witch = { ...g.witch, x: best.x - 26, z: best.z + 30, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
      g.introFocus = undefined;
      return best;
    }, area);
    if (!spot) throw new Error(`no ${area} area near the start`);
    // she can't be knocked out while posing (a knockout sends her home, and the shots would show the treehouse)
    await page.evaluate(() => setInterval(() => { for (const w of window.witch.game.witches || []) { w.health.hp = Math.max(w.health.hp, 99); w.ko = null; } }, 50));
    log(`in ${area} at`, spot);
    const wait = s => page.evaluate(s => new Promise(ok => { const t = window.witch.game.clock.time + s; const f = () => window.witch.game.clock.time >= t ? ok() : setTimeout(f, 100); f(); }), s);
    // a moment to draw the new place's art and let its creatures out; a nudge so the camera settles behind her
    await page.keyboard.down("ArrowUp"); await wait(.4); await page.keyboard.up("ArrowUp");
    await wait(6);
    await page.waitForTimeout(8000);
    fs.mkdirSync(outDir, { recursive: true });
    await page.screenshot({ path: path.join(outDir, "ingame-ground.png") }); shrink(path.join(outDir, "ingame-ground.png"));
    log("ground shot");
    await page.keyboard.press("KeyQ"); // (Q rises: Space is the dash now)
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
    await wait(3); await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(outDir, "ingame-treetops.png") }); shrink(path.join(outDir, "ingame-treetops.png"));
    log("treetop shot", errors.length ? errors : "");
  } catch (e) { console.error("stopped:", e.message, errors); process.exitCode = 1; }
  await browser.close(); server.close();
})();
