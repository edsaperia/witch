// The prop generator on and off (for Ed's decision whether ?props=gen becomes the default): serves a built game (dist/),
// loads it in headless Chromium at 1280x720 at night, the normal camera, and either
//   views: seed 123, shoots home, the moor, the fern forest, a moor pool with its shore, a footbridge and a fingerpost's spot
//   perf:  seed 922199 (Ed's scene), the ravine from the treetops: 300 frames stepped at 1/60 s, drawn, their own work (ms)
//          and draw calls
//   node compare.cjs <dist> <out dir> views|perf on|off
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dist, outDir, mode, onoff] = process.argv.slice(2), root = path.resolve(dist), gen = onoff === "on";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s] ${onoff}`, ...a);
const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
(async () => {
  await new Promise(r => server.listen(0, "127.0.0.1", r)); fs.mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
  page.on("pageerror", e => errors.push(String(e))); page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  const seed = mode === "perf" ? 922199 : 123;
  await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=${seed}&wave=off${gen ? "&props=gen" : ""}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1500000, polling: 1000 }); log("ready");
  await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000 });
  await page.evaluate(() => setInterval(() => { for (const w of window.witch.game.witches || []) { w.health.hp = Math.max(w.health.hp, 99); w.ko = null; } }, 50));
  const settle = async () => { await page.waitForTimeout(1500); await page.waitForFunction(() => window.witch.view.assets.pending === 0 && window.witch.view.stats.forestMissing === 0, null, { timeout: 45000, polling: 1000 }).catch(() => log("art still pending")); await page.waitForTimeout(4000); };
  const goTo = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, vx: 0, vz: 0, seated: false }; g.camera = { ...g.camera, tx: x, tz: z, intro: 0 }; g.introFocus = undefined; }, [x, z]);
  const site = type => page.evaluate(type => { const W = window.witch, m = W.game.map, b = m.bounds; let best = null; for (let cy = 0; cy < m.n; cy++) for (let cx = 0; cx < m.n; cx++) { if (W.areaTypeId(m.typeOf(cx, cy)) !== type) continue; const s = m.siteOf(cx, cy); if (s.x < b.minX + 60 || s.x > b.maxX - 60 || s.z < b.minZ + 60 || s.z > b.maxZ - 60) continue; const d = Math.hypot(s.x - 1176, s.z - 1176); if (!best || d < best.d) best = { x: s.x, z: s.z, d, cx, cy }; } return best; }, type);
  if (mode === "views") {
    await page.keyboard.down("ArrowUp"); await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 300000, polling: 200 }); await page.keyboard.up("ArrowUp"); // stand up from the decks
    if (!process.env.LATE) { await settle(); await page.screenshot({ path: path.join(outDir, `1-home-${onoff}.png`) }); log("home"); }
    const moor = await site("moor"), fern = await site("fern-forest");
    for (const [name, s] of process.env.LATE ? [] : [["2-moor", moor], ["3-fern-forest", fern]]) { if (!s) { log("no", name); continue; } await goTo(s.x - 26, s.z + 30); await settle(); await page.screenshot({ path: path.join(outDir, `${name}-${onoff}.png`) }); log(name, Math.round(s.x), Math.round(s.z)); }
    const pool = await page.evaluate(s => { const W = window.witch, g = W.game, moorType = g.map.typeOf(s.cx, s.cy); const ws = g.forest.wallsNear(s.x, s.z, 140).filter(p => p.type === moorType); ws.sort((a, b) => Math.hypot(a.x - s.x, a.z - s.z) - Math.hypot(b.x - s.x, b.z - s.z)); return ws[0] ? { x: ws[0].x, z: ws[0].z } : null; }, moor);
    if (pool) { await goTo(pool.x + 1, pool.z + 2); await settle(); await page.screenshot({ path: path.join(outDir, `4-pool-${onoff}.png`) }); log("pool", Math.round(pool.x), Math.round(pool.z)); }
    const spots = await page.evaluate(() => { // a footbridge in the map, and the first footpath's clearing end (where a fingerpost stands under ?props=gen), the same in both sessions
      const g = window.witch.game, P = g.map.paths, b = g.map.bounds, inB = (x, z) => x > b.minX + 80 && x < b.maxX - 80 && z > b.minZ + 80 && z < b.maxZ - 80;
      const br = P.pieces.find(p => p.id.includes("bridge") && inB(p.x, p.z));
      const l = P.lines.find(l => l.kind === "path" && !l.deadEnd && l.pts.length > 3 && inB(l.pts[1][0], l.pts[1][1]));
      const a = l.pts[1], c = l.pts[2], dx = c[0] - a[0], dz = c[1] - a[1], n = Math.hypot(dx, dz) || 1, d = l.half + 1;
      return { bridge: br && [br.x, br.z], post: [a[0] - (dz / n) * d, a[1] + (dx / n) * d] };
    }); log("spots", JSON.stringify(spots));
    for (const [name, x, z] of [["5-bridge", spots.bridge[0] + 1, spots.bridge[1] + 6], ["6-fingerpost", spots.post[0] + 3.5, spots.post[1] + 1]]) { await goTo(x, z); await settle(); await page.screenshot({ path: path.join(outDir, `${name}-${onoff}.png`) }); log(name); }
  } else {
    const s = await site("ravine"); log("ravine", s && Math.round(s.x), s && Math.round(s.z));
    await goTo(s.x, s.z + 20);
    await page.evaluate(() => { const w = window.witch, C = { moveX: 0, moveZ: 0, toggleMode: true, zoom: 0 }; w.manual = true; w.frame(C, 1 / 60, false); for (let i = 0; i < 300 && w.game.witch.mode !== "treetop"; i++) w.frame({ ...C, toggleMode: false }, 1 / 60, false); w.manual = false; });
    await settle(); await page.screenshot({ path: path.join(outDir, `perf-ravine-treetop-${onoff}.png`) });
    const r = await page.evaluate(async () => {
      const w = window.witch, v = w.view, C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, ms = [], own = [], calls = [], yieldNow = () => new Promise(res => setTimeout(res, 0));
      w.manual = true;
      for (let i = 0; i < 330; i++) { const t = performance.now(), f = w.frame({ ...C, moveX: Math.sin(i / 60) * .3 }, 1 / 60, true); if (i >= 30) { ms.push(performance.now() - t); own.push(f.step + f.render); calls.push(v.stats.drawCalls); } if (i % 20 === 0) await yieldNow(); }
      w.manual = false;
      const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };
      return { frameMedian: q(ms, .5), frameP95: q(ms, .95), ownMedian: q(own, .5), ownP95: q(own, .95), callsMedian: q(calls, .5), callsMax: Math.max(...calls), stats: v.stats };
    });
    fs.writeFileSync(path.join(outDir, `perf-${onoff}.json`), JSON.stringify(r, null, 1)); log("perf", JSON.stringify(r));
  }
  log("errors:", errors.slice(0, 5).join(" | ") || "none");
  await browser.close(); server.close();
})().catch(e => { log("stopped:", e.message); process.exit(1); });
