// The art director's review set (the overnight visual-coherence loop): the same shots every round, so rounds compare.
// Serves the built game (dist/), loads it in headless Chromium at 1280x720 and saves, at night as the game is:
//   default look: the creator room; home after she steps off, and from the treetops; four areas on the ground and from the
//   treetops (moor, fern forest, ravine, stone shrine); a fight (a debug arena by the dancefloor);
//   ?style=bold&px=4 and ?style=ref&px=4: home on the ground, the moor on the ground and from the treetops, the fight.
//   npm run build && node tools/art-review/capture.cjs <out dir> [seed] [only: default|bold|ref]
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const shrink = f => { try { execFileSync("convert", [f, "-colors", "256", "-define", "png:compression-level=9", f]); } catch { /* kept as taken */ } };
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const [outDir, seed = "123", only] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
const AREAS = ["moor", "fern-forest", "ravine", "stone-shrine"];
const VARIANTS = [
  { name: "default", query: "", creator: true, home: true, areas: AREAS, fight: true },
  { name: "bold", query: "style=bold&px=4", home: true, areas: ["moor"], fight: true },
  { name: "ref", query: "style=ref&px=4", home: true, areas: ["moor"], fight: true },
].filter(v => !only || v.name === only);
const FIGHT = "wolf*3@2,boar*2@2";

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

async function session(browser, port, v, fight) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const shot = async name => { const f = path.join(outDir, `${v.name}-${name}.png`); await page.screenshot({ path: f }); shrink(f); log(v.name, name); };
  // The creator room is shot in a load of its own (with it open, the forest grows slowly in software GL), the rest with ?creator=0.
  if (v.creator && !fight) {
    await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&wave=off${v.query ? "&" + v.query : ""}`);
    await page.waitForFunction(() => window.witch, null, { timeout: 120000, polling: 500 });
    await page.waitForTimeout(30000); await shot("creator");
  }
  const q = [`seed=${seed}`, "wave=off", v.query, fight ? `arena=${FIGHT}` : "", "creator=0"].filter(Boolean).join("&");
  await page.goto(`http://127.0.0.1:${port}/?${q}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 400000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
  await page.evaluate(() => setInterval(() => { for (const w of window.witch.game.witches || []) { w.health.hp = Math.max(w.health.hp, 99); w.ko = null; } }, 50));
  const wait = s => page.evaluate(s => new Promise(ok => { const t = window.witch.game.clock.time + s; const f = () => window.witch.game.clock.time >= t ? ok() : setTimeout(f, 100); f(); }), s);
  const nudge = async () => { await page.keyboard.down("ArrowUp"); await wait(.5); await page.keyboard.up("ArrowUp"); };
  const rise = async () => {
    await page.keyboard.press("KeyQ");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
    await wait(3); await page.waitForTimeout(5000);
  };
  if (fight) {
    await nudge(); await wait(5); await page.waitForTimeout(4000);
    await shot("fight");
  } else {
    if (v.home) {
      await nudge(); await wait(4); await page.waitForTimeout(6000); await shot("home-ground");
      if (v.name === "default") { await rise(); await shot("home-treetops"); }
    }
    for (const area of v.areas) {
      const spot = await page.evaluate(area => {
        // only the map's own cells (off the map, typeOf still answers), the nearest to the middle; her spot a little off its
        // site, kept only if it is still in that area (art builder 1, #205)
        const W = window.witch, g = W.game, m = g.map, n = m.n;
        let best = null;
        for (let cy = 0; cy < n; cy++) for (let cx = 0; cx < n; cx++) {
          const t = m.typeOf(cx, cy);
          if (W.areaTypeId(t) !== area) continue;
          const s = m.siteOf(cx, cy), d = Math.hypot(s.x - g.witch.x, s.z - g.witch.z);
          if (!best || d < best.d) best = { ...s, d, cx, cy };
        }
        if (!best) return null;
        const at = (x, z) => { const c = m.areaAt(x, z).cell; return c[0] === best.cx && c[1] === best.cy; };
        const off = [[-26, 30], [-13, 15], [0, 12], [0, 0]].find(([dx, dz]) => at(best.x + dx, best.z + dz));
        g.witch = { ...g.witch, x: best.x + off[0], z: best.z + off[1], mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
        g.introFocus = undefined;
        return { ...best, off };
      }, area);
      if (!spot) { log("no", area); continue; }
      log(area, "cell", spot.cx, spot.cy, "offset", spot.off);
      await nudge(); await wait(6); await page.waitForTimeout(8000);
      await shot(`${area}-ground`);
      await rise(); await shot(`${area}-treetops`);
    }
  }
  if (errors.length) log(v.name, "page errors:", errors);
  await page.close();
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    for (const v of VARIANTS) {
      await session(browser, port, v, false);
      if (v.fight) await session(browser, port, v, true);
    }
  } catch (e) { console.error("stopped:", e.message); process.exitCode = 1; }
  await browser.close(); server.close();
})();
